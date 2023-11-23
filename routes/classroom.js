const express = require('express');
const router = express.Router();
const Classroom = require('../private/javascript/Classroom');
router.get('/', async (req, res, next) => {
  // Need to create the temp object to pass to createClassroom method


});

router.post('/', async(req, res, next) =>{
  const courseTempObj = {
    roomNumber: req.body.roomNumber?req.body.roomNumber:'',
    location: req.body.location?req.body.location:'',
  };

  const response = await createClassroom(courseTempObj)
  if (response.success==='Success') {
    res.statusCode = 201;
  } else {
    res.statusCode = 422;
  }

  res.render('classroom');

})

router.put('/', async(req, res, next) =>{
  // console.log('req.body is: ' + JSON.stringify(req.body));
  const courseTempObj = {
    id: req.body.dataValues.id?req.body.dataValues.id:'',
    roomNumber: req.body.dataValues.roomNumber?req.body.dataValues.roomNumber:'',
    location: req.body.dataValues.location?req.body.dataValues.location:'',
  };
  // console.log('courseTempObj is: ' + JSON.stringify(courseTempObj));
  const response = await updateClassroom(courseTempObj)
  if (response.success==='Success') {
    res.statusCode = 200;
  } else {
    res.statusCode = 422;
  }

  res.render('classroom');
})

router.delete('/', async(req, res, next) =>{
  res.statusCode = 404;
  res.render('classroom');
})

async function createClassroom(classroomObj)
{
  const createResponse = {};

  try {
    const response = await Classroom.create({roomNumber: classroomObj.roomNumber});
    createResponse.success = 'Success'
    createResponse.pk = response.id?response.id:'Response does not have ID';
  } catch(err) {
    // Need to output these so that each attribute gets pproper error message
    // Figure out the output of error messages
    err.errors.forEach((element) => {

      const objectProp = element.path;
      createResponse[objectProp] = element.message;
    })
  }
  return createResponse;
}

async function updateClassroom(classroomObj)
{
  const updateResponse = {};
  const currentEntry = await Classroom.findByPk(classroomObj.id);

  // console.log('Update on: ' + classroomObj.roomNumber);
  // console.log('Object is: ' + JSON.stringify(classroomObj));
  // console.log('Current entry is: ' + JSON.stringify(currentEntry));

  try {
    const response = await currentEntry.update({roomNumber: classroomObj.roomNumber});
    updateResponse.success = 'Success';
    updateResponse.pk = response.id?response.id:'Response does not have ID';
  } catch(err) {
    // Console.log('Caught errors for ' + JSON.stringify(classroomObj));
    // Console.log('Errors are ' + JSON.stringify(err.errors));
    err.errors.forEach((element) => {
      const objectProp = element.path;
      updateResponse[objectProp] = element.message;
    })
  }

  return updateResponse;
}

async function deleteClassroom(classroomObj)
{
  const deleteResponse = {};

  try {

  } catch(err) {

  }

  return deleteResponse;
}

module.exports = {router, createClassroom, updateClassroom, deleteClassroom} ;
