const express = require('express');
const router = express.Router();

const CourseOffering = require('../private/javascript/CourseOffering');
const Timeslot = require('../private/javascript/Timeslot');
const Term = require('../private/javascript/Term');
const Program = require('../private/javascript/Program');
// eslint-disable-next-line no-unused-vars
const Instructor = require('../private/javascript/Instructor');
const {Op} = require('sequelize');

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
  // const GROUP_LETTERS = ['A', 'B', 'C', 'D'];
  // const DAYS = [0, 1, 2, 3, 4, 5];
  // const TIMES = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'];
  // const DISPLAY_TIMES = ['8:00', '9:00', '10:00', '11:00', '12:00', '1:00', '2:00', '3:00'];
  // const timeslotArray = new Array(req.body.group);
  // const groupLetters = new Array(req.body.group);
  // const courseOfferings = await CourseOffering.findAll({where: {ProgramId: req.body.program, TermId: req.body.term}});
  // const timeSlots = await Timeslot.findAll({where: {ProgramId: req.body.program, TermId: req.body.term}});
  const term = await Term.findByPk(req.body.term);
  const program = await Program.findByPk(req.body.program);


  // const groups = {}; // Initialize groups as an empty object.
  // groups.schedule = {};
  // groups.schedule.startDate = undefined;
  // groups.schedule.endDate = undefined;
  // groups.schedule.table = {};
  // groups.schedule.table.startDate = undefined;
  // groups.schedule.table.endDate = undefined;
  // groups.schedule.table.tableRow = {};
  // groups.schedule.table.tableRow.tableItem = {};
  // groups.schedule.COArray = [];


  const groups = [{
    schedule: [{
      startDate: term.startDate,
      endDate: term.endDate,
      COArray: [undefined],
      table: [{
        startDate: undefined,
        endDate: undefined,
        tableRow: createTimeTableRow(8, 8, 6), // Start at 08:00, create 8 rows, each with 6 items
      }],
    }],
  }];


  await getGroups(groups, term, program);

  console.log(groups);


  res.render('schedule', {
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
async function getGroups(groups, term, program) {
  const groupLetters = ['A', 'B', 'C', 'D'];
  for (let i=0; i<groups.length; i++) {
    try {
      groups[i] = await getSchedules(term, program, groupLetters[i], groups[i]);
    } catch (e) {
      console.log(e);
    }
  }
}

/**
 * This method will fill each schedule with the required information
 * which is the dates, course offerings, and tables
 */
async function getSchedules(term, program, groupLetter, schedule) {
  const courseOfferings = await CourseOffering.findAll({where: {group: groupLetter, ProgramId: program.id, TermId: term.id}});
  const uniqueDates = [term.startDate, term.endDate];
  courseOfferings.forEach((CO) => {
    if (!uniqueDates.includes(CO.startDate)) {
      uniqueDates.push(CO.startDate);
    }
  });
  uniqueDates.sort();
  for (let i=0; i<uniqueDates.length-1; i++) {
    schedule.table[i].startDate = uniqueDates[i];
    schedule.table[i].endDate = uniqueDates[i+1];
    schedule.COArray[i] = await getCOs(schedule.table[i], schedule.COArray[i], term, program, groupLetter);
    schedule.table[i] = await getTables(schedule.table[i], schedule.COArray[i], term, program, groupLetter);
  }
}

/**
 * This method will get the information needed for each table
 * so that it can be indexed in a way that is easy to understand
 * and edit the information for the hbs
 * each table has a startdate, enddate, tablerow[] which has tableItem[]
 */
async function getTables(table, COArray, term, program, groupLetter) {
  return [table, COArray, term, program, groupLetter];
}

/**
 *This method will fill each of the COArray with the corresponding
 * course offerings so that they can show up alongside the tables
 * in a manner that is easy to navigate
 */
async function getCOs(table, COArray, term, program, groupLetter) {
  const courseOfferings = await CourseOffering.findAll({
    where: {
      [Op.and]: [
        {startDate: {[Op.lte]: table.endDate}},
        {endDate: {[Op.gte]: table.startDate}},
      ],
      group: groupLetter,
      ProgramId: program,
      TermId: term,
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
function createTimeTableRow(hourStart, numRows, numItems) {
  return Array.from({length: numRows}, (_, rowIndex) => {
    // Calculate the time for each row, converting to military time format.
    const time = `${hourStart + rowIndex}:00`;
    return {
      time: time,
      tableItem: Array.from({length: numItems}, (item, itemIndex) => ({
        // Initialize the first tableItem with the row's time, others remain undefined
        program: itemIndex === 0 ? undefined : undefined,
        course: itemIndex === 0 ? undefined : undefined,
        name: itemIndex === 0 ? time : undefined,
      })),
    };
  });
}


module.exports = router;
