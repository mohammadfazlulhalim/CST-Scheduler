const express = require('express');
const router = express.Router();

const CourseOffering = require('../private/javascript/CourseOffering');
const Timeslot = require('../private/javascript/Timeslot');
const Term = require('../private/javascript/Term');
const Program = require('../private/javascript/Program');
const defineDB = require('../fixtures/createTables.fix');
const Instructor = require('../private/javascript/Instructor');

router.get('/', async (req, res, next) => {
  terms = await Term.findAll({order: [['startDate', 'DESC'], ['termNumber', 'ASC']]});
  programs = await Program.findAll({order: [['programAbbreviation', 'ASC']]});


  // formatting the time
  for (let i = 0; i < terms.length; i++) {
    const splitDate = terms[i].startDate.split('-');
    terms[i].title = splitDate[0] + '-' + terms[i].termNumber;
  }

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

  const term = await Term.findByPk(req.body.term);
  const program = await Program.findByPk(req.body.program);


  // looping through each group object requested
  for (let i = 0; i < req.body.group; i++) {
    groupArray.push({
      timeslotMatrix: [[[], [], [], [], [], [], [], []]], // outer array is times, each inner array is days
      COArray: new Array(req.body.group), groupLetter: GROUP_LETTERS[i],
      uniqueDates: [term.startDate, term.endDate],
    });


    timeslotArray = await Timeslot.findAll({
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

    for (let j = 0; j < timeslotArray.length; j++) {
      // Correctly check if the startDate is in uniqueDates
      if (groupArray[i].uniqueDates.indexOf(timeslotArray[j].startDate) === -1) {
        // Assuming you want to add the startDate to the uniqueDates array
        groupArray[i].uniqueDates.push(timeslotArray[j].startDate);
      }

      if (groupArray[i].uniqueDates.indexOf(timeslotArray[j].endDate) === -1) {
        // Assuming you want to add the startDate to the uniqueDates array
        groupArray[i].uniqueDates.push(timeslotArray[j].endDate);
      }
    }

    // console.log(groupArray[i]);
    console.log(groupArray[i].uniqueDates = groupArray[i].uniqueDates.sort());
    // eslint-disable-next-line guard-for-in

    groupArray[i].timeslotMatrix = new Array(groupArray[i].uniqueDates.length - 1)
        .fill(0)
        .map(() => new Array(TIMES.length)
            .fill(0)
            .map(() => new Array(DAYS.length).fill(null)));

    // Populate the timeslotMatrix for each interval
    for (let m = 0; m < groupArray[i].uniqueDates.length - 1; m++) {
      for (let tIndex = 0; tIndex < TIMES.length; tIndex++) {
        for (let dIndex = 0; dIndex < DAYS.length; dIndex++) {
          const timeOb = dIndex == 0 ? DISPLAY_TIMES[tIndex] : null;
          const cellID = `${tIndex}-${dIndex}-${GROUP_LETTERS[i]}`;

          // Fill the matrix dynamically based on the current interval 'm', time 'tIndex', and day 'dIndex'
          groupArray[i].timeslotMatrix[m][tIndex][dIndex] = {
            hasObj: false,
            cellID: cellID,
            hTime: timeOb,
            empty: 'empty',
          };
        }
      }
    }
    // getting each course offering for this group
    for (let k = 0; k < groupArray[i].COArray.length; k++) {
      const COObj = groupArray[i].COArray[k];
      const insObj = await Instructor.findByPk(COObj.primaryInstructor);
      COObj.insFirst = insObj.firstName;
      COObj.insLast = insObj.lastName;
      COObj.dName = COObj.name + '-' + COObj.group;
    }


    // mapping each timeslot in this group to the matrix
    for (const tSlot of timeslotArray) {
      // const formattedTSlot = await formatCellInfo(tSlot);
      coObj = await tSlot.getCourseOffering();
      prObj = await tSlot.getProgram();
      insObj = await tSlot.getInstructor();
      cObj = await coObj.getCourse();

      tSlot.program = prObj.programAbbreviation;
      tSlot.insLast = insObj.lastName;

      tSlot.course = cObj.courseCode;
      tSlot.co = coObj.id;

      // Check if timeslotMatrix and the corresponding indices are defined
      if (
        groupArray[i].timeslotMatrix[0] &&
          TIMES.indexOf(tSlot.startTime) !== -1 &&
          groupArray[i].timeslotMatrix[0][TIMES.indexOf(tSlot.startTime)] &&
          groupArray[i].timeslotMatrix[0][TIMES.indexOf(tSlot.startTime)][tSlot.day]
      ) {
        // Update properties only if the necessary objects and indices exist
        groupArray[i].timeslotMatrix[0][TIMES.indexOf(tSlot.startTime)][tSlot.day].empty = '';
        groupArray[i].timeslotMatrix[0][TIMES.indexOf(tSlot.startTime)][tSlot.day].timeslot = tSlot;
      } else {
        // Handle the case where the structure or indices are not as expected
        console.error('Invalid structure or indices in timeslotMatrix:', groupArray[i].timeslotMatrix[0]);
      }
    }


    groupLetters[i] = GROUP_LETTERS[i];
  }


  res.render('schedule', {
    groups: groupLetters, groupArray, DAYS, TIMES,
  });
});


router.put('/', async (req, res, next) => {
  const TIMES = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

  const cellID = req.body.idCell.split('-');
  const CO = await CourseOffering.findByPk(req.body.CO);

  const newtSlot = {
    startDate: CO.startDate,
    endDate: CO.endDate,
    CourseOfferingId: CO.id,
    InstructorId: CO.primaryInstructor,
    ClassroomId: 1,
    TermId: CO.TermId,
    ProgramId: CO.ProgramId,
    startTime: TIMES[parseInt(cellID[0])],
    endTime: TIMES[parseInt(cellID[0]) + 1], // Corrected
    day: cellID[1],
    group: cellID[2],
  };

  const retTSlot = await Timeslot.create(newtSlot);

  coObj = await retTSlot.getCourseOffering();
  prObj = await retTSlot.getProgram();
  insObj = await retTSlot.getInstructor();
  cObj = await coObj.getCourse();

  const xtraInfo = {};

  xtraInfo.program = prObj.programAbbreviation;
  xtraInfo.insLast = insObj.lastName;

  xtraInfo.course = cObj.courseCode;
  xtraInfo.co = coObj;


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
