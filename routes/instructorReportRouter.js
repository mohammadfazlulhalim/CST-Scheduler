const express = require('express');
const router = express.Router();
const Instructor = require('../private/javascript/Instructor');
const Term = require('../private/javascript/Term');
const Timeslot = require('../private/javascript/Timeslot');
const {sequelize} = require('../dataSource');
const {testConst} = require('../constants');
const constants = require('constants');



/**
 * Processing GET request for rendering the instructor report page.
 *
 */
router.get('/', async function(req, res, next) {
  let program='';
  const dateGenerated= new Date();
  const monthArray=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  const timeDisplayHours = testConst.timeColumn8amTo3pmDisplayArray;

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

  try {
    instRepTimeslots = await Timeslot.findAll( {
      where: {InstructorId: instructorID, TermId: termID},
    //   TODO set up sort here
    });
  } catch (e) {
    console.log(e)
  }




});

const updateReportPage = async (termID, instructorID) => {
  let errors; // Define the errors variable

  try {
    // Update the program attributes
    const programUpdated = await programToUpdate.update({
      programName: newName,
      programAbbreviation: newAbbr,
    });
    return programUpdated;
  } catch (err) {
    errors = mapErrors(err);

    // console.error(errors);
    return errors;
  }
};

/**
 * Helper function for the POST.
 * Help to gather timeslots for instructor
 */
function generateSchedule() {

}


module.exports = router;
