const express = require('express');
const router = express.Router();
const Instructor = require('../private/javascript/Instructor');
const Term = require('../private/javascript/Term');
const {sequelize} = require('../dataSource');


/**
 * Processing GET request for rendering the instructor report page.
 *
 */
router.get('/', async function(req, res, next) {
  let program='';
  const dateGenerated= new Date();
  const monthArray=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
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
router.post('', function(req, res, next) {

});

/**
 * Helper function for the POST.
 * Help to gather timeslots for instructor
 */
function generateSchedule() {

}


module.exports = router;
