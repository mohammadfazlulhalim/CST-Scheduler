const express = require('express');
const router = express.Router();

const CourseOffering = require('../private/javascript/CourseOffering');
const Timeslot = require('../private/javascript/Timeslot');
const Term = require('../private/javascript/Term');
const Program = require('../private/javascript/Program');
// eslint-disable-next-line no-unused-vars
const Instructor = require('../private/javascript/Instructor');
const {Op} = require('sequelize');
let groups;

router.get('/', async (req, res) => {
  const terms = await Term.findAll({order: [['startDate', 'DESC'], ['termNumber', 'ASC']]});
  const programs = await Program.findAll({order: [['programAbbreviation', 'ASC']]});


  // formatting the time
  for (let i = 0; i < terms.length; i++) {
    const splitDate = terms[i].startDate.split('-');
    terms[i].title = splitDate[0] + '-' + terms[i].termNumber;
  }

  res.render('schedule', {
    isHidden: true,
    getrequest: true, terms, programs,
  });
});

router.post('/', async (req, res) => {
  const term = await Term.findByPk(req.body.term);
  const program = await Program.findByPk(req.body.program);

  groups = [{
    schedule: {
      startDate: term.startDate,
      endDate: term.endDate,
      COArray: [undefined],
      table: [{
        startDate: undefined,
        endDate: undefined,
        tableRows: undefined,
      }],
    },
  }];

  await getGroups(term, program);

  res.render('schedule', {
    isHidden: false,
    groups,
  });
});


router.put('/', async (req, res) => {
  const TIMES = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

  const cellID = req.body.idCell.split('-');
  const CO = await CourseOffering.findByPk(req.body.CO);

  const newtSlot = {
    startDate: CO.startDate,
    endDate: CO.endDate,
    CourseOfferingId: CO.id,
    InstructorId: CO.primaryInstructor,
    ClassroomId: 1,
    TermId: CO.TermId,
    ProgramId: CO.ProgramId,
    startTime: TIMES[parseInt(cellID[0])],
    endTime: TIMES[parseInt(cellID[0]) + 1], // Corrected
    day: cellID[1],
    group: cellID[2],
  };

  const retTSlot = await Timeslot.create(newtSlot);

  const coObj = await retTSlot.getCourseOffering();
  const prObj = await retTSlot.getProgram();
  const insObj = await retTSlot.getInstructor();
  const cObj = await coObj.getCourse();

  const xtraInfo = {};

  xtraInfo.program = prObj.programAbbreviation;
  xtraInfo.insLast = insObj.lastName;

  xtraInfo.course = cObj.courseCode;
  xtraInfo.co = coObj;


  res.status(200).json({retTSlot, xtraInfo});
});


router.delete('/', async (req, res) => {
  await Timeslot.destroy({where: {id: req.body.id}});

  res.status(200).json();
});

/**
 *This method will take in the groups object, term, and program,
 * and it will fill each groups as specified in the module
 * to be filled with the accompanying information
 */
async function getGroups(term, program) {
  const groupLetters = ['A', 'B', 'C', 'D'];

  for (let i=0; i<groups.length; i++) {
    try {
      await getSchedules(term, program, groupLetters[i], groups[i].schedule);
    } catch (e) {
      console.error(e);
    }
  }
}

/**
 * This method will fill each schedule with the required information
 * which is the dates, course offerings, and tables
 */
async function getSchedules(term, program, groupLetter, schedule) {
  const timeSlots = await Timeslot.findAll({
    where: {group: groupLetter, ProgramId: program.id, TermId: term.id},
  });
  const uniqueDates = [term.startDate, term.endDate];
  timeSlots.forEach((CO) => {
    if (!uniqueDates.includes(CO.startDate)) {
      uniqueDates.push(CO.startDate);
    }
  });
  uniqueDates.sort();
  for (let i=0; i<uniqueDates.length-1; i++) {
    schedule.table[i].startDate = uniqueDates[i];
    schedule.table[i].endDate = uniqueDates[i+1];
    schedule.COArray = await getCOs(schedule.table[i], term, program, groupLetter);
    schedule.table[i].tableRows = await getTableRows(
        schedule.table[i], schedule.COArray, term, program, groupLetter, timeSlots,
    );
  }
}

/**
 * This method will get the information needed for each table
 * so that it can be indexed in a way that is easy to understand
 * and edit the information for the hbs
 * each table has a startdate, enddate, tablerow[] which has tableItem[]
 */
async function getTableRows(table, COArray, term, program, groupLetter, timeSlots) {
  // eslint-disable-next-line no-unused-vars
  const topRow = ['Time', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  // eslint-disable-next-line no-unused-vars
  const times12hr = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'];
  // eslint-disable-next-line no-unused-vars
  const times24hr = ['8:00', '9:00', '10:00', '11:00', '12:00', '1:00', '2:00', '3:00'];
  const rowsToReturn = [];
  rowsToReturn[0] = topRow;

  for (let i=1; i<9; i++) {
    rowsToReturn[i] = [];
    for (let j=0; j<6; j++) {
      if (j===0) {
        rowsToReturn[i][j] = times24hr[i-1];
        continue;
      }
      rowsToReturn[i][j] = timeSlots.find((ts) => ts.day === j && ts.time === times24hr[i-1]);
    }
  }

  return rowsToReturn;
}

/**
 *This method will fill each of the COArray with the corresponding
 * course offerings so that they can show up alongside the tables
 * in a manner that is easy to navigate
 */
async function getCOs(table, term, program, groupLetter) {
  const courseOfferings = await CourseOffering.findAll({
    where: {
      [Op.and]: [
        {startDate: {[Op.lte]: table.endDate}},
        {endDate: {[Op.gte]: table.startDate}},
      ],
      group: groupLetter,
      ProgramId: program.id,
      TermId: term.id,
    },
  });
  return courseOfferings;
}

/**
 * This will create an a tablerow[] in each of the schedules, which will
 * be 8 long, and each tableRow[N] has a tableItem[] which is 6 long and
 * contains a program, course, and name. The name will instead be a time
 * if it is the first index
 */


module.exports = router;
