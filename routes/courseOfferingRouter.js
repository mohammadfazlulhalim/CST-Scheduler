const express = require('express');
const router = express.Router();
const CourseOffering = require('../private/javascript/CourseOffering');
const Term = require('../private/javascript/Term');
const Program = require('../private/javascript/Program');
const Instructor = require('../private/javascript/Instructor');
const Course = require('../private/javascript/Course');

// const Course = require('../private/javascript/Course');
// const Term = require('../private/javascript/Term');
// const Instructor = require('../private/javascript/Instructor');
// const Program = require('../private/javascript/Program');


// GET handler for http://localhost:3000/course-offering
router.get('/', async function(req, res, next) {
  const listCO = await getCOList();
  const listTerm = await getTerms();
  const listProgram = await Program.findAll({order: [['programAbbreviation', 'ASC']]});
  const listInstructor = await Instructor.findAll({order: [['lastName', 'ASC']]});
  const listCourse = await Course.findAll({order: [['courseCode', 'ASC']]});


  // render the courseOffering template file with appropriate title and the retrieved list of course offerings
  res.render('courseOffering', {
    title: 'Course Offerings',
    listCO: listCO,
    listTerm,
    listProgram,
    listInstructor,
    listCourse
  });
});

router.post('/', async function(req, res, next) {
  await CourseOffering.sync();
  const listTerm = await getTerms();
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
    InstructorId: req.body.instructor,
    ProgramId: req.body.program,

  };

  const retCreate = await createCourseOffering(newCO);
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
    title: 'Course Offerings',
    listCO: listCO,
    err: violations,
    submittedCO: violations ? req.body : undefined,
    listTerm,
    listProgram,
    listInstructor,
    listCourse
  });
});

router.put('/', async function(req, res, next) {
  // console.log('PUT: ' + JSON.stringify(req.body));
  const listTerm = await getTerms();
  const listProgram = await Program.findAll({order: [['programAbbreviation', 'ASC']]});
  const listInstructor = await Instructor.findAll({order: [['lastName', 'ASC']]});
  const listCourse = await Course.findAll({order: [['courseCode', 'ASC']]});

  const newCO = {
    id: req.body.id,
    name: req.body.name,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    group: req.body.group,
    CourseId: req.body.course,
    TermId: req.body.term,
    InstructorId: req.body.instructor,
    ProgramId: req.body.program,
  };

  const retUpdate = await updateCourseOffering(newCO);
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
    title: 'Course Offerings',
    listCO: listCO,
    putErr: violations,
    submittedCO: violations ? req.body : undefined,
    listTerm,
    listProgram,
    listInstructor,
    listCourse
  });
});

router.delete('/', async function(req, res, next) {
  // console.log('DELETE: ' + JSON.stringify(req.body));
  const listTerm = await Term.findAll({order: [['termNumber', 'ASC'], ['startDate', 'DESC']]});
  const listProgram = await Program.findAll({order: [['programAbbreviation', 'ASC']]});
  const listInstructor = await Instructor.findAll({order: [['lastName', 'ASC']]});
  const listCourse = await Course.findAll({order: [['courseCode', 'ASC']]});
  const retDelete = await deleteCourseOffering(req.body);
  let violations;
  if (retDelete <= 0) {
    res.status(404);
    violations = {id: 'Course Offering not found; cannot delete'};
  }

  const listCO = await getCOList();

  res.render('courseOffering', {
    title: 'Course Offerings',
    listCO: listCO,
    err: violations,
    submittedCO: violations ? req.body : undefined,
    listTerm,
    listProgram,
    listInstructor,
    listCourse
  });
});

/**
 * Creates a course offering in the database, returns course offering
 * @param createCO
 */
async function createCourseOffering(createCO) {
  try {
    // console.log('Syntax of the new create is: ' + JSON.stringify(createCO));
    return await CourseOffering.create(createCO);
  } catch (e) {
    // console.log('Error is: ' + e);
    return mapErrors(e);
  }
}

/**
 * Updates an entry in course offering table, return updates course offering
 * @param updateCO
 */
async function updateCourseOffering(updateCO) {
  try {
    const updated = await CourseOffering.findByPk(updateCO.id);

    return await updated.update(updateCO);
  } catch (e) {
    return mapErrors(e);
  }
}

/**
 * deletes a course offering from the database, void return
 * @param deleteCO
 */
async function deleteCourseOffering(deleteCO) {
  try {
    return await CourseOffering.destroy({
      where: {
        id: deleteCO.id,
      },
    });
  } catch (e) {
    return 0;
  }
}

/**
 * gets a list of Course Offerings in the database
 */
async function getCOList() {
  let listCO;

  // retrieve all course offerings from the database
  try {
    listCO = await CourseOffering.findAll({include: [Program, Course, Instructor, Term]});
    // loop through the list, and format every term to add in title
    for (let i=0; i<listCO.length; i++) {
      if (listCO[i].Term) {
        listCO[i].Term = createTermTitle(listCO[i].Term);
      }
    }
    // console.log(JSON.stringify(listCO))

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
const mapErrors = (err) => {
  const violations = {error: {}};

  if (err.errors && err.errors.length > 0) {
    for (const error of err.errors) {
      violations.error[error.path] = error.message;
    }
  } else {
    // If the expected errors structure is not found, handle it accordingly
    violations.error.general = 'An unexpected error occurred.';
  }

  return violations;
};

async function getTerms() {
  const terms = await Term.findAll({order: [['startDate', 'DESC'],['termNumber', 'ASC']]});
  for (let i=0; i<terms.length; i++) {
    terms[i] = createTermTitle(terms[i]);
  }

  return terms;
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

module.exports = {router, createCourseOffering, updateCourseOffering, deleteCourseOffering};

