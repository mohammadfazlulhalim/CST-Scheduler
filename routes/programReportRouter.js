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
  res.render('programReport', {
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
function generateSchedule(startDate, endDate, term, group)
{

}

