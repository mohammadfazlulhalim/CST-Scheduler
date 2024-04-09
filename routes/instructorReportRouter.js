const express = require('express');
const router = express.Router();
const Instructor = require('../private/javascript/Instructor');
const Term = require('../private/javascript/Term');
const Timeslot = require('../private/javascript/Timeslot');
const {sequelize} = require("../dataSource");
const {QueryTypes, Op} = require("sequelize");
const globalConsts = require('../constants').globalConsts;
const getSortedTerm = require('./termRouter').readAllTerms


// global constants here to work with time arrays
const hours24 = globalConsts.timeColumn8amTo3pmDisplayArray24Hr;
const hours12 = globalConsts.timeColumn8amTo3pmDisplayArray;

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
    newTermList= await getSortedTerm();
  } catch (err) {
    newTermList = undefined;
  }

  res.render('instructorReport', {
    instructorList,
    termList: newTermList,
    timeDisplayHours,
    showModal: true,
  });
});


/**
 * sends completed report back to view with supplied insturctor and term, also sends data for new report with
 * the same modal
 */
router.post('/', async function(req, res, next) {
  // redefine the database
  const instructorID = req.body.selectInstructorReport; // from the modal selection
  const termID = req.body.selectTermInstructorReport; // from the modal selection
  let instRepTimeslots;
  let instructorName;
  let program = '';
  let termName;
  const dateGenerated= new Date();
  const monthArray=['Jan', 'Feb', 'Mar', 'Apr', 'May',
    'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  const timeDisplayHours = globalConsts.timeColumn8amTo3pmDisplayArray;
  let instructorList;
  let termList;
  let newTermList;
  let reportArray = [];
  let isSplit = false;

  // try to find the instructor selected
  try {
    instructorName = await Instructor.findOne({where: {id: instructorID}});
  } catch (err) {
    instructorName=undefined;
  }
  // try to find the term selected
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
      where: {[Op.or]:{primaryInstructor: instructorID, alternativeInstructor: instructorID}, TermId: termID},
      order: [['startTime', 'ASC'], ['day', 'ASC']],
    });
  } catch (e) {
    instRepTimeslots=undefined;
  }

  // get each unique start end date, or nothing if invalid term or instructor
  const uniqueDates = await getUniqueDates(instructorName, termName);

  if (instRepTimeslots){ //if no unique dates, skip and display no schedule
    for (let i=0; i < uniqueDates.length-1; i++) { //for each unique period of study
      let tempJson = {};

      let start = uniqueDates[i];
      let end = uniqueDates[i+1];

      if(i > 0){//notifies page that schedule is split
        isSplit = true;
      }

      if(i < uniqueDates.length - 2){ //set end dates back one day except for end
        let endDate = new Date(end.date);//change to date to set back a day
        endDate.setDate(endDate.getDate() - 1);
        endDate = endDate.toISOString().substring(0, 10)

        tempJson.matrixTable = await generateSchedule(instRepTimeslots, start, endDate); //assign time slots that match timeframe
        tempJson.startDate = start.date;
        tempJson.endDate = endDate;
      } else { //use regular end time for last time
        tempJson.matrixTable = await generateSchedule(instRepTimeslots, start, end.date);
        tempJson.startDate = start.date;
        tempJson.endDate = end.date;
      }

      reportArray[i] = tempJson;
    }
  }

  // The same code from get to put back in options in the drop down in modal
  // find all instructors
  try {
    instructorList= await Instructor.findAll({order: ['lastName']});
  } catch (err) {
    instructorList = undefined;
  }

  // find all the terms
  try {
    newTermList= await getSortedTerm();
  } catch (err) {
    newTermList = undefined;
  }


  res.render('instructorReport', {
    instructorName,
    reportArray,
    dateGen: dateGenerated.getDate()+'-'+monthArray[dateGenerated.getMonth()]+'-'+dateGenerated.getFullYear(),
    instructorList,
    termList: newTermList,
    timeDisplayHours,
    showModal: false,
    program,
    isSplit,
    termName,
  });
});


/**
 * generates a schedule with all timeslots given within a specified time range
 * @param instRepTimeslots
 * @param start
 * @param end
 * @returns {Promise<*[]>}
 */
async function generateSchedule(instRepTimeslots, start, end) {
  const matrixTable = [];
  let currentCourseOffering;
  let currentClassroom;
  let currentCourse;

  // import both the 24 hr and 12 hr array to use them for checks and display respectively
  for (let i = 0; i < hours24.length; i++) {
    matrixTable[i] = [
      // columns:
      // time  m   t  w   th  f
      {timeRow: ''}, {}, {}, {}, {}, {},
    ];
  }

  // eslint-disable-n
  // ext-line guard-for-in
  // for every entry in the timeslots
  for (const timeslot of instRepTimeslots) {

    if(timeslot.startDate.localeCompare(end) < 1  &&
        timeslot.endDate.localeCompare(start.date) > -1 ) // if the timeslot falls within the current date range
    {
      // make day one less (offset)
      const tDay= timeslot.day-1;
      const tHour = hours24.indexOf(timeslot.startTime);

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

  }

  // place the 12hours in the leftmost column
  for (let i = 0; i < matrixTable.length; i++) {
    for (let j = 0; j < matrixTable[i].length; j++) {
      matrixTable[i][0].timeRow = hours12[i];
    }
  }


  return matrixTable;
}


/**
 * returns a list of each unique date in the given term, or nothing if params are invalid
 * @param instructor
 * @param term
 * @returns {Promise<Object[]>}
 */
async function getUniqueDates(instructor, term) {
  //get all startdates and enddates from timeslots
  const sqlStart = `SELECT DISTINCT startDate AS date FROM timeslots 
                         where (primaryInstructor = ${instructor.id} OR alternativeInstructor = ${instructor.id}) and TermId = ${term.id}
                        and startDate >= '${term.startDate}' AND endDate <= '${term.endDate}'` ;

  const sqlEnd = `SELECT DISTINCT endDate AS date FROM timeslots 
                        where (primaryInstructor = ${instructor.id} OR alternativeInstructor = ${instructor.id}) and TermId = ${term.id}
                        and startDate >= '${term.startDate}' AND endDate <= '${term.endDate}'`;

  let arStart, arEnd;

  //query wtih strings
  try {
    arStart = await sequelize.query(sqlStart, {
      type: QueryTypes.SELECT,
      mapToModel: true,
    });
    arEnd = await sequelize.query(sqlEnd, {
      type: QueryTypes.SELECT,
      mapToModel: true,
    });
  } catch (e) {
    console.log(e);
  }

  //need to set date back one day, then stringify
  arEnd.forEach((date) => {
    if(date.date !== term.endDate){
      let tempDate = new Date(date.date); //change to date to set back a day
      tempDate.setDate(tempDate.getDate() + 1);
      date.date = tempDate.toISOString().substring(0, 10);
    }
  })

  //combine two lists, then sort
  arStart = arStart.concat(arEnd);
  arStart = [...new Set(arStart)];
  arStart = arStart.sort((a,b) => {
    if(a.date === b.date){ return 0; }
    if(a.date >=  b.date) { return 1; }
    else{ return -1; }
  });

  return arStart;

}



module.exports = router;
