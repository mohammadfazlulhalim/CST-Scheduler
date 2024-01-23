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
  const  realTerm = await term.findOne({where: {id: req.body.term}});
  const  realClassroom = await classroom.findOne({where: {id: req.body.classroom}});

  const TimeSlots = await generateSchedule(realTerm.startDate, realTerm.endDate, realClassroom);

  //not gpt generated trust
  const ScheduleArray = Array.from({ length: 8 }, () => Array(5));
  // const ScheduleArray = [Array(5),Array(5),Array(5),Array(5),Array(5),Array(5),Array(5),];

  const TIMES = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'];

  for (let ts of TimeSlots) {
     ScheduleArray[TIMES.indexOf(ts.startTime)][ts.day] = ts;
  }

  res.render('schedule', {
    ScheduleArray,
    DAYS,
    TIMES,
  });
});

 function generateSchedule(startDate, endDate, classroom) {
  return   timeslot.findAll({
    where: {startDate, endDate, ClassroomId: classroom.id},
  });
}

module.exports = {router};
