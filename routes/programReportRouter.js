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
const {globalConsts} = require('../constants');
const constants = require('constants');
const {Sequelize} = require('sequelize');

// global constants here to work with time arrays
const hours24 = globalConsts.timeColumn8amTo3pmDisplayArray24Hr;
const hours12 = globalConsts.timeColumn8amTo3pmDisplayArray;

/**
 * Processing GET request for rendering the program report page.
 *
 */
router.get('/', async function(req, res, next) {
  // const timeDisplayHours = testConst.timeColumn8amTo3pmDisplayArray;
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
      return {id: item.id, displayTerm: item.startDate + ' - ' + item.termNumber};
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
    // groupList= await CourseOffering.findAll({order: ['group']});
    groupList= await CourseOffering.findAll({order: ['group'], attributes: [
      [Sequelize.fn('DISTINCT', Sequelize.col('group')), 'group']],
    });
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
  let programList;
  let termList;
  let newTermList;
  let groupList;
  const programID = req.body.selectProgramReport; // from the modal selection
  const termID = req.body.selectTermReport; // from the modal selection
  const group = req.body.selectGroupReport; // from the modal selection
  let termName;
  let programName;
  let groupName;
  const today = new Date();
  let program;

  // Get the UTC day, month, and year components
  const day = today.getUTCDate();
  const monthIndex = today.getUTCMonth();
  const year = today.getUTCFullYear();

  // Convert month index to abbreviated month name
  const monthAbbreviation = new Intl.DateTimeFormat('en', {month: 'short'}).format(today);

  // Format the date as "DD-Mon-YYYY"
  const dateGen = `${day < 10 ? '0' : ''}${day}-${monthAbbreviation}-${year}`;

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
      return {id: item.id, displayTerm: item.startDate + ' - ' + item.termNumber};
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
    // groupList= await CourseOffering.findAll({order: ['group']});
    groupList= await CourseOffering.findAll({attributes: [
      [Sequelize.fn('DISTINCT', Sequelize.col('group')), 'group']], order: ['group'],
    });
  } catch (err) {
    groupList = undefined;
  }

  // try to find the program selected
  try {
    programName = await Program.findOne({where: {id: programID}});
    // append to program name to be displayed in cell
    program=''+programName.programAbbreviation;
  } catch (e) {
    programName = undefined;
  }

  // try to find the term selected
  try {
    termName = await Term.findOne({where: {id: termID}});
    // append to program name to be displayed in cell
    program+=''+termName.year;
  } catch (e) {
    termName = undefined;
  }

  // try to find the group selected
  try {
    groupName = await CourseOffering.findOne({where: {id: group}});
  } catch (e) {
    groupName = undefined;
  }

  // try to find the time slots based on selections
  let instRepTimeslots;
  try {
    instRepTimeslots = await Timeslot.findAll({
      where: {ProgramId: programID, TermId: termID, group: group},
      order: [['startTime', 'ASC'], ['day', 'ASC']],
    });
  } catch (e) {
    instRepTimeslots=undefined;
  }

  // generates the schedule
  // eslint-disable-next-line prefer-const
  let matrixTable = await generateSchedule(instRepTimeslots);

  res.render('programReport', {
    programList,
    newTermList,
    groupList,
    matrixTable,
    programName,
    group,
    termName,
    showModal: false,
    dateGen,
    program,
  });
});


/**
 * Helper function for the POST.
 * Help to gather timeslots for instructor
 * //
 */
async function generateSchedule(instRepTimeslots) {
  const matrixTable = [];
  let currentCourseOffering;
  let currentClassroom;
  let currentCourse;
  let currentInstructor;


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
  for (const timeslot of instRepTimeslots) {
    // make day one less (offset)
    const tDay= timeslot.day-1;
    const tHour = hours24.findIndex((st)=> st === timeslot.startTime);

    // try to find the course, courseoffering and course for this timeslot object entry
    try {
      currentCourseOffering = await timeslot.getCourseOffering();
      currentClassroom = await timeslot.getClassroom();
      currentCourse = await currentCourseOffering.getCourse();
      currentInstructor = await Instructor.findByPk(timeslot.primaryInstructor);
      currentClassroom = await timeslot.getClassroom();
    } catch (e) {
      console.error(e);
    }
    // put the items in the array
    matrixTable[tHour][tDay+1]= {timeSlot: timeslot,
      courseOffering: currentCourseOffering,
      classRoom: currentClassroom,
      course: currentCourse,
      instructor: currentInstructor,
      classroom: currentClassroom,
    };
  }

  // place the hours
  for (let i = 0; i < matrixTable.length; i++) {
    for (let j = 0; j < matrixTable[i].length; j++) {
      matrixTable[i][0].timeRow = hours12[i];
    }
  }


  return matrixTable;
}



module.exports = router;
