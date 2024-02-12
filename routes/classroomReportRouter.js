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

router.get('/', async (req, res, next) => {
  const termList = await term.findAll({order: [['termNumber', 'ASC'], ['startDate', 'DESC']]});
  const classrooms = await classroom.findAll({order: [['roomNumber', 'ASC']]});

  // Adding the year to the terms
  const newTermList= termList.map((item)=>{
    return {id: item.id, displayTerm: item.startDate.substring(0, 4)+' - '+item.termNumber};
  });

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
  let ScheduleArray = [];
  if (hasTimeSlots) {
    for (let i=0; i<uniqueDates.length-1; i++) {
      ScheduleArray[i] = await generateScheduleTable(TimeSlots, TIMES);
    }

  }

  res.render('classroomReport', {
    dateGen: dateGenerated.getFullYear()+'-'+dateGenerated.getMonth()+'-'+dateGenerated.getDate(),
    routerPost: true,
    realTerm,
    ScheduleArray,
    TIMES,
    realClassroom,
    DAYS,
    hasTimeSlots,
  });
});

/**

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


function generateSchedule(startDate, endDate, classroom) {
  return timeslot.findAll({
    where: {
      startDate: {
        [Op.between]: [startDate, endDate], // startDate should be between startDate and endDate
      },
      ClassroomId: classroom.id,
    },
    order: [['startDate', 'ASC']],
  });
}

async function generateScheduleTable(TimeSlots, TIMES) {
  let ScheduleArray = Array.from({length: 8}, () => Array(5));
  for (let i = 0; i < ScheduleArray.length; i++) {
    for (let j = 0; j < ScheduleArray[i].length; j++) {
      ScheduleArray[i][j] = null;
    }
  }


  for (const ts of TimeSlots) {
    const currentCourseOffering = await ts.getCourseOffering();
    const currentInstructorOffering = await ts.getInstructor();
    const currentCourse= await currentCourseOffering.getCourse();
  try{
    ScheduleArray[TIMES.indexOf(ts.startTime)][ts.day - 1] =
        {
          timeSlot: ts,
          courseOffering: currentCourseOffering,
          course: currentCourse,
          Instructor: currentInstructorOffering,
        };
  }
  catch(e){
    console.log('Goofed');
  }

  }
  return ScheduleArray;
}

/**
 * Copied from InstructorReportRouter.js
 * -
 * Helper for creating one full table
 * @returns {*[]}
 */
async function generateTable(timeSlots) {
  const matrixTable = [];
  let currentCourseOffering;
  let currentClassroom;
  let currentCourse;

  // import both the 24 hr and 12 hr array to use them for checks and display respectively
  for (let i = 0; i < hours24.length; i++) {
    matrixTable[i] = [
      // columns:
      // time  m   t  w   r  f
      {timeRow: ''}, {}, {}, {}, {}, {},
    ];
  }

  // eslint-disable-next-line guard-for-in
  // for every entry in the timeslots
  for (const timeslot of timeSlots) {
    // make day one less (offset)
    const tDay= timeslot.day-1;
    const tHour = hours24.findIndex((st)=> st === timeslot.startTime);

    // try to find the course, courseoffering and course for this timeslot object entry
    try {
      currentCourseOffering = await timeslot.getCourseOffering();
      currentClassroom = await timeslot.getClassroom();
      currentCourse = await currentCourseOffering.getCourse();
    } catch (e) {
      console.error(e);
    }
    // put the items in the array
    matrixTable[tHour][tDay+1]= {timeSlot: timeslot,
      courseOffering: currentCourseOffering,
      classRoom: currentClassroom,
      course: currentCourse};
  }

  // place the hours
  for (let i = 0; i < matrixTable.length; i++) {
    for (let j = 0; j < matrixTable[i].length; j++) {
      matrixTable[i][0].timeRow = hours12[i];
    }
  }


  return matrixTable;

}

module.exports = {router};
