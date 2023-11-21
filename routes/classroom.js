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
    res.statusCode = 400;
  }

  res.render('classroom');

})

router.put('/', async(req, res, next) =>{
  res.statusCode = 404;
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
    // console.log('Printing errors for ' + classroomObj.roomNumber)
    // console.log('err.errors: ' + JSON.stringify(err.errors));
    err.errors.forEach((element) => {

      const objectProp = element.path;
      createResponse[objectProp] = element.message;
    })
  }
  console.log('Create response for: ' + classroomObj.roomNumber);
  console.log('Response: ' + JSON.stringify(createResponse));
  return createResponse;
}

async function updateClassroom(classroomObj)
{
  return {};
}

async function deleteClassroom(classroomObj)
{
  return {};
}

module.exports = {router, createClassroom, updateClassroom, deleteClassroom} ;
