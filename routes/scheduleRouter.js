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

router.get('/', async (req, res, next) => {
  await defineDB();
  // console.log("start of get");

  terms = await Term.findAll();
  programs = await Program.findAll();


  // formatting the time
  for (let i=0; i<terms.length;i++) {
    // console.log('Term is: ' + JSON.stringify(terms[i]));
    const splitDate = terms[i].startDate.split('-');
    terms[i].title = splitDate[0] + '-' + terms[i].termNumber;
  }

  res.render('schedule', {
    getrequest: true,
    terms,
    programs,
  })
  // res.render('redirect-post', {});
});

router.post('/', async (req, res, next) => {
  // reloading the models with associations
  await defineDB();

  let groupArray = [];

  const GROUP_LETTERS = ['A', 'B', 'C', 'D'];
  const DAYS = [0, 1, 2, 3, 4, 5];
  const TIMES = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'];

  // const timeslotMatrix = [[], [] , [], [], []];
  let timeslotArray = new Array(req.body.group);
  const COArray = new Array(req.body.group);
  const groupLetters = new Array(req.body.group);


  for (let i = 0; i < req.body.group; i++) {
    groupArray.push({
      timeslotMatrix: [[], [], [], [], [], [], [], []], //outer array is times, each inner array is days
      COArray: new Array(req.body.group),
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
          ProgramId: req.body.program,
          TermId: req.body.term,
        },
      });
      groupArray[i].COArray = await CourseOffering.findAll({
        where: {
          group: GROUP_LETTERS[i],
          ProgramId: req.body.program,
          TermId: req.body.term,
        },
      });
    } catch (error) {
      // console.log('Error is: ' + error);
    }


    //mapping each timeslot in this group to the matrix
    for (const tSlot of timeslotArray) {
      const formattedTSlot = await formatCellInfo(tSlot);
      console.log("times "+TIMES.indexOf(tSlot.startTime));
      console.log("day "+tSlot.day);
      console.log("ts "+ groupArray[i].timeslotMatrix[TIMES.indexOf(tSlot.startTime)][tSlot.day]);

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
  prObj = await tSlot.getProgram();
  insObj = await tSlot.getInstructor();
  cObj = await coObj.getCourse();

  return prObj.programAbbreviation + '\n' + cObj.courseCode + '\n' + insObj.lastName;

}


module.exports = router;
