const express = require('express');
const router = express.Router();
const {sequelize} = require('../dataSource');
const term = require('../private/javascript/Term');
const classroom = require('../private/javascript/Classroom');
const timeslot = require('../private/javascript/Timeslot');
const {addAssociations} = require('../private/javascript/Associations');
const createAllTables = require('../fixtures/createTables.fix');

router.get('/', async (req, res, next) => {
  const terms = await term.findAll({order: [['termNumber', 'ASC'], ['startDate', 'DESC']]});
  const classrooms = await classroom.findAll({order: [['roomNumber', 'ASC']]});

  res.render('classroomReport', {
    title: 'Classroom Report',
    terms,
    classrooms,
  });
});
router.post('/', async (req, res, next) => {
  // reloading the models with associations
  await addAssociations();
  await createAllTables(false);

  // const hardTerm = await Term.findOne({where: {startDate: testConst.term1.startDate}}); //change to ID later
  // const hardProg = await Program.findOne({where: {programAbbreviation: testConst.program1.programAbbreviation}}); //change to id later
  // const  realTerm = await term.findOne({where: {termNumber: res.body.termSelect}});

  const TimeSlots = generateSchedule(realTerm.startDate, realTerm.endDate, realClassroom);

  const ScheduleArray = [[], [], [], [], [], [], [], []];

  const DAYS = [0, 1, 2, 3, 4, 5];
  const TIMES = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'];

  // eslint-disable-next-line guard-for-in
  for (ts in Timeslots) {
    ScheduleArray[TIMES.indexOf(ts.startTime)][DAYS.indexOf(ts.day)] = ts;
  }

  // const timeslotMatrix = [[], [] , [], [], []];
  let timeslotArray = new Array(hardGroups);
  const groupLetters = new Array(hardGroups);

  ScheduleArray.push({
    timeslotMatrix: [[], [], [], [], [], [], [], []], // outer array is times, each inner array is days
    COArray: new Array(hardGroups),
    groupLetter: GROUP_LETTERS[i],
  });

  // Creating the 2D array with empty values
  for (t in TIMES) {
    for (d in DAYS) {
      let timeOb = null;
      if (d == 0) {
        // just storing the time
        // TODO converting the time
        timeOb = TIMES[t];
      }
      groupArray[i].timeslotMatrix[t][d] = {
        hasObj: false,
        tTime: t,
        tDays: d,
        timeslot: timeOb,
      };
    }
  }

  try {
    timeslotArray = await Timeslot.findAll({
      where: {
        classroom: GROUP_LETTERS[i],
        ProgramId: hardProg.id,
        TermId: hardTerm.id,
      },
    });
  } catch (error) {
    // console.log('Error is: ' + error);
  }


  // mapping each timeslot in this group to the matrix
  for (const tSlot of timeslotArray) {
    const formattedTSlot = await formatCellInfo(tSlot);
    groupArray[i].timeslotMatrix[TIMES.indexOf(tSlot.startTime)][tSlot.day].timeslot = formattedTSlot;// outer array is days, each inner array is times
  }
  groupLetters[i] = GROUP_LETTERS[i];


  res.render('schedule', {

    DAYS,
    TIMES,
  });
});

function generateSchedule(startDate, endDate, classroom) {
  const timeslots = timeslot.findAll({
    where: {},
  });

  return timeslots;
}

async function formatCellInfo(tSlot) {
  coObj = await tSlot.getCourseOffering();
  cObj = await coObj.getCourse();


  insObj = await tSlot.getInstructor();

  return cObj.courseCode + '    ' + insObj.lastName;
}


module.exports = {router};
