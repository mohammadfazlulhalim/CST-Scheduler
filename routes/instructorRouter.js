const express = require('express');
const router = express.Router();
const Instructor = require('../private/javascript/Instructor');
const {sequelize} = require('../dataSource');
const URL = require('../constants').URL;
const title = require('../constants').pageTitles.instructor;
router.get('/', async function(req, res, next) {
  // Declaring the array
  const instructorLists = await readAllInstructors();

  res.render('instructor', {
    title,
    instructorList: instructorLists,
     URL
  });
});

/**
 * POST handler for http://localhost:3000/instructor
 */
router.post('/', async function(req, res, next) {
  await sequelize.sync();
  // attempt to create the given instructor
  const result = await createInstructor({
    // instructorID: req.body.instructorID,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    officeNum: req.body.officeNum,
    phoneNum: req.body.phoneNum,
    email: req.body.email,
  });

  let violations;
  if (result.error) {
    // if the instructor does not have a start/end date, that means it's invalid and errors were sent back
    res.status(422);
    // send error messages to the hbs template
    violations = result.error;
  } else {
    // creation was successful
    res.status(201);
    // put the ID in the response so tests can access iti

    res.set('id', result.id);
  }
  const instructorLists = await readAllInstructors();

  res.render('instructor', {
    title,
    instructorList: instructorLists,
    err: violations,
    submittedInstructor: violations ? req.body : undefined,
    URL
  });
});

/**
 * DELETE handler for http://localhost:3000/instructor
 */
router.delete('/', async function(req, res, next) {

  const result = await deleteInstructor({id: req.body.id});
  let violations;
  if (result <= 0) {
    res.status(404);
    violations = {id: 'Instructor not found; cannot delete'};
  }
  const instructorLists = await readAllInstructors();
  res.render('instructor', {
    title,
    instructorList: instructorLists,
    err: violations,
    submittedInstructor: violations ? req.body : undefined,
    URL
  });
});

/**
 * PUT request handler for http://localhost:3000/instructor
 */
router.put('/', async function(req, res, next) {
  const result = await updateInstructor({
    id: req.body.id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    officeNum: req.body.officeNum,
    phoneNum: req.body.phoneNum,
    email: req.body.email,
  });

  let violations;
  if (result.error) {
    if (result.error.invalidKey) {
      // if the invalidKey message is defined, then a non-existent instructor is trying to update
      res.status(404);
    } else {
      // if the instructor does not have a start/end date, that means it's invalid and errors were sent back
      res.status(422);
    }
    violations = result.error;
  }
  const putSubmittedInstructor= req.body;
  const instructorLists = await readAllInstructors();


  res.render('instructor', {
    title,
    instructorList: instructorLists,
    putErr: violations,
    putSubmittedInstructor,
    URL
  });
});

/**
 * Attempts to create the given instructor in the database
 * @param {Object} instructor  - An object literal with the desired instructor to create
 * @return {Promise<any>} - the created instructor if successful, a list of errors if not
 */
const createInstructor = async (instructor) => {
  try {
    return await Instructor.create({
      // instructorID: instructor.instructorID,
      firstName: instructor.firstName,
      lastName: instructor.lastName,
      officeNum: instructor.officeNum,
      phoneNum: instructor.phoneNum,
      email: instructor.email,
    });
  } catch (err) {
    // return formatted errors
    return mapErrors(err);
  }
};

/**
 * Attempts to delete the given instructor from the database.
 * @param {Object} instructor       - The instructor to delete
 * @return {Promise<number>}  - The number of rows deleted; should only be 1 if successful
 */
const deleteInstructor = async (instructor) => {
  try {
    // try to delete the instructor
    // return await Instructor.destroy({where: {id: parseInt(instructor.id)}});

    return await Instructor.destroy({where: {id: instructor.id}});
  } catch (err) {
    // if an error occurred, state that 0 rows were deleted
    return 0;
  }
};

/**
 * Attempts to update the given instructor in the database.
 * @param {Object} instructor     - The instructor to update
 * @return {Promise<any>}  - The updated instructor if successful, a list of errors otherwise
 */
const updateInstructor = async (instructor) => {
  // find the instructor to update
  const instructorToUpdate = await Instructor.findByPk(instructor.id);

  if (instructorToUpdate) {
    // only try to update the instructor if it already exists
    try {
      return await instructorToUpdate.update({
        id: instructor.id,
        firstName: instructor.firstName,
        lastName: instructor.lastName,
        officeNum: instructor.officeNum,
        phoneNum: instructor.phoneNum,
        email: instructor.email,
      });
    } catch (err) {
      // return formatted validation errors when invalid
      return mapErrors(err);
    }
  } else {
    // if not found, return an invalid key error message
    return {error: {invalidKey: 'Could not find an existing instructor to update'}};
  }
};


/**
 * Returns all instructor objects in the database.
 */
const readAllInstructors = async () => {
  try {
    // Calling the database, for all instructor entries, ordered by instructor number
    return await Instructor.findAll({order: ['firstName']});
  } catch (err) {
    // If it is not found, declaring instructorList as undefined so that table will not be viewed on instructor.hbs
    // and instead a sentence declaring no instructor entries found is displayed
    return undefined;
  }
};

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


module.exports = {router, createInstructor, deleteInstructor, updateInstructor};
