const express = require('express');
const router = express.Router();
const {sequelize} = require('../dataSource');
const term = require('../private/javascript/Term');
const classroom = require('../private/javascript/Classroom');
const timeslot = require('../private/javascript/Timeslot');

router.get('/', async (req, res, next) => {
  const terms = await term.findAll({order: [['termNumber', 'ASC'], ['startDate', 'DESC']]});
  const classrooms = await classroom.findAll({order: [['roomNumber', 'ASC']]});

  res.render('classroomReport', {
    title: 'Classroom Report',
    terms,
    classrooms,
  });
});
router.post('/', (req, res, next) => {
  const term = term.findOne({where: {id: [req.body.term]}});

  timeslots = generateClassroom(term.startDate, term.endDate, req.body.classroom);
  const dateGenerated= new Date().getDate()+'-'+monthArray[dateGenerated.getMonth()]+'-'+dateGenerated.getFullYear();

  res.render('classroomReport', {title: 'Classroom Report',
    startTime: 8,
    endTime: 15,
    timeslots,
    classroom: req.body.classroom,
    dateGenerated,
  });
});

function generateClassroom(startDate, endDate, classroom) {
  const timeslots = timeslot.findAll({
    where: {

    },
  });

  return timeslots;
}


module.exports = {router};
