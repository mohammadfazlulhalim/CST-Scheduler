const express = require('express');
const router = express.Router();
const Instructor = require('../private/javascript/Instructor');
const Term = require('../private/javascript/Term');
const Timeslot = require('../private/javascript/Timeslot');
const {sequelize} = require('../dataSource');
const {testConst} = require('../constants');
const constants = require('constants');

// TODO: regenerate list on post for modal
/**
 * Processing GET request for rendering the instructor report page.
 *
 */
router.get('/', async function(req, res, next) {
  let program='';
  const dateGenerated= new Date();
  const monthArray=['Jan', 'Feb', 'Mar', 'Apr', 'May',
    'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  const timeDisplayHours = testConst.timeColumn8amTo3pmDisplayArray;

  // TODO REMOVE THIS TEMPORARY CALL TO

  let instructorList;
  let termList;

  try {
    instructorList= await Instructor.findAll({order: ['lastName']});
  } catch (err) {
    instructorList = undefined;
  }
  try {
    termList= await Term.findAll({order: ['termNumber']});
  } catch (err) {
    termList = undefined;
  }

  const instructor={
    lastName: 'BensonBenson',
    firstName: 'Onisheknooo',
  };

  const t={
    c: 'CSEC280B',
    roomNum: 244,
    term: 2,
  };


  if (t.term > 3) {
    program = 'CST 2';
  } else {
    program ='CST 1';
  }

  res.render('instructorReport', {
    instructor,
    timeslot: t,
    programYear: program,
    dateGen: dateGenerated.getDate()+'-'+monthArray[dateGenerated.getMonth()]+'-'+dateGenerated.getFullYear(),
    instructorList,
    termList,
    timeDisplayHours,
  });
});


/**
 * After the completion of the instructor report form,
 * this processes the POST request to render the instructor report
 * for the requested instructor(s)
 */
router.post('/', async function(req, res, next) {
  await sequelize.sync();

  const instructorID = req.body.instructor;
  const termID = req.body.term;
  let instRepTimeslots;
  let instructorName;


  try {
    instructorName = await Instructor.findOne({where: {InstructorId: instructorID}});
  } catch (err) {
    instructorName = undefined;
  }

  try {
    instRepTimeslots = await Timeslot.findAll( {
      where: {InstructorId: instructorID, TermId: termID},
      order: [['startTime', 'ASC'], ['day', 'ASC']],

    });
  } catch (e) {
    console.log(e);
  }


  res.render('instructorReport', {
    instRepTimeslots,
    instructorName,
  });
});


/**
 * Helper function for the POST.
 * Help to gather timeslots for instructor
 * // TODO establish empty cells within the final array
 * //
 */
function generateSchedule() {
  let matrixTable = [

  ];

  let row = 0;
  let col = 0;



  console.log(matrixTable)

}


module.exports = router;
