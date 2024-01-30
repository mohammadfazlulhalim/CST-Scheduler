const express = require('express');
const router = express.Router();
const CourseOffering = require('../private/javascript/CourseOffering');

// const Course = require('../private/javascript/Course');
// const Term = require('../private/javascript/Term');
// const Instructor = require('../private/javascript/Instructor');
// const Program = require('../private/javascript/Program');


// GET handler for http://localhost:3000/course-offering
router.get('/', async function(req, res, next) {
  const listCO = await getCOList();

  // render the courseOffering template file with appropriate title and the retrieved list of course offerings
  res.render('courseOffering', {
    title: 'Course Offerings',
    listCO: listCO,
  });
});

router.post('/', async function(req, res, next) {
  await CourseOffering.sync();

  const newCO = {
    name: req.body.name,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    group: req.body.group,
    courseID: req.body.courseID,
    termID: req.body.termID,
    instructorID: req.body.instructorID,
    programID: req.body.programID,
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
  });
});

router.put('/', async function(req, res, next) {
  // console.log('PUT: ' + JSON.stringify(req.body));

  const newCO = {
    id: req.body.id,
    name: req.body.name,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    group: req.body.group,
    courseID: req.body.courseID,
    termID: req.body.termID,
    instructorID: req.body.instructorID,
    programID: req.body.programID,
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
  });
});

router.delete('/', async function(req, res, next) {
  // console.log('DELETE: ' + JSON.stringify(req.body));
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
    listCO = await CourseOffering.findAll();
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

module.exports = {router, createCourseOffering, updateCourseOffering, deleteCourseOffering};

