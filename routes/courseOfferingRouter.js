const express = require('express');
const router = express.Router();
const CourseOffering = require('../private/javascript/CourseOffering');
const Term = require('../private/javascript/Term');
const Program = require('../private/javascript/Program');
const Instructor = require('../private/javascript/Instructor');
const Course = require('../private/javascript/Course');
const URL = require('../constants').URL;
const getSortedTerm = require('./termRouter').readAllTerms;
const CourseOfferingMethods = require('../private/javascript/courseOfferingMethods');

// GET handler for http://localhost:3000/course-offering
router.get('/', async function(req, res, next) {
  const listCO = await getCOList();
  // const listTerm = await getTerms();
  const listTerm = await getSortedTerm();
  const listCourse = await getCourses();
  const listProgram = await Program.findAll({order: [['programAbbreviation', 'ASC']]});
  const listInstructor = await Instructor.findAll({order: [['lastName', 'ASC']]});


  // render the courseOffering template file with appropriate title and the retrieved list of course offerings
  res.render('courseOffering', {
    title: 'Manage Course Offerings',
    listCO: listCO,
    listTerm,
    listProgram,
    listInstructor,
    listCourse,
    URL,
  });
});

router.post('/', async function(req, res, next) {
  console.log(JSON.stringify(req.body));
  await CourseOffering.sync();
  const listTerm = await getSortedTerm();
  const listProgram = await Program.findAll({order: [['programAbbreviation', 'ASC']]});
  const listInstructor = await Instructor.findAll({order: [['lastName', 'ASC']]});
  const listCourse = await Course.findAll({order: [['courseCode', 'ASC']]});

  const newCO = {
    name: req.body.name,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    group: req.body.group,
    CourseId: req.body.course,
    TermId: req.body.term,
    primaryInstructor: req.body.primaryInstructor,
    alternativeInstructor: req.body.alternativeInstructor,
    ProgramId: req.body.program,
  };

  const retCreate = await CourseOfferingMethods.createCourseOffering(newCO);
  let violations;
  if (retCreate.error) {
    res.status(422);
    // send error messages to the hbs template
    violations = retCreate.error;
  } else {
    // creation was successful
    res.status(201);
    // put the ID in the response so tests can access it
    res.set('id', retCreate.id);
  }

  const listCO = await getCOList();

  res.render('courseOffering', {
    title: 'Manage Course Offerings',
    listCO: listCO,
    err: violations,
    submittedCO: violations ? req.body : undefined,
    listTerm,
    listProgram,
    listInstructor,
    listCourse,
    URL,
  });
});

router.put('/', async function(req, res, next) {
  const listTerm = await getSortedTerm();
  const listProgram = await Program.findAll({order: [['programAbbreviation', 'ASC']]});
  const listInstructor = await Instructor.findAll({order: [['lastName', 'ASC']]});
  const listCourse = await getCourses();


  const newCO = {
    id: req.body.id,
    name: req.body.name,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    group: req.body.group,
    CourseId: req.body.course,
    TermId: req.body.term,
    primaryInstructor: req.body.primaryInstructor,
    alternativeInstructor: req.body.alternativeInstructor,
    ProgramId: req.body.program,
  };

  const retUpdate = await CourseOfferingMethods.updateCourseOffering(newCO);

  let violations;
  if (retUpdate.error) {
    res.status(422);
    // send error messages to the hbs template
    violations = retUpdate.error;
  } else {
    // creation was successful
    res.status(200);
    // put the ID in the response so tests can access it
    res.set('id', retUpdate.id);
  }

  const listCO = await getCOList();

  res.render('courseOffering', {
    title: 'Manage Course Offerings',
    listCO: listCO,
    putErr: violations,
    submittedCO: violations ? req.body : undefined,
    listTerm,
    listProgram,
    listInstructor,
    listCourse,
    URL,
  });
});

router.delete('/', async function(req, res, next) {
  const listTerm = await getSortedTerm();
  const listProgram = await Program.findAll({order: [['programAbbreviation', 'ASC']]});
  const listInstructor = await Instructor.findAll({order: [['lastName', 'ASC']]});
  const listCourse = await getCourses();
  const retDelete = await CourseOfferingMethods.deleteCourseOffering(req.body);
  let violations;
  if (retDelete <= 0) {
    res.status(404);
    violations = {id: 'Course Offering not found; cannot delete'};
  }

  const listCO = await getCOList();

  res.render('courseOffering', {
    title: 'Manage Course Offerings',
    listCO: listCO,
    err: violations,
    submittedCO: violations ? req.body : undefined,
    listTerm,
    listProgram,
    listInstructor,
    listCourse,
    URL,
  });
});


/**
 * gets a list of Course Offerings in the database
 */
async function getCOList() {
  let listCO;

  // retrieve all course offerings from the database
  try {
    listCO = await CourseOffering.findAll({include: [Program, Course, Instructor, Term], order: [['name'], ['group']]});
    // loop through the list, and format every term to add in title
    for (let i=0; i<listCO.length; i++) {
      if (listCO[i].Term) {
        listCO[i].Term = createTermTitle(listCO[i].Term);

        if (listCO[i].primaryInstructor) {
          listCO[i].primaryInstructor = await Instructor.findOne({where: {id: listCO[i].primaryInstructor}});
        }

        // Find alternative instructor
        if (listCO[i].alternativeInstructor) {
          listCO[i].alternativeInstructor = await Instructor.findOne({where: {id: listCO[i].alternativeInstructor}});
        }
      }
    }
  } catch (err) {
    // if unable to retrieve from database; e.g., no records exist
    listCO = undefined;
  }

  return listCO;
}


/**
 * Given an error object, this function maps it to a more presentable format for the hbs template.
 * @param {Object} err  - An object representing errors
 * @return {{}}         - Formatted error object
 */



async function getCourses() {
  const courses = await Course.findAll({order: [['courseCode', 'ASC']]});

  for (let i = 0; i < courses.length; i++) {
    // Await the getInstructor() method call
    courses[i].instructor = await courses[i].getInstructor();
  }

  return courses;
}

/**
 * This function takes in a term, and returns a term with an attribute title
 * which is year-number
 * @param term
 */
function createTermTitle(term) {
  const splitDate = term.startDate.split('-');
  term.title = splitDate[0] + '-' + term.termNumber;
  return term;
}

module.exports = {router}

