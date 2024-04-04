const Course = require('../private/javascript/Course');
const express = require('express');
const {sequelize} = require('../dataSource');
const Instructor = require('../private/javascript/Instructor');
const Program = require('../private/javascript/Program');
const Term = require('../private/javascript/Term');
const router = express.Router();
const URL=require('../constants').URL;


/**
 * GET handler for http://localhost:3000/course
 */
router.get('/', async (req, res, next)=>{
  // Declaring the array
  const courseLists= await readAllCourses();
  const listInstructor = await Instructor.findAll({order: [['lastName', 'ASC']]});
  // console.log('Course Lists:', courseLists);
  // console.log('List of Instructors:', listInstructor);

  res.render('course', {
    title: 'Manage Courses',
    listInstructor,
    courseList: courseLists, URL,
  });
});


/**
 * POST handler for http://localhost:3000/course
 *
 */
router.post('/', async (req, res, next) => {
  // synchronizing all models at once
  await sequelize.sync();
  const listInstructor = await Instructor.findAll({order: [['lastName', 'ASC']]});

  let result;

  // Check if req.body.instructor is empty
  if (req.body.instructor) {
    // Attempt to create the given course with an instructor
    result = await createCourse({
      id: req.body.id,
      courseCode: req.body.courseCode,
      courseName: req.body.courseName,
      courseNumCredits: req.body.courseNumCredits,
      courseNumHoursPerWeek: req.body.courseNumHoursPerWeek,
      InstructorId: req.body.instructor,
    });
  } else {
    // Attempt to create the given course without an instructor
    result = await createCourse({
      id: req.body.id,
      courseCode: req.body.courseCode,
      courseName: req.body.courseName,
      courseNumCredits: req.body.courseNumCredits,
      courseNumHoursPerWeek: req.body.courseNumHoursPerWeek,
    });
  }

  console.log(req.body.instructor);

  let violations;
  if (result.error) {
    // if the course does not have a start/end date, that means it's invalid and errors were sent back
    res.status(422);
    // send error messages to the hbs template
    violations = result.error;
  } else {
    // creation was successful
    res.status(201);
    // put the ID in the response so tests can access it
    res.set('id', result.id);
  }
  const courseLists= await readAllCourses();

  res.render('course', {
    title: 'Course List',
    courseList: courseLists,
    putErr: violations,
    submittedCourse: violations ? req.body: undefined, URL,
    listInstructor,
  });
});


/**
 * DELETE handler for http://localhost:3000/course
 */
router.delete('/', async function(req, res, next) {
  const result = await deleteCourse({id: req.body.id});
  const listInstructor = await Instructor.findAll({order: [['lastName', 'ASC']]});
  let violations;
  if (result <= 0) {
    res.status(404);
    violations = {id: 'Course not found; cannot delete'};
  }
  const courseLists = await readAllCourses();
  res.render('course', {
    listInstructor,
    title: 'Manage Courses',
    courseList: courseLists,
    putErr: violations,
    submittedCourse: violations ? req.body : undefined, URL,
  });
});

/**
 * PUT request handler for http://localhost:3000/course
 */
router.put('/', async function(req, res, next) {
  const result = await updateCourse({
    id: req.body.id,
    courseCode: req.body.courseCode,
    courseName: req.body.courseName,
    courseNumCredits: req.body.courseNumCredits,
    courseNumHoursPerWeek: req.body.courseNumHoursPerWeek,
    InstructorId: req.body.instructor,
  });
  const listInstructor = await Instructor.findAll({order: [['lastName', 'ASC']]});

  let violations;
  if (result.error) {
    if (result.error.invalidKey) {
      // if the invalidKey message is defined, then a non-existent course is trying to update
      res.status(404);
    } else {
      // if the course does not have a start/end date, that means it's invalid and errors were sent back
      res.status(422);
    }
    violations = result.error;
  }
  const putSubmittedCourse= req.body;
  const courseLists = await readAllCourses();


  res.render('course', {
    title: 'Manage Courses',
    courseList: courseLists,
    putErr: violations,
    listInstructor,
    putSubmittedCourse, URL,

  });
});


/**
 * Attempts to update the given course in the database.
 * @param {Object} course     - The course to update
 * @return {Promise<any>}  - The updated course if successful, a list of errors otherwise
 */
const updateCourse = async (course) => {
  // find the course to update
  const courseToUpdate = await Course.findByPk(course.id);

  if (courseToUpdate) {
    // only try to update the course if it already exists
    try {
      return await courseToUpdate.update(course);
    } catch (err) {
      // return formatted validation errors when invalid
      return mapErrors(err);
    }
  } else {
    // if not found, return an invalid key error message
    return {error: {invalidKey: 'Could not find an existing course to update'}};
  }
};


/**
 * this method weill be used to call database for all course entries ordered by courseCode
 * @return {Promise<undefined|Model<any, TModelAttributes>[]>}
 */
const readAllCourses = async ()=>{
  try {
    // calling the database, for all course entries, ordered by course code
    return await Course.findAll({include: [Instructor], order: ['courseCode']});
  } catch (err) {
    // If course not found in database it will return undefined so that courseList will be empty
    return undefined;
  }
};


/**
 * Attempts to create the given course in the database
 * @param course -An object literal with the desired course to create
 * @return {Promise<{error: {}}>} -the created course if successful, a list of errors if not
 */
const createCourse = async (course)=> {
  try {
    return await Course.create(course);
  } catch (err) {
  // return formatted errors
    return mapErrors(err);
  }
};

/**
 * Attempts to delete the given course from the database.
 * @param {Object} course       - The course to delete
 * @return {Promise<number>}  - The number of rows deleted; should only be 1 if successful
 */

const deleteCourse = async (course) => {
  try {
    return await Course.destroy({where: {id: course.id}});
  } catch (err) {
    // if an error occurred, state that 0 rows were deleted
    return 0;
  }
};
/**
 * Given an error object, this function maps it to a more presentable format for the hbs template.
 * @param err
 * @return {{error: {}}}
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

module.exports = {router, createCourse, deleteCourse, updateCourse};

