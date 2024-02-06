const express = require('express');
const router = express.Router();

const CourseOffering = require('../private/javascript/CourseOffering');
const Timeslot = require('../private/javascript/Timeslot');
const Term = require('../private/javascript/Term');
const Program = require('../private/javascript/Program');
const {testConst} = require('../constants');
const defineDB = require('../fixtures/createTables.fix');

router.get('/', async (req, res, next) => {
  await defineDB(false);

  terms = await Term.findAll();
  programs = await Program.findAll();


  // formatting the time
  for (let i=0; i<terms.length; i++) {
    const splitDate = terms[i].startDate.split('-');
    terms[i].title = splitDate[0] + '-' + terms[i].termNumber;
  }

  res.render('schedule', {
    getrequest: true,
    terms,
    programs,
  });
});

router.post('/', async (req, res, next) => {
  // reloading the models with associations

  // loads the db connection
  await defineDB(false);

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
      COArray: new Array(req.body.group),
      groupLetter: GROUP_LETTERS[i],
    });

    // Creating the 2D array with empty values
    for (t in TIMES) {
      for (d in DAYS) {
        let timeOb = null;
        if (d == 0) {
          timeOb = DISPLAY_TIMES[t];
        }
        groupArray[i].timeslotMatrix[t][d] = {
          hasObj: false,
          cellID: t + '-' + d + '-' + GROUP_LETTERS[i], // dynamic id
          timeslot: timeOb, // always empty except for time column
        };
      }
    }

    try {
      // fetch all timeslots that match filters
      timeslotArray = await Timeslot.findAll({
        where: {
          group: GROUP_LETTERS[i],
          ProgramId: req.body.program,
          TermId: req.body.term,
        },
      });
      // fetch all course offerings that match filters
      groupArray[i].COArray = await CourseOffering.findAll({
        where: {
          group: GROUP_LETTERS[i],
          ProgramId: req.body.program,
          TermId: req.body.term,
        },
      });

      // getting each course offering for this group
      const tempCOArray = [groupArray[i].COArray.length];
      for (let k =0; k < tempCOArray.length; k++) {
        tempCOArray[k] = await formatCourseOffering(groupArray[i].COArray[k]);
      }
      groupArray[i].COArray=tempCOArray;
    } catch (error) {
    }


    // mapping each timeslot in this group to the matrix
    for (const tSlot of timeslotArray) {
      const formattedTSlot = await formatCellInfo(tSlot);

      groupArray[i].timeslotMatrix[TIMES.indexOf(tSlot.startTime)][tSlot.day].timeslot = formattedTSlot;// outer array is days, each inner array is times
    }
    groupLetters[i] = GROUP_LETTERS[i];
  }

  res.render('schedule', {
    groups: groupLetters,
    groupArray,
    DAYS,
    TIMES,
  });
});

// formatting each timeslot for easier displaying
async function formatCellInfo(tSlot) {
  coObj = await tSlot.getCourseOffering();
  prObj = await tSlot.getProgram();
  insObj = await tSlot.getInstructor();
  cObj = await coObj.getCourse();

  return prObj.programAbbreviation + '\n' + cObj.courseCode + '\n' + insObj.lastName;
}

// formatting each course offering for easier display
async function formatCourseOffering(coObj) {
  const insObj = await coObj.getInstructor();
  return {
    id: coObj.id,
    name: coObj.name,
    iName: insObj.firstName + ' ' + insObj.lastName,
    group: coObj.group,
    date: coObj.startDate + '-' + coObj.endDate,
  };
}

/**
 This function will handle the schedule changes.
 @param req
 */
async function handleScheduleSave(req) {}


module.exports = router;
