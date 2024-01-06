const express = require('express');
const router = express.Router();

const CourseOffering = require('../private/javascript/CourseOffering');
const Timeslot = require('../private/javascript/Timeslot');
const Term = require('../private/javascript/Term');
const Program = require('../private/javascript/Program');

let roomDefaults;
let term;
let program;
let timeslotArray;
let courseOfferingArray;

router.get('/', (req, res, next)=>{
  // Add in here for get request
  // Potentially this is the view for picking options
})

router.post('/', (req, res, next)=>{
  // POST handler - this can be the actual schedule page after picking options?
})

/**
 * Uses program and term to retrieve timeslots from DB
 * or creates if none are found, and then sets the resulting
 * array of timeslots to variable 'timeslotArray'
 * @param options
 */
function getTimeslots() {
  // add in call to DB to retreive timesots
}

/**
 * Uses program and term to retrieve courseOfferings from DB
 * and sets the resulting array of courseOfferings to variable
 * 'courseOfferingArray'
 * @param options
 */
function getCourseOfferings() {
  // add in call to DB to retreive courseOfrferings
}

module.exports = router;
