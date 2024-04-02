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
const {Sequelize, QueryTypes, Op} = require('sequelize');

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
  const today = new Date();
  let program;
  let isSplit;
  let reportArray = [];

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

  // get each unique start end date, or nothing if invalid term or instructor
  const uniqueDates = await getUniqueDates(programName, termName, group);

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

  if (instRepTimeslots){ //if no unique dates, skip and display no schedule
    for (let i=0; i < uniqueDates.length-1; i++) { //for each unique period of study
      let tempJson = {};

      let start = uniqueDates[i];
      let end = uniqueDates[i+1];

      if(i > 0){//notifies page that schedule is split
        isSplit = true;
      }

      if(i < uniqueDates.length - 2){ //set end dates back one day except for end
        let endDate = new Date(end);//change to date to set back a day
        endDate.setDate(endDate.getDate() - 1);
        endDate = endDate.toISOString().substring(0, 10)

        tempJson.matrixTable = await generateSchedule(instRepTimeslots, start, endDate); //assign time slots that match timeframe
        tempJson.startDate = start;
        tempJson.endDate = endDate;
      } else { //use regular end time for last time
        tempJson.matrixTable = await generateSchedule(instRepTimeslots, start, end);
        tempJson.startDate = start;
        tempJson.endDate = end;
      }

      reportArray[i] = tempJson;
    }
  }

  // // generates the schedule
  // // eslint-disable-next-line prefer-const
  // let matrixTable = await generateSchedule(instRepTimeslots);

  res.render('programReport', {
    programList,
    newTermList,
    groupList,
    reportArray,
    programName,
    group,
    termName,
    showModal: false,
    dateGen,
    program,
    isSplit,
  });
});

/**
 * Helper function for the POST.
 * Help to gather timeslots for instructor
 * //
 */
async function generateSchedule(instRepTimeslots, start, end) {
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
    if(timeslot.startDate.localeCompare(end) < 1  &&
        timeslot.endDate.localeCompare(start) > -1 ) { // if the timeslot falls within the current date range
      // make day one less (offset)
      const tDay = timeslot.day - 1;
      const tHour = hours24.findIndex((st) => st === timeslot.startTime);

      // try to find the course, courseoffering and course for this timeslot object entry
      try {
        currentCourseOffering = await timeslot.getCourseOffering();
        currentClassroom = await timeslot.getClassroom();
        currentCourse = await currentCourseOffering.getCourse();
        currentInstructor = await timeslot.getInstructor();
        currentClassroom = await timeslot.getClassroom();
      } catch (e) {
        console.error(e);
      }
      // put the items in the array
      matrixTable[tHour][tDay + 1] = {
        timeSlot: timeslot,
        courseOffering: currentCourseOffering,
        classRoom: currentClassroom,
        course: currentCourse,
        instructor: currentInstructor,
        classroom: currentClassroom,
      };
    }
  }

  // place the hours
  for (let i = 0; i < matrixTable.length; i++) {
    for (let j = 0; j < matrixTable[i].length; j++) {
      matrixTable[i][0].timeRow = hours12[i];
    }
  }


  return matrixTable;
}

/**
 * returns a list of each unique date in the given term, or nothing if params are invalid
 * @param program
 * @param term
 * @param groupLetter
 * @returns {Promise<Object[]>}
 */
async function getUniqueDates(program, term, groupLetter) {
// Sequelize query to get distinct start dates
  const sequelizeQueryStart = {
    attributes: [
      [sequelize.fn('DISTINCT', sequelize.col('startDate')), 'date']
    ],
    where: { ProgramId: program.id, TermId: term.id, startDate: { [Op.gte]: term.startDate },
      endDate: { [Op.lte]: term.endDate }, group: { [Op.eq]: groupLetter },
    }
  };

// Sequelize query to get distinct end dates
  const sequelizeQueryEnd = {
    attributes: [
      [sequelize.fn('DISTINCT', sequelize.col('endDate')), 'date']
    ],
    where: {
      ProgramId: program.id, TermId: term.id, startDate: { [Op.gte]: term.startDate },
      endDate: { [Op.lte]: term.endDate }, group: { [Op.eq]: groupLetter },
    }
  };

  let arStart, arEnd;

// Get the start and end dates from the sequelize statements
  arStart = await Timeslot.findAll(sequelizeQueryStart)
      .then(timeslots => timeslots.map(timeslot => timeslot.dataValues.date))
      .catch(error => {
        console.error('Error executing Sequelize query for start dates:', error);
      });

  arEnd = await Timeslot.findAll(sequelizeQueryEnd)
      .then(timeslots => timeslots.map(timeslot => timeslot.dataValues.date))
      .catch(error => {
        console.error('Error executing Sequelize query for end dates:', error);
      });


  for(let i = 0; i < arEnd.length; i++)
  {
    if(arEnd[i] !== term.endDate){
      let tempDate = new Date(arEnd[i]); //change to date to set back a day
      tempDate.setDate(tempDate.getDate() + 1);
      arEnd[i] = tempDate.toISOString().substring(0, 10);
    }
  }

  //combine two lists, then sort
  arStart = arStart.concat(arEnd);
  arStart = [...new Set(arStart)];
  arStart = arStart.sort((a,b) => {
    if(a === b){ return 0; }
    if(a >=  b) { return 1; }
    else{ return -1; }
  });

  return arStart;

}

module.exports = router;
