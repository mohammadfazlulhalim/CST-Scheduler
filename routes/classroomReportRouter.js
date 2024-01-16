const express = require('express');
const router = express.Router();
const {sequelize} = require('../dataSource');
const term = require('../private/javascript/Term');
const classroom = require('../private/javascript/Classroom');
const timeslot = require('../private/javascript/Timeslot');

router.get('/classroomReport', (req, res, next) => {
  const terms = term.findAll({
    order: [['startDate', 'DESC'], ['id', 'DESC']],
    attributes: ['id', 'termNumber'],
  });
  const classrooms = classroom.findAll({
    order: ['roomNumber', 'ASC'],
    attributes: ['id', 'roomNumber'],
  });

  res.render('classroomReport', {
    title: 'Classroom Report',
    terms,
    classrooms,
  });
});
router.post('/classroomReport', (req, res, next) => {
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


module.exports = router;
