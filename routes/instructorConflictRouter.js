const express= require('express');
const router = express.Router();
const getSortedTerm = require('./termRouter').readAllTerms;
const Timeslot = require('../private/javascript/Timeslot');
const Term = require('../private/javascript/Term');
const Instructor = require('../private/javascript/Instructor');
const Classroom = require('../private/javascript/Classroom');
const CourseOffering = require('../private/javascript/CourseOffering');
const Program = require('../private/javascript/Program');
const Course = require('../private/javascript/Course');
const {globalConsts} = require('../constants');


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
    message: 'Please select a term to see conflicts!',
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

  // Creating a list of conflicts
  const conflictList = getConflicts(listTimeslot, listInstructor);

  try {
    await processConflictPairs(conflictList);
  } catch (error) {
    console.error('Error processing conflict pairs:', error);
  }


  const title = 'Instructor Conflicts for ' + listTerm[req.body.filterTerm].calendarYear + ' - Term ' + listTerm[req.body.filterTerm].termNumber;

  res.render('instructorConflict', {
    title,
    message: 'No instructor conflicts exist within selected term',
    conflictList,
    listTerm,
  });
});

/**
 * Function to identify conflicts within timeslots based on instructors.
 * @param {Array} timeslotList - List of timeslots.
 * @param {Array} instructorList - List of instructors.
 * @return {Array} - List of conflicts grouped by instructor.
 */
function getConflicts(timeslotList, instructorList) {
  const conflictList = [];

  // Iterate over each instructor
  instructorList.forEach((instructor) => {
    // Filter timeslots where the instructor is either primary or alternative
    const instructorTimeslots = timeslotList.filter((timeslot) => {
      return timeslot.primaryInstructor === instructor.id || timeslot.alternativeInstructor === instructor.id;
    });

    // Check for conflicts within the filtered timeslots for the current instructor
    const instructorConflicts = findConflictsForInstructor(instructorTimeslots);

    // If the instructor has conflicts, add them to the main conflictList
    if (instructorConflicts.length > 0) {
      const instructorObj = {
        instructor,
        pairs: instructorConflicts,
      };
      conflictList.push(instructorObj);
    }
  });

  return conflictList;
}
/**
 * Function to find the conflicts witin the given timeslots
 * @param {Array} timeslots - List of instructors.
 * @return {Array} - List of conflicts grouped by instructor.
 */
function findConflictsForInstructor(timeslots) {
  const conflicts = [];

  // Check for conflicts within the filtered timeslots
  for (let i = 0; i < timeslots.length; i++) {
    const timeslotA = timeslots[i];

    for (let j = i + 1; j < timeslots.length; j++) {
      const timeslotB = timeslots[j];

      // Check if both dates and times overlap
      if (
        datesOverlap(timeslotA.startDate, timeslotA.endDate, timeslotB.startDate, timeslotB.endDate) &&
        timesOverlap(timeslotA.startTime, timeslotA.endTime, timeslotB.startTime, timeslotB.endTime)
      ) {
        const conflictPair = {
          timeslotA,
          timeslotB,
        };
        conflicts.push(conflictPair);
      }
    }
  }

  return conflicts;
}


/**
 * Function to find the times that overlap
 * @param startTimeA
 * @param endTimeA
 * @param startTimeB
 * @param endTimeB
 */
function timesOverlap(startTimeA, endTimeA, startTimeB, endTimeB) {
  const [startAHour, startAMin] = startTimeA.split(':').map(Number);
  const [endAHour, endAMin] = endTimeA.split(':').map(Number);
  const [startBHour, startBMin] = startTimeB.split(':').map(Number);
  const [endBHour, endBMin] = endTimeB.split(':').map(Number);

  const startATotalMinutes = startAHour * 60 + startAMin;
  const endATotalMinutes = endAHour * 60 + endAMin;
  const startBTotalMinutes = startBHour * 60 + startBMin;
  const endBTotalMinutes = endBHour * 60 + endBMin;

  return !(endATotalMinutes <= startBTotalMinutes || startATotalMinutes >= endBTotalMinutes);
}

/**
 * Function to find the conflicts within the given days
 * @param startDateA
 * @param endDateA
 * @param startDateB
 * @param endDateB
 */
function datesOverlap(startDateA, endDateA, startDateB, endDateB) {
  const startA = new Date(startDateA);
  const endA = new Date(endDateA);
  const startB = new Date(startDateB);
  const endB = new Date(endDateB);
  return startA <= endB && endA >= startB;
}

/**
 * A helper function used to get associated functions.
 * @param conflictList
 * @return {Promise<void>}
 */
async function processConflictPairs(conflictList) {
  const generateCustomId = createAutoIncrementGenerator();
  for (const instructorConflict of conflictList) {
    for (const conflictPair of instructorConflict.pairs) {
      conflictPair.timeslotA.customid = generateCustomId();
      conflictPair.timeslotB.customid = generateCustomId();

      // Create course offerings
      const courseOfferingA = await CourseOffering.findByPk(conflictPair.timeslotA.CourseOfferingId);
      const courseOfferingB = await CourseOffering.findByPk(conflictPair.timeslotA.CourseOfferingId);
      conflictPair.timeslotA.courseOfferingObj = courseOfferingA;
      conflictPair.timeslotB.courseOfferingObj = courseOfferingB;

      // Create course
      const courseA = await Course.findByPk(courseOfferingA.CourseId);
      const courseB = await Course.findByPk(courseOfferingB.CourseId);
      conflictPair.timeslotA.courseObj = courseA;
      conflictPair.timeslotB.courseObj = courseB;

      // Fetch program and Room
      const programA = await Program.findByPk(conflictPair.timeslotA.ProgramId);
      const roomA = await Classroom.findByPk(conflictPair.timeslotA.ClassroomId);

      // Fetch the course for timeslotB
      const programB = await Program.findByPk(conflictPair.timeslotB.ProgramId);
      const roomB = await Classroom.findByPk(conflictPair.timeslotB.ClassroomId);

      conflictPair.timeslotA.classroomObj = roomA;
      conflictPair.timeslotB.classroomObj = roomB;
      conflictPair.timeslotA.programObj = programA;
      conflictPair.timeslotB.programObj = programB;

      // Set the fullDay attribute to the day instead of the integer value
      conflictPair.timeslotA.fullday = globalConsts.weekdaysFullySpelled[(conflictPair.timeslotA.day) - 1];
      conflictPair.timeslotB.fullday = globalConsts.weekdaysFullySpelled[(conflictPair.timeslotB.day) - 1];


      // Determine instructor type for timeslots
      if (conflictPair.timeslotB.primaryInstructor === instructorConflict.instructor.id) {
        conflictPair.timeslotB.instructorType = 'Primary Instructor';
      } else {
        conflictPair.timeslotB.instructorType = 'Alternative Instructor';
      }

      if (conflictPair.timeslotA.primaryInstructor === instructorConflict.instructor.id) {
        conflictPair.timeslotA.instructorType = 'Primary Instructor';
      } else {
        conflictPair.timeslotA.instructorType = 'Alternative Instructor';
      }
    }
  }
}

// Function to autoIncrement the ID.
// eslint-disable-next-line require-jsdoc
function createAutoIncrementGenerator() {
  let autoIncrementId = 0; // Initialize auto-increment ID counter

  // Return a generator function that yields auto-incrementing IDs
  return () => `customid-${autoIncrementId++}`;
}

module.exports = {router};
