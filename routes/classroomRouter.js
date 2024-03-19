const express = require('express');
const router = express.Router();
const Classroom = require('../private/javascript/Classroom');
const {sequelize} = require('../dataSource');
const URL = require('../constants').URL;
const title = require('../constants').pageTitles.classroom;

const getClassrooms = async () => {
  try {
    return await Classroom.findAll({
      order: ['roomNumber'],
    });
  } catch (error) { // If there are no classrooms, the list will be empty.
    console.error('Error:', error);
    return undefined;
  }
};

/**
 * Returns a list of classrooms retreived from the database to be displayed
 */
router.get('/', async (req, res, next) => {
  const classroomList = await getClassrooms();
  res.render('classroom', {classroomList, title, URL});
});

/**
 * This route uses req.body to save the classroom info inputted
 * to create a new classroom in the database
 * returns 201 if it is created
 * returns 422 if it does not pass validation
 */
router.post('/', async (req, res, next) => {
  await sequelize.sync();
  const courseTempObj = {
    roomNumber: req.body.roomNumber ? req.body.roomNumber : '',
    location: req.body.location ? req.body.location : '',
  };

  let violations;

  const response = await createClassroom(courseTempObj);

  if (response.success === 'Success') {
    res.statusCode = 201;
  } else {
    res.statusCode = 422;
    violations = response.error;
  }
  const classrooms = await getClassrooms();

  res.render('classroom', {
    title,
    classroomList: classrooms,
    err: violations,
    submittedClassroom: violations ? req.body : undefined,
    URL
  });
});

/**
 * This route uses req.body to save the classroom info inputted
 * to update an existing in the database
 * returns 200 if it is save
 * returns 422 if it does not pass validation
 * returns 404 if the classroom to update does not exist
 */
router.put('/', async (req, res, next) => {
  const courseTempObj = {
    id: req.body.id ? req.body.id : '',
    roomNumber: req.body.roomNumber ? req.body.roomNumber : '',
    location: req.body.location ? req.body.location : '',
  };
  let violations;
  const response = await updateClassroom(courseTempObj);
  if (response.success === 'Success') {
    res.statusCode = 200;
  } else if (response.invalidKey) {
    res.statusCode = 404;
  } else {
    violations = response.error;
    res.statusCode = 422;
  }

  const classrooms = await getClassrooms();

  res.render('classroom', {
    title,
    classroomList: classrooms,
    err: violations,
    putClassroom: violations ? req.body : undefined,
    URL
  });
});

/**
 * This route uses req.body to save the classroom info inputted
 * to create a new classroom in the database
 * returns 200 if it is deleted
 * returns 404 if the passed in classroom does not exist
 */
router.delete('/', async (req, res, next) => {
  const courseTempObj = {
    id: req.body.id ? req.body.id : '',
    roomNumber: req.body.roomNumber ? req.body.roomNumber : '',
    location: req.body.location ? req.body.location : '',
  };
  let violations;

  const response = await deleteClassroom(courseTempObj);
  const classrooms = await getClassrooms();

  if (response.success === 'Success') {
    res.statusCode = 200;
  } else {
    violations = response.error;
    res.statusCode = 404;
  }

  res.render('classroom', {
    title,
    classroomList: classrooms,
    err: violations,
    delClassroom: violations ? req.body : undefined,
    URL
  });
});

/**
 * This helper method calls the database to handle create
 * @param classroomObj object literal containing classroom information to create
 * @return {Promise<{}>} object literal containing primary key of classroom created, success message and error messages
 */
async function createClassroom(classroomObj) {
  const createResponse = {};
  try {
    const response = await Classroom.create({roomNumber: classroomObj.roomNumber, location: classroomObj.location});
    createResponse.success = 'Success';
    createResponse.pk = response.id ? response.id : 'Response does not have ID';
  } catch (err) {
    // Need to output these so that each attribute gets proper error message
    createResponse.error ={};
    err.errors.forEach((element) => {
      const objectProp = element.path;
      createResponse.error[objectProp] = element.message;
    });
  }

  return createResponse;
}

/**
 * This helper method calls the database to handle update
 * @param classroomObj object literal containing classroom information to update
 * @return {Promise<{}>} object literal containing primary key of classroom updated, success message and error messages
 */
async function updateClassroom(classroomObj) {
  const updateResponse = {};
  const currentEntry = await Classroom.findByPk(classroomObj.id);

  // checking we have a valid primary key
  if (await Classroom.findByPk(classroomObj.id) != null) {
    try {
      const response = await currentEntry.update({roomNumber: classroomObj.roomNumber, location: classroomObj.location});
      updateResponse.success = 'Success';
      updateResponse.pk = response.id ? response.id : 'Response does not have ID';
    } catch (err) {
      updateResponse.error ={};
      err.errors.forEach((element) => {
        const objectProp = element.path;
        updateResponse.error[objectProp] = element.message;
      });
    }
  } else {
    updateResponse.invalidKey = 'Invalid Primary Key';
  }

  return updateResponse;
}

/**
 * This helper method calls the database to handle delete
 * @param classroomObj object literal containing classroom information to delete
 * @return {Promise<{}>} object literal containing primary key of classroom delete, success message and error messages
 */
async function deleteClassroom(classroomObj) {
  const deleteResponse = {};

  if (await Classroom.findByPk(classroomObj.id) != null) {
    await Classroom.destroy({where: {id: classroomObj.id}});
    deleteResponse.id = classroomObj.id;
    deleteResponse.success='Success';
  } else {
    deleteResponse.error = 'Primary Key does not exist';
  }

  return deleteResponse;
}

module.exports = {router, createClassroom, updateClassroom, deleteClassroom};
