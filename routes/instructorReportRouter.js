const express = require('express');
const router = express.Router();
const Instructor = require('../private/javascript/Instructor');
const Term = require('../private/javascript/Term');
const Timeslot = require('../private/javascript/Timeslot');
const globalConsts = require('../constants').globalConsts;

// global constants here to work with time arrays
const hours24 = globalConsts.timeColumn8amTo3pmDisplayArray24Hr;
const hours12 = globalConsts.timeColumn8amTo3pmDisplayArray;

// TODO Promise issues to resolve!

/**
 * Processing GET request for rendering the instructor report page.
 *
 */
router.get('/', async function(req, res, next) {
  // redefine database
  const program='';
  const dateGenerated= new Date();
  const timeDisplayHours = globalConsts.timeColumn8amTo3pmDisplayArray;
  let instructorList;
  let termList;
  let newTermList;
  // try to find all the instructors
  try {
    instructorList= await Instructor.findAll({order: ['lastName']});
  } catch (err) {
    instructorList = undefined;
  }
  // try to find all the terms
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

  res.render('instructorReport', {
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
  // redefine the database
  const instructorID = req.body.selectInstructorReport; // from the modal selection
  const termID = req.body.selectTermInstructorReport; // from the modal selection
  let instRepTimeslots;
  let instructorName;
  let matrixTable;
  let program = '';
  let termName;
  const dateGenerated= new Date();
  const monthArray=['Jan', 'Feb', 'Mar', 'Apr', 'May',
    'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  const timeDisplayHours = globalConsts.timeColumn8amTo3pmDisplayArray;
  let instructorList;
  let termList;
  let newTermList;

  // try to find the instructor selected
  try {
    instructorName = await Instructor.findOne({where: {id: instructorID}});
  } catch (err) {
    instructorName=undefined;
  }
  // try to find the term selected
  // TODO get the program form the program make association with course offering or course
  try {
    termName = await Term.findOne({where: {id: termID}});
    // based on the term define the program year
    if (termName.termNumber <= 3) {
      program= 'CST 1';
    } else {
      program = 'CST 2';
    }
  } catch (e) {
    termName=undefined;
  }


  // try to find the time slots based on selections
  try {
    instRepTimeslots = await Timeslot.findAll( {
      where: {InstructorId: instructorID, TermId: termID},
      order: [['startTime', 'ASC'], ['day', 'ASC']],
    });
  } catch (e) {
    instRepTimeslots=undefined;
  }


  // generates the schedule
  // eslint-disable-next-line prefer-const
  matrixTable = await generateSchedule(instRepTimeslots);


  // The same code from get to put back in options in the drop down in modal
  // find all instructors
  try {
    instructorList= await Instructor.findAll({order: ['lastName']});
  } catch (err) {
    instructorList = undefined;
  }

  // find all the terms
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
    // dateGen: dateGenerated.toLocaleDateString('en-CA', {})
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

async function getUniqueDates(Instructor, Term){

}


module.exports = router;
