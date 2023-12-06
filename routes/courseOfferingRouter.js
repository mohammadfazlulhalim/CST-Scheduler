const express = require('express');
const router = express.Router();
const CourseOffering = require('../private/javascript/CourseOffering');

const CourseOfferingRouter = require('../private/javascript/CourseOffering');

// GET handler for http://localhost:3000/course-offering
router.get('/', async function(req, res, next) {

  const listCO = await getCOList();

  // render the courseOffering template file with appropriate title and the retrieved list of course offerings
  res.render('courseOffering', {
    title: 'Course Offerings',
    listCO: listCO,
  });
});

  router.post('/', async function (req, res, next) {

    console.log('POST: ' + JSON.stringify(req.body));
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
    }
    const retCreate = await createCourseOffering(newCO);
    let violations;
    if (retCreate.e) {
      // if the term does not have a start/end date, that means it's invalid and errors were sent back
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
      title: '',
      listCO: listCO,
      putErr: violations,
      submittedCO: violations ? req.body : undefined,
    });
  });

  router.put('/', async function (req, res, next) {
    console.log('PUT: ' + JSON.stringify(req.body));

    await updateCourseOffering(req.body);

    const listCO = await getCOList();

    res.render('courseOffering', {
      title: '',
      listCO: listCO,
      putErr: violations,
      submittedCO: violations ? req.body : undefined,
    });
  });

  router.delete('/', async function (req, res, next) {
    console.log('DELETE: ' + JSON.stringify(req.body));

    await deleteCourseOffering(req.body);

    const listCO = await getCOList();

    res.render('courseOffering', {
      title: '',
      listCO: listCO,
      putErr: violations,
      submittedCO: violations ? req.body : undefined,
    });

  });

  /**
   * Creates a course offering in the database, returns course offering
   * @param createCO
   */
  async function createCourseOffering(createCO) {
    try {
      return await CourseOffering.create(createCO);
    } catch (e) {
      return e;
    }
  }

  /**
   * Updates an entry in course offering table, return updates course offering
   * @param updateCO
   */
  async function updateCourseOffering(updateCO) {
    try {
      const updatedCO = await CourseOffering.findByPk(updateCO.id);

      return await updatedCO.update(updateCO);
    } catch (e) {
      return mapErrors(e);
    }
  }

  /**
   * deletes a course offering from the database, void return
   * @param deleteCO
   */
  function deleteCourseOffering(deleteCO) {
    try {
      return CourseOffering.destroy({
        where: {
          id: deleteCO.id
        },
      })
    } catch (e) {
      return e;
    }
  }

/**
 * gets a list of Course Offerings in the database
 */
async function getCOList() {
  let listCO;

  // retrieve all course offerings from the database
  try {
    listCO = await CourseOfferingRouter.findAll({order: ['courseCode']});
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

