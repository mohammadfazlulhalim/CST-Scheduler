const express= require('express');
const router = express.Router();
const {sequelize, Op, DataTypes} = require('../dataSource');
const getSortedTerm = require('./termRouter').readAllTerms;
const Timeslot = require('../private/javascript/Timeslot');
const Instructor = require('../private/javascript/Instructor');
const {URL} = require('../constants');
const Term = require('../private/javascript/Term');
const Classroom = require('../private/javascript/Classroom');
const {where} = require('sequelize');
/**
 * The handler when the user selects the term
 * @param req
 * @param res
 * @param next
 */
router.get('/', async (req, res, next)=> {
  const listTerm = await getSortedTerm();
  res.render('instructorConflict', {
    title: 'Instructor Conflicts',
    message: 'No instructors exist within selected term',
    listTerm,
  });
});
router.post('/', async (req, res, next)=> {
  const listTerm = await getSortedTerm();
  const listTimeslot = await Timeslot.findAll({
    where: {
      TermId: req.body.filterTerm,
    },
  });

  const listInstructor = await Instructor.findAll();


  const conflictList = getConflicts(listTimeslot, listInstructor);

  res.render('instructorConflict', {
    title: 'Instructor Conflicts',
    message: 'No instructors exist within selected term',
    conflictList,
    listTerm,
  });
});

/**
 * function that would return a list of timeslots with associated instructors that have conflicts.
 * @return {*[]}
 * @param timeslotList - List of timeslots that have the selected term
 * @param instructorList - List of all instructors
 */
function getConflicts(timeslotList, instructorList) {
  const conflictList = [];

  // Iterate over each instructor
  instructorList.forEach((instructor) => {
    const instructorConflicts = [];

    // Filter timeslots for the current instructor
    const instructorTimeslots = timeslotList.filter((timeslot) => {
      return timeslot.primaryInstructor === instructor.id || timeslot.alternativeInstructor === instructor.id;
    });

    // Check for conflicts within the filtered timeslots
    for (let i = 0; i < instructorTimeslots.length; i++) {
      const timeslotA = instructorTimeslots[i];

      // Compare timeslotA with other timeslots for conflicts
      for (let j = i + 1; j < instructorTimeslots.length; j++) {
        const timeslotB = instructorTimeslots[j];

        // Check if timeslots overlap (same date, time, and day)
        if (
          timeslotA.startDate === timeslotB.startDate &&
          timeslotA.endDate === timeslotB.endDate &&
          timeslotA.startTime === timeslotB.startTime &&
          timeslotA.endTime === timeslotB.endTime &&
          timeslotA.day === timeslotB.day
        ) {
          // Create a conflict pair for the current pair of conflicting timeslots
          const conflictPair = {
            timeslot1: timeslotA,
            timeslot2: timeslotB,
          };

          // Add the conflict pair to the instructor's conflicts list
          instructorConflicts.push(conflictPair);
        }
      }
    }

    // If the instructor has conflicts, add them to the main conflictList
    if (instructorConflicts.length > 0) {
      // Create an object for the current instructor with their conflict pairs
      const instructorObj = {
        instructor: instructor,
        pairs: instructorConflicts,
      };

      // Add the instructor's conflicts to the main conflictList
      conflictList.push(instructorObj);
    }
  });
  console.log(conflictList);
  return conflictList;
}
module.exports = {router};
