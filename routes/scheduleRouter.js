const express = require('express');
const router = express.Router();

const CourseOffering = require('../private/javascript/CourseOffering');
const Timeslot = require('../private/javascript/Timeslot');
const Term = require('../private/javascript/Term');
const Program = require('../private/javascript/Program');
const defineDB = require('../fixtures/createTables.fix');
const Instructor = require('../private/javascript/Instructor');
const Classroom = require('../private/javascript/Classroom');
const getSortedTerm = require('./termRouter').readAllTerms;
// const Course = require('../private/javascript/Course');

router.get('/', async (req, res, next) => {

  terms = await getSortedTerm();
  programs = await Program.findAll({order: [['programAbbreviation', 'ASC']]});

  res.render('schedule', {
    getrequest: true, terms, programs,
  });
});

router.post('/', async (req, res, next) => {
  const groupArray = [];

  // constants
  const GROUP_LETTERS = ['A', 'B', 'C', 'D'];
  const DAYS = [0, 1, 2, 3, 4, 5];
  const TIMES = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'];
  const DISPLAY_TIMES = ['8:00', '9:00', '10:00', '11:00', '12:00', '1:00', '2:00', '3:00'];

  let timeslotArray = new Array(req.body.group);
  const groupLetters = new Array(req.body.group);

  // looping through each group object requested
  for (let i = 0; i < req.body.group; i++) {
    groupArray.push({
      timeslotMatrix: [[], [], [], [], [], [], [], []], // outer array is times, each inner array is days
      COArray: new Array(req.body.group), groupLetter: GROUP_LETTERS[i],
    });

    // Creating the 2D array with empty values
    for (t in TIMES) {
      for (d in DAYS) {
        let timeOb = null;
        if (d == 0) {
          timeOb = DISPLAY_TIMES[t];
        }
        groupArray[i].timeslotMatrix[t][d] = {
          hasObj: false, cellID: t + '-' + d + '-' + GROUP_LETTERS[i], // dynamic id
          hTime: timeOb, // always empty except for time column
          empty: 'empty',
        };
      }
    }

    try {
      // fetch all timeslots that match filters
      timeslotArray = await Timeslot.findAll({
        include: [Classroom],
        where: {
          group: GROUP_LETTERS[i], ProgramId: req.body.program, TermId: req.body.term,
        },
      });
      // fetch all course offerings that match filters
      groupArray[i].COArray = await CourseOffering.findAll({
        where: {
          group: GROUP_LETTERS[i], ProgramId: req.body.program, TermId: req.body.term,
        },
      });

      // getting each course offering for this group
      for (let k = 0; k < groupArray[i].COArray.length; k++) {
        const COObj = groupArray[i].COArray[k];
        const insObj = await Instructor.findByPk(COObj.primaryInstructor);
        COObj.insFirst = insObj.firstName;
        COObj.insLast = insObj.lastName;
        COObj.dName = COObj.name + '-' + COObj.group;
        // If the alternative instructor exists
        if (COObj.alternativeInstructor !== null) {
          const altInsObj = await Instructor.findByPk(COObj.alternativeInstructor);;
          COObj.altInsFirst = altInsObj.firstName;
          COObj.altInsLast = altInsObj.lastName;
        }
      }
    } catch (error) {

    }


    // mapping each timeslot in this group to the matrix
    for (const tSlot of timeslotArray) {
      // const formattedTSlot = await formatCellInfo(tSlot);
      coObj = await tSlot.getCourseOffering();
      prObj = await tSlot.getProgram();

      // Loading the primary instructor information to display
      try {
        insObj = await Instructor.findByPk(tSlot.primaryInstructor);
        tSlot.insLast = insObj.lastName;
      } catch (e) {
        console.log('No Primary');
      }

      // Loading the alternative instructor information, to display name
      try {
        altInsObj = await Instructor.findByPk(tSlot.alternativeInstructor);
        tSlot.altInsLast = altInsObj.lastName;
      } catch (e) {
        console.log('No alternative instructor');
      }

      // Checking if classroom is null, because then it was probably deleted
      if (tSlot.ClassroomId === null) {
        tSlot.Classroom = {roomNumber: "Deleted"};
      }

      cObj = await coObj.getCourse();

      tSlot.program = prObj.programAbbreviation;

      tSlot.course = cObj.courseCode;
      tSlot.co = coObj.id;

      // Check if timeslotMatrix and the corresponding indices are defined
      if (
        groupArray[i].timeslotMatrix &&
        TIMES.indexOf(tSlot.startTime) !== -1 &&
        groupArray[i].timeslotMatrix[TIMES.indexOf(tSlot.startTime)] &&
        groupArray[i].timeslotMatrix[TIMES.indexOf(tSlot.startTime)][tSlot.day]
      ) {
        // Update properties only if the necessary objects and indices exist
        groupArray[i].timeslotMatrix[TIMES.indexOf(tSlot.startTime)][tSlot.day].empty = '';
        groupArray[i].timeslotMatrix[TIMES.indexOf(tSlot.startTime)][tSlot.day].timeslot = tSlot;
      } else {
        // Handle the case where the structure or indices are not as expected
        console.error('Invalid structure or indices in timeslotMatrix:', groupArray[i].timeslotMatrix);
      }
    }


    groupLetters[i] = GROUP_LETTERS[i];
  }

  const classroomList = await Classroom.findAll({order: [['roomNumber', 'ASC']]});


  res.render('schedule', {
    groups: groupLetters, groupArray, DAYS, TIMES, classroomList,
  });
});


