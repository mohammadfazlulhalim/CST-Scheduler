/**
 * The router for the program report page.
 * Author: Christeen Shlimoon
 */
const express = require('express');
const router = express.Router();
const Instructor = require('../private/javascript/Instructor');
const Term = require('../private/javascript/Term');
const Timeslot = require('../private/javascript/Timeslot');
const Program = require('../private/javascript/Program');
const CourseOffering = require('../private/javascript/CourseOffering');
const Course = require('../private/javascript/Course');
const Classroom = require('../private/javascript/Classroom');
const {sequelize} = require('../dataSource');
const {testConst} = require('../constants');
const constants = require('constants');

// global constants here to work with time arrays
const hours24 = testConst.timeColumn8amTo3pmDisplayArray24Hr;
const hours12 = testConst.timeColumn8amTo3pmDisplayArray;

/**
 * Processing GET request for rendering the program report page.
 *
 */
router.get('/', async function(req, res, next) {
  const timeDisplayHours = testConst.timeColumn8amTo3pmDisplayArray;
  let programList;
  let termList;
  let newTermList;
  let groupList;

  // Find the programs to list in the modal select box
  try {
    programList= await Program.findAll({order: ['programName']});
  } catch (err) {
    programList = undefined;
  }

  // Find the terms to list in the modal select box
  try {
    termList= await Term.findAll({order: ['startDate', 'termNumber'],
    });
    // add the year
    newTermList= termList.map((item)=>{
      return {id: item.id, displayTerm: item.startDate.substring(0, 4)+' - '+item.termNumber};
    });
    // sort based on the year
    newTermList.sort((a, b)=>{
      return b.displayTerm - a.displayTerm;
    });
  } catch (err) {
    termList = undefined;
  }

  // Find the groups to list in the select box
  try {
    groupList= await CourseOffering.findAll({order: ['group']});
  } catch (err) {
    groupList = undefined;
  }
  res.render('programReport', {
    programList,
    newTermList,
    groupList,
    showModal: true,
  });
});

/**
 * After the completion of the program report form,
 * this processes the POST request to render the program report
 * for the requested program
 */
router.post('/', async function(req, res, next) {
  res.render('programReport', {
  });
});

/**
 * Helper function for the POST.
 * Help to gather timeslots for program
 *
 */
async function generateMatrix(instRepTimeslots) {

}

/**
 * Helper method to generare the time slot object
 * @param startDate
 * @param endDate
 * @param term
 * @param group
 */
function generateSchedule(startDate, endDate, term, group) {

}

module.exports = router;
