const express = require('express');
const router = express.Router();
const Instructor = require('../private/javascript/Instructor');
const Term = require('../private/javascript/Term');
const Timeslot = require('../private/javascript/Timeslot');
const CourseOffering = require('../private/javascript/CourseOffering');
const Course = require('../private/javascript/Course');
const Classroom = require('../private/javascript/Classroom');
const {sequelize} = require('../dataSource');
const {testConst} = require('../constants');
const constants = require('constants');
const defineDB = require('../fixtures/DefineTables');


// global constants here to work with time arrays
const hours24 = testConst.timeColumn8amTo3pmDisplayArray24Hr;
const hours12 = testConst.timeColumn8amTo3pmDisplayArray



// TODO: regenerate list on post for modal
/**
 * Processing GET request for rendering the instructor report page.
 *
 */
router.get('/', async function(req, res, next) {
  await defineDB();
  const program='';
  const dateGenerated= new Date();
  const monthArray=['Jan', 'Feb', 'Mar', 'Apr', 'May',
    'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  const timeDisplayHours = testConst.timeColumn8amTo3pmDisplayArray;

  // TODO REMOVE THIS TEMPORARY CALL TO

  let instructorList;
  let termList;
  let newTermList;

  try {
    instructorList= await Instructor.findAll({order: ['lastName']});
  } catch (err) {
    instructorList = undefined;
  }
  try {
    termList= await Term.findAll({order: ['startDate', 'termNumber'],
    });
    newTermList= termList.map((item)=>{
      return {id: item.id, displayTerm: item.startDate.substring(0, 4)+' - '+item.termNumber};
    });

    newTermList.sort((a, b)=>{
      return b.displayTerm - a.displayTerm;
    });
  } catch (err) {
    termList = undefined;
  }


  // const instructor={
  //   lastName: 'BensonBenson',
  //   firstName: 'Onisheknooo',
  // };

  // const t={
  //   c: 'CSEC280B',
  //   roomNum: 244,
  //   term: 2,
  // };


  // if (t.term > 3) {
  //   program = 'CST 2';
  // } else {
  //   program ='CST 1';
  // }

  res.render('instructorReport', {
    // instructor,
    // timeslot: t,
    // programYear: program,
    // dateGen: dateGenerated.getDate()+'-'+monthArray[dateGenerated.getMonth()]+'-'+dateGenerated.getFullYear(),
    instructorList,
    termList: newTermList,
    timeDisplayHours,
    showModal: true,
  });
});


/**
 * After the completion of the instructor report form,
 * this processes the POST request to render the instructor report
 * for the requested instructor(s)
 */
router.post('/', async function(req, res, next) {
  console.log('We r in post');
  await defineDB();
  await sequelize.sync();

  const instructorID = req.body.selectInstructorReport;
  const termID = req.body.selectTermInstructorReport;
  let instRepTimeslots;
  let instructorName;
  let matrixTable;
  let program = '';
  let termName;


  try {
    instructorName = await Instructor.findOne({where: {id: instructorID}});
  } catch (err) {
    console.log('Couldnt find instrcutor');
  }

  try {
    termName = await Term.findOne({where: {id: termID}});
    if (termName.termNumber <= 3) {
      program= 'CST 1';
    } else {
      program = 'CST 2';
    }
  } catch (e) {
    console.log('Couldnt find term');
  }


  try {
    instRepTimeslots = await Timeslot.findAll( {
      where: {InstructorId: instructorID, TermId: termID},
      order: [['startTime', 'ASC'], ['day', 'ASC']],
    });
  } catch (e) {
    console.log('Couldnt find timeslot');
    console.log(e);
  }

  // eslint-disable-next-line prefer-const
  matrixTable = await generateSchedule(instRepTimeslots);

  // get
  // const program='';
  const dateGenerated= new Date();
  const monthArray=['Jan', 'Feb', 'Mar', 'Apr', 'May',
    'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  const timeDisplayHours = testConst.timeColumn8amTo3pmDisplayArray;


  let instructorList;
  let termList;
  let newTermList;

  try {
    instructorList= await Instructor.findAll({order: ['lastName']});
  } catch (err) {
    instructorList = undefined;
  }

  try {
    termList= await Term.findAll({order: ['startDate', 'termNumber'],
    });
    newTermList= termList.map((item)=>{
      return {id: item.id, displayTerm: item.startDate.substring(0, 4)+' - '+item.termNumber};
    });

    newTermList.sort((a, b)=>{
      return b.displayTerm - a.displayTerm;
    });
  } catch (err) {
    termList = undefined;
  }


  res.render('instructorReport', {
    instRepTimeslots,
    instructorName,
    termName,
    matrixTable,
    dateGen: dateGenerated.getDate()+'-'+monthArray[dateGenerated.getMonth()]+'-'+dateGenerated.getFullYear(),
    instructorList,
    termList: newTermList,
    timeDisplayHours,
    showModal: false,
    program,
  });
});



/**
 * Helper function for the POST.
 * Help to gather timeslots for instructor
 * // TODO establish empty cells within the final array
 * //
 */
async function generateSchedule(instRepTimeslots) {
  const matrixTable = [];
  let currentCourseOffering;
  let currentClassroom;
  let currentCourse;

  // import both the 24 hr and 12 hr array to use them for checks and display respectively
  for (let i = 0; i < hours24.length; i++) {
    matrixTable[i] = [
      //columns:
      // time  m   t  w   r  f
      {timeRow: ""},     {}, {}, {}, {}, {},
    ];
  }

  // eslint-disable-next-line guard-for-in
  for (const timeslot of instRepTimeslots) {
    const tDay= timeslot.day-1;
    const tHour = hours24.findIndex((st)=> st === timeslot.startTime);

    try {
      currentCourseOffering = await timeslot.getCourseOffering();
      currentClassroom = await timeslot.getClassroom();
      currentCourse = await currentCourseOffering.getCourse();
    } catch (e) {
      console.error(e)
    }

    // TODO FIX INCREMENT TO AVOID MISPLACED TIMESLOTS IN ARRAY
    matrixTable[tHour][tDay+1]= {timeSlot: timeslot,
      courseOffering: currentCourseOffering,
      classRoom: currentClassroom,
      course: currentCourse};

    // matrixTable[tHour][tDay]= timeslot;
    console.log('Curr to do:');
    console.log(timeslot);
  }

  // TODO fix the 24 hour time label to be 24 hours
  for (let i = 0; i < matrixTable.length; i++) {
    for (let j = 0; j < matrixTable[i].length; j++) {
     matrixTable[i][0].timeRow = hours12[i];
    }
  }

  // TODO remove this matrix table console log
  console.log(matrixTable);

  return matrixTable;
}


module.exports = router;