router.put('/', async (req, res, next) => {
  const TIMES = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

  const cellID = req.body.idCell.split('-');
  const CO = await CourseOffering.findByPk(req.body.CO);

  console.log('Classroom to save: ' + req.body.ClassroomId);

  const newtSlot = {
    startDate: CO.startDate,
    endDate: CO.endDate,
    CourseOfferingId: CO.id,
    primaryInstructor: CO.primaryInstructor,
    alternativeInstructor: CO.alternativeInstructor,
    TermId: CO.TermId,
    ProgramId: CO.ProgramId,
    ClassroomId: req.body.ClassroomId,
    startTime: TIMES[parseInt(cellID[0])],
    endTime: TIMES[parseInt(cellID[0]) + 1], // Corrected
    day: cellID[1],
    group: cellID[2],
  };

  const retTSlot = await Timeslot.create(newtSlot);

  coObj = await retTSlot.getCourseOffering();
  prObj = await retTSlot.getProgram();
  insObj = await Instructor.findByPk(retTSlot.primaryInstructor);

  cObj = await coObj.getCourse();

  const xtraInfo = {};

  if (retTSlot.alternativeInstructor != null) {
    altInsObj = await Instructor.findByPk(retTSlot.alternativeInstructor);
    xtraInfo.altInsLast = altInsObj.lastName;
  }

  xtraInfo.program = prObj.programAbbreviation;
  xtraInfo.insLast = insObj.lastName;


  xtraInfo.course = cObj.courseCode;
  xtraInfo.co = coObj;
  xtraInfo.room = (await retTSlot.getClassroom()).roomNumber;

  res.status(200).json({retTSlot, xtraInfo});
});


router.delete('/', async (req, res, next) => {
  await Timeslot.destroy({where: {id: req.body.id}});

  res.status(200).json();
});

// formatting each timeslot for easier displaying
async function formatCellInfo(tSlot) {
  coObj = await tSlot.getCourseOffering();
  prObj = await tSlot.getProgram();
  insObj = await tSlot.getInstructor();
  cObj = await coObj.getCourse();

  return prObj.programAbbreviation + '\n' + cObj.courseCode + '\n' + insObj.lastName;
}


/**
 *  This function will handle the schedule changes.
 * @param saveArray - This array will contain the edit schedule timeslots to save to the database
 * @param deleteArray - This array will contain the timeslots to delete from the database
 */
async function handleScheduleSave(saveArray, deleteArray) {
}


module.exports = router;
