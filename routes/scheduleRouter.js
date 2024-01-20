const express = require('express');
const router = express.Router();

const CourseOffering = require('../private/javascript/CourseOffering');
const Timeslot = require('../private/javascript/Timeslot');
const Term = require('../private/javascript/Term');
const Program = require('../private/javascript/Program');
const {testConst} = require('../constants');
const defineDB = require('../fixtures/DefineTables');
let roomDefaults;
let term;
let program;
let timeslotArray;
let courseOfferingArray;

router.get('/', (req, res, next) => {
  // Add in here for get request
  // Potentially this is the view for picking options
  //   res.render('schedule', {})
  res.render('redirect-post', {});
});

router.post('/', async (req, res, next) => {
  // reloading the models with associations
  await defineDB();


  //TODO - switch to req.body when the modal is complete
  const hardTerm = await Term.findOne({where: {startDate: testConst.term1.startDate}}); //change to ID later
  const hardProg = await Program.findOne({where: {programAbbreviation: testConst.program1.programAbbreviation}}); //change to id later
  const hardGroups = 2;
  let groupArray = [];

  const GROUP_LETTERS = ['A', 'B', 'C', 'D'];
  const DAYS = [0, 1, 2, 3, 4, 5];
  const TIMES = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'];

  // const timeslotMatrix = [[], [] , [], [], []];
  let timeslotArray = new Array(hardGroups);
  const COArray = new Array(hardGroups);
  const groupLetters = new Array(hardGroups);


  for (let i = 0; i < hardGroups; i++) {
    groupArray.push({
      timeslotMatrix: [[], [], [], [], [], [], [], []], //outer array is times, each inner array is days
      COArray: new Array(hardGroups),
      groupLetter: GROUP_LETTERS[i],
    });

    // Creating the 2D array with empty values
    for (t in TIMES) {
      for (d in DAYS) {
        let timeOb = null;
        if (d == 0) {
          // just storing the time
          // TODO converting the time
          timeOb = TIMES[t];
        }
        groupArray[i].timeslotMatrix[t][d] = {
          hasObj: false,
          tTime: t,
          tDays: d,
          timeslot: timeOb,
        };
      }
    }

    try {
      timeslotArray = await Timeslot.findAll({
        where: {
          group: GROUP_LETTERS[i],
          ProgramId: hardProg.id,
          TermId: hardTerm.id,
        },
      });
      groupArray[i].COArray = await CourseOffering.findAll({
        where: {
          group: GROUP_LETTERS[i],
          ProgramId: hardProg.id,
          TermId: hardTerm.id,
        },
      });
    } catch (error) {
      // console.log('Error is: ' + error);
    }


    //mapping each timeslot in this group to the matrix
    for (const tSlot of timeslotArray) {
      const formattedTSlot = await formatCellInfo(tSlot);
      groupArray[i].timeslotMatrix[TIMES.indexOf(tSlot.startTime)][tSlot.day].timeslot = formattedTSlot;//outer array is days, each inner array is times
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

async function formatCellInfo(tSlot) {
  coObj = await tSlot.getCourseOffering();
  cObj = await coObj.getCourse();


  insObj = await tSlot.getInstructor();

  return cObj.courseCode + '    ' + insObj.lastName;

}


module.exports = router;
