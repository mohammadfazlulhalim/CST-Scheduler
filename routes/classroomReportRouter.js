const express = require('express');
const router = express.Router();
const {sequelize} = require('../dataSource');
const term = require('../private/javascript/Term');
const classroom = require('../private/javascript/Classroom');
const timeslot = require('../private/javascript/Timeslot');

router.get('/', (req, res, next) => {
  let terms;
  let classrooms;
  // terms = term.findAll();
  try {
    terms = term.findAll({
      order: [['startDate', 'DESC'], ['id', 'DESC']],
    });
    classrooms = classroom.findAll({
      order: [['roomNumber', 'ASC']],
    });
  } catch (err) {

  }


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
