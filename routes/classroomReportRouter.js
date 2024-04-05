const express = require('express');
const router = express.Router();
const term = require('../private/javascript/Term');
const classroom = require('../private/javascript/Classroom');
const timeslot = require('../private/javascript/Timeslot');
const {addAssociations} = require('../private/javascript/Associations');
const createAllTables = require('../fixtures/createTables.fix');
const {Op, sequelize} = require('../dataSource');
const {QueryTypes} = require('sequelize');
const {globalConsts} = require('../constants');
const hours24 = globalConsts.timeColumn8amTo3pmDisplayArray24Hr;
const hours12 = globalConsts.timeColumn8amTo3pmDisplayArray;
const weekdaysAllFullySpelled = globalConsts.weekdaysFullySpelled;
const getSortedTerm = require('./termRouter').readAllTerms
const Instructor = require('../private/javascript/Instructor');

router.get('/', async (req, res, next) => {
  const newTermList = await getSortedTerm();
  const classrooms = await classroom.findAll({order: [['roomNumber', 'ASC']]});


  res.render('classroomReport', {
    routerPost: false,
    title: 'Classroom Report',
    newTermList,
    classrooms,
    showModal: true,
  });
});


router.post('/', async (req, res, next) => {
  await addAssociations();
  await createAllTables(false);
  const dateGenerated= new Date();

  const realTerm = await term.findOne({where: {id: req.body.term}});
  const realClassroom = await classroom.findOne({where: {id: req.body.classroom}});

  const TimeSlots = await generateSchedule(realTerm.startDate, realTerm.endDate, realClassroom);

  const uniqueDates = await getUniqueDates(realTerm, realClassroom);

  const hasTimeSlots = TimeSlots.length > 0;
  const DAYS = weekdaysAllFullySpelled;
  const TIMES = hours24;

  const scheduleArray = [];
  if (hasTimeSlots) {
    for (let i=0; i<uniqueDates.length-1; i++) {
      const retTSList = await generateSchedule(uniqueDates[i].date, uniqueDates[i+1].date, realClassroom);

      scheduleArray[i] = await generateScheduleTable(retTSList, TIMES);
      scheduleArray[i].startDate = uniqueDates[i];
      scheduleArray[i].endDate = uniqueDates[i+1];
    }
  }

  res.render('classroomReport', {
    dateGen: dateGenerated.getFullYear()+'-'+dateGenerated.getMonth()+'-'+dateGenerated.getDate(),
    routerPost: true,
    realTerm,
    scheduleArray,
    TIMES,
    hours12,
    realClassroom,
    DAYS,
    hasTimeSlots,
    uniqueDates,
  });
});

/**
 * Gather unique dates from timeslots table
 * between start and end date of a given term
 * @param term
 * @param classroom
 * @returns {Promise<object[]>}
 */
async function getUniqueDates(term, classroom) {
  const sqlstatement = `SELECT DISTINCT date
                        FROM (
                            SELECT startDate  AS date FROM timeslots where ClassroomId = ${classroom.id}
                            UNION
                            SELECT endDate AS date FROM timeslots where ClassroomId = ${classroom.id}
                            ) AS combined_dates
                        WHERE date >= '${term.startDate}' AND date <= '${term.endDate}';`;

  try {
    return await sequelize.query(sqlstatement, {
      type: QueryTypes.SELECT,
    });
  } catch (e) {
    console.log(e);
  }
}

/**
 * Calls database for timeslot objects
 * between certain start and end dates for a given classroom
 * @param startDate
 * @param endDate
 * @param classroom
 * @returns {Promise<Model<any, TModelAttributes>[]>}
 */
function generateSchedule(startDate, endDate, classroom) {
  return timeslot.findAll({
    where: {
      [Op.and]: [
        // Timeslot starts before the endDate of the range
        {startDate: {[Op.lt]: endDate}},
        // Timeslot ends after the startDate of the range
        {endDate: {[Op.gt]: startDate}},
      ],
      ClassroomId: classroom.id,
    },
    order: [['startDate', 'ASC']],
  });
}

/**
 * Fill the table up so that it shows up with the timeslot in right spots
 * @param TimeSlots
 * @param TIMES
 * @returns {Promise<any[][]>}
 */
async function generateScheduleTable(TimeSlots, TIMES) {
  const scheduleArray = Array.from({length: 8}, () => Array(5));
  for (let i = 0; i < scheduleArray.length; i++) {
    for (let j = 0; j < scheduleArray[i].length; j++) {
      scheduleArray[i][j] = null;
    }
  }


  for (const ts of TimeSlots) {
    const currentCourseOffering = await ts.getCourseOffering();
    const currentInstructorOffering = await Instructor.findByPk(ts.primaryInstructor);
    const currentCourse= await currentCourseOffering.getCourse();
    try {
      scheduleArray[TIMES.indexOf(ts.startTime)][ts.day - 1] =
        {
          timeSlot: ts,
          courseOffering: currentCourseOffering,
          course: currentCourse,
          Instructor: currentInstructorOffering,
        };
    } catch (e) {
      console.log('Goofed');
    }
  }
  return scheduleArray;
}

module.exports = {router};
