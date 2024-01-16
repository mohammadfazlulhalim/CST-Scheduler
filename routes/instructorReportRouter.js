const express = require('express');
const router = express.Router();
const Instructor = require('../private/javascript/Instructor');
const Term = require('../private/javascript/Term');
const {sequelize} = require('../dataSource');
const {testConst} = require("../constants");
const constants = require("constants");


/**
 * Processing GET request for rendering the instructor report page.
 *
 */
router.get('/', async function(req, res, next) {
  let program='';
  const dateGenerated= new Date();
  const monthArray=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  let timeDisplay8to3 = testConst.timeColumn8amTo3pmDisplayArray



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
  });
});


/**
 * After the completion of the instructor report form,
 * this processes the POST request to render the instructor report
 * for the requested instructor(s)
 */
router.post('/submit', async function(req, res, next) {

  let instructorList;
  let termList;
  let instructorSelected
  let termSelected;


  // Gather the selections from the selectbox and list on the modal
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

  // check if instructor and term exist - that they are not undefined
  if (instructorSelected && termSelected) {
    // for the selectbox and list on the modal
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
    res.render('instructorReport', {

    })

  } else {
    // if no instructor or no term...
    res.render('instructorReport', {
      title: "No result for instructor report from post handler",
    })
  }


});

/**
 * Helper function for the POST.
 * Help to gather timeslots for instructor
 */
function generateSchedule() {

}


module.exports = router;
