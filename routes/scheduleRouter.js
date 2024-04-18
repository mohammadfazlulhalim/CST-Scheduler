const express = require('express');
const router = express.Router();

const CourseOffering = require('../private/javascript/CourseOffering');
const Classroom = require('../private/javascript/Classroom');
const Timeslot = require('../private/javascript/Timeslot');
const Term = require('../private/javascript/Term');
const Program = require('../private/javascript/Program');
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
  const groupCount = req.body.group;
  const classrooms = await Classroom.findAll();
  groups = [];


  await getGroups(term, program, groupCount);
  const groupLetters = [];
  groups.forEach((e) => groupLetters.push(e.groupLetter));

  res.render('schedule', {
    term,
    program,
    isHidden: false,
    groups,
    classrooms,
    groupLetters,
  });
});


router.put('/', async (req, res) => {
  const TIMES = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];
  const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const GROUPS = ['A', 'B', 'C', 'D'];

  const CO = await CourseOffering.findByPk(req.body.COId);
  if (!CO) {
    res.status(404).send('Course Offering not found.');
    return;
  }

  // Correct overlap condition to check only relevant overlapping timeslots
  const overlappingTimeslot = await Timeslot.findOne({
    where: {
      startTime: TIMES[req.body.timeIndex - 1],
      day: req.body.dayOfWeek,
      group: GROUPS[req.body.group],
      ProgramId: CO.ProgramId,
      [Op.and]: [
        {startDate: {[Op.lte]: CO.endDate}},
        {endDate: {[Op.gte]: CO.startDate}},
      ],
    },
  });

  if (overlappingTimeslot) {
    res.status(409).send('A conflicting timeslot already exists.');
  } else {
    const newTimeslot = {
      startDate: CO.startDate,
      endDate: CO.endDate,
      CourseOfferingId: CO.id,
      primaryInstructor: CO.primaryInstructor,
      alternativeInstructor: CO.alternativeInstructor,
      ClassroomId: req.body.classroom,
      TermId: CO.TermId,
      ProgramId: CO.ProgramId,
      startTime: TIMES[req.body.timeIndex - 1],
      endTime: TIMES[req.body.timeIndex],
      day: req.body.dayOfWeek,
      group: GROUPS[req.body.group],
    };

    const retTimeslot = await Timeslot.create(newTimeslot);
    res.status(201).send(retTimeslot);
  }
});


router.delete('/', async (req, res) => {
  await Timeslot.destroy({where: {id: req.body.tsID}});

  res.status(200).json();
});

/**
 *This method will take in the groups object, term, and program,
 * and it will fill each groups as specified in the module
 * to be filled with the accompanying information
 */
async function getGroups(term, program, groupCount) {
  const groupLetters = ['A', 'B', 'C', 'D'];

  for (let i=0; i<groupCount; i++) {
    groups[i] = {
      groupLetter: groupLetters[i],
      schedule: {
        startDate: term.startDate,
        endDate: term.endDate,
        split: [],
      },
    };
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
  for (const e of timeSlots) {
    try {
      e.primaryInstructor = await Instructor.findByPk(e.primaryInstructor);
      e.alternativeInstructor = await Instructor.findByPk(e.alternativeInstructor);
      e.courseOffering = await CourseOffering.findByPk(e.CourseOfferingId);
      e.classroom = await Classroom.findByPk(e.ClassroomId);
      e.course = await e.courseOffering.getCourse();
    } catch (f) {
      e.primaryInstructor='';
      e.alternativeInstructor='';
      e.courseOffering='';
      e.classroom='';
      await Timeslot.destroy({where: {id: e.id}});
    }
  }

  // check for unique dates
  const uniqueDates = [term.startDate, term.endDate];
  timeSlots.forEach((ts) => {
    if (!uniqueDates.includes(ts.startDate) && ts.startDate > term.startDate) {
      uniqueDates.push(ts.startDate);
    }
    if (!uniqueDates.includes(ts.endDate) && ts.endDate < term.endDate) {
      uniqueDates.push(ts.endDate);
    }
  });
  uniqueDates.sort();

  // make splits based on unique dates
  for (let i=0; i<uniqueDates.length-1; i++) {
    schedule.split[i] = {
      startDate: undefined,
      endDate: undefined,
      tableRows: undefined,
      COArray: [undefined],
    };
    schedule.split[i].startDate = uniqueDates[i];
    schedule.split[i].endDate = uniqueDates[i+1];
    schedule.split[i].COArray = await getCOs(schedule.split[i], term, program, groupLetter);
    schedule.split[i].tableRows = await getTableRows(
        schedule.split[i], schedule.COArray, term, program, groupLetter, timeSlots,
    );
  }
}

/**
 * This method will get the information needed for each table
 * so that it can be indexed in a way that is easy to understand
 * and edit the information for the hbs
 * each table has a startdate, enddate, tablerow[] which has tableItem[]
 */
async function getTableRows(split, COArray, term, program, groupLetter, timeSlots) {
  const topRow = ['Time', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const times24hr = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'];
  const times12hr = ['8:00', '9:00', '10:00', '11:00', '12:00', '1:00', '2:00', '3:00'];
  const rowsToReturn = [];
  rowsToReturn[0] = topRow;

  for (let i=0; i<9; i++) {
    rowsToReturn[i] = [];
    for (let j=0; j<6; j++) {
      if (i===0) {
        rowsToReturn[i][j] = {dateTime: topRow[j]};
        continue;
      }
      if (j===0) {
        rowsToReturn[i][j] = {dateTime: times12hr[i-1]};
        continue;
      }
      rowsToReturn[i][j] = timeSlots.find(
          (ts) => ts.day === j && ts.startTime === times24hr[i-1] &&
              (ts.startDate < split.endDate && ts.endDate > split.startDate));
    }
  }

  return rowsToReturn;
}

/**
 *This method will fill each of the COArray with the corresponding
 * course offerings so that they can show up alongside the tables
 * in a manner that is easy to navigate
 */
async function getCOs(split, term, program, groupLetter) {
  const courseOfferings = await CourseOffering.findAll({
    where: {
      [Op.and]: [
        {startDate: {[Op.lt]: split.endDate}},
        {endDate: {[Op.gt]: split.startDate}},
      ],
      group: groupLetter,
      ProgramId: program.id,
      TermId: term.id,
    },
  });

  for (const e of courseOfferings) {
    e.primaryInstructor = await Instructor.findByPk(e.primaryInstructor);
    e.alternativeInstructor = await Instructor.findByPk(e.alternativeInstructor);
  }
  return courseOfferings;
}


module.exports = router;
