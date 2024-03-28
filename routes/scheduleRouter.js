const express = require('express');
const router = express.Router();

const CourseOffering = require('../private/javascript/CourseOffering');
const Timeslot = require('../private/javascript/Timeslot');
const Term = require('../private/javascript/Term');
const Program = require('../private/javascript/Program');
const defineDB = require('../fixtures/createTables.fix');
const Instructor = require('../private/javascript/Instructor');

router.get('/', async (req, res, next) => {
  terms = await Term.findAll({order: [['startDate', 'DESC'], ['termNumber', 'ASC']]});
  programs = await Program.findAll({order: [['programAbbreviation', 'ASC']]});


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

router.post('/', async (req, res, next) => {
  const groupArray = [];

  // constants
  const GROUP_LETTERS = ['A', 'B', 'C', 'D'];
  const DAYS = [0, 1, 2, 3, 4, 5];
  const TIMES = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'];
  const DISPLAY_TIMES = ['8:00', '9:00', '10:00', '11:00', '12:00', '1:00', '2:00', '3:00'];

  let timeslotArray = new Array(req.body.group);
  const groupLetters = new Array(req.body.group);

  const term = await Term.findByPk(req.body.term);
  const program = await Program.findByPk(req.body.program);

  res.render('schedule', {


  });
});


router.put('/', async (req, res, next) => {
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

  coObj = await retTSlot.getCourseOffering();
  prObj = await retTSlot.getProgram();
  insObj = await retTSlot.getInstructor();
  cObj = await coObj.getCourse();

  const xtraInfo = {};

  xtraInfo.program = prObj.programAbbreviation;
  xtraInfo.insLast = insObj.lastName;

  xtraInfo.course = cObj.courseCode;
  xtraInfo.co = coObj;


  res.status(200).json({retTSlot, xtraInfo});
});


router.delete('/', async (req, res, next) => {
  await Timeslot.destroy({where: {id: req.body.id}});

  res.status(200).json();
});

function getGroupFill() {

}

function getScheduleFill() {

}

function getScheduleItems() {

}



module.exports = router;
