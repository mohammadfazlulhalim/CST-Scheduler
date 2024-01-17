const express = require('express');
const router = express.Router();

const CourseOffering = require('../private/javascript/CourseOffering');
const Timeslot = require('../private/javascript/Timeslot');
const Term = require('../private/javascript/Term');
const Program = require('../private/javascript/Program');
const {testConst} = require('../constants');

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
  // const COArray = new Array(hardGroups);
  // const groupLetters = new Array(hardGroups);


  for (let i = 0; i < hardGroups; i++) {
    groupArray.add({
      timeslotMatrix: [[], [] , [], [], []], //outer array is days, each inner array is times
      COArray: new Array(hardGroups),
      groupLetters: new Array(hardGroups),
      groupLetter: GROUP_LETTERS[i],
    })

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
    for(tSlot in timeslotArray){
      const timeIndex = TIMES.indexOf(tSlot.startTime);
      const dayIndex = DAYS.indexOf(tSlot.day);
      groupArray[i].timeslotMatrix[dayIndex][timeIndex] = tSlot;//outer array is days, each inner array is times
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


module.exports = router;
