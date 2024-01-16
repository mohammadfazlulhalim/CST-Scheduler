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

  const GROUP_LETTERS = ['A', 'B', 'C', 'D'];
  const timeslotArray = new Array(hardGroups);
  const COArray = new Array(hardGroups);
  const groupLetters = new Array(hardGroups);


  for (let i = 0; i < hardGroups; i++) {
    try {
      timeslotArray[i] = await Timeslot.findAll({
        where: {
          group: GROUP_LETTERS[i],
          programId: hardProg.id,
          termID: hardTerm.id,
        },
      });
      COArray[i] = await CourseOffering.findAll({
        where: {
          group: GROUP_LETTERS[i],
          programId: hardProg.id,
          termID: hardTerm.id,
        },
      });
    } catch (error) {
      // console.log('Error is: ' + error);
    }
    groupLetters[i] = GROUP_LETTERS[i];
  }

  res.render('schedule', {
    groups: groupLetters,
    timeslotArray,
    COArray,
  });


});


module.exports = router;
