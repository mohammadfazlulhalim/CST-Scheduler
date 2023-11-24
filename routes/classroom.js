const express = require('express');
const router = express.Router();
const Classroom = require('../private/javascript/Classroom');
router.get('/', async (req, res, next) => {
  let classroomList = [];
  // Gathering classrooms from database
  try {
    classroomList = await Classroom.findAll({
      order: ['roomNumber'],
    });
  } catch (error) { // If there are no classrooms, the list will be empty.
    console.error('Error:', error);
  }
  res.render('classroom', {classroomList, title: 'Classrooms'});
});

router.post('/', async (req, res, next) => {
  const courseTempObj = {
    roomNumber: req.body.roomNumber ? req.body.roomNumber : '',
    location: req.body.location ? req.body.location : '',
  };

  const response = await createClassroom(courseTempObj);
  if (response.success === 'Success') {
    res.statusCode = 201;
  } else {
    res.statusCode = 422;
  }

  res.render('classroom');

});

router.put('/', async (req, res, next) => {
  const courseTempObj = {
    id: req.body.id ? req.body.id : '',
    roomNumber: req.body.roomNumber ? req.body.roomNumber : '',
    location: req.body.location ? req.body.location : '',
  };
  const response = await updateClassroom(courseTempObj);
  if (response.success === 'Success') {
    res.statusCode = 200;
  } else if (response.invalidKey) {
    res.statusCode = 404;
  } else {
    res.statusCode = 422;
  }

  res.render('classroom');
});

router.delete('/', async (req, res, next) => {
  const courseTempObj = {
    id: req.body.id ? req.body.id : '',
    roomNumber: req.body.roomNumber ? req.body.roomNumber : '',
    location: req.body.location ? req.body.location : '',
  };
  const response = await deleteClassroom(courseTempObj);
  if (response.success === 'Success') {
    res.statusCode = 200;
  } else {
    res.statusCode = 404;
  }

  res.render('classroom');
});

async function createClassroom(classroomObj) {
  const createResponse = {};
  try {
    const response = await Classroom.create({roomNumber: classroomObj.roomNumber, location: classroomObj.location});
    createResponse.success = 'Success';
    createResponse.pk = response.id ? response.id : 'Response does not have ID';

  } catch (err) {
    //console.log('Error is: ' + JSON.stringify(err));
    // Need to output these so that each attribute gets pproper error message
    err.errors.forEach((element) => {

      const objectProp = element.path;
      createResponse[objectProp] = element.message;
    });
  }

  return createResponse;
}

async function updateClassroom(classroomObj) {
  const updateResponse = {};
  const currentEntry = await Classroom.findByPk(classroomObj.id);

  //checking we have a valid primary key
  if (await Classroom.findByPk(classroomObj.id) != null) {
    try {
      const response = await currentEntry.update({roomNumber: classroomObj.roomNumber, location: classroomObj.location});
      updateResponse.success = 'Success';
      updateResponse.pk = response.id ? response.id : 'Response does not have ID';
    } catch (err) {
      err.errors.forEach((element) => {
        const objectProp = element.path;
        updateResponse[objectProp] = element.message;
      });
    }
  } else {
    updateResponse.invalidKey = 'Invalid Primary Key';
  }

  return updateResponse;
}

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
