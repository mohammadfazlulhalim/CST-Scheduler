const express = require('express');
const router = express.Router();
const Classroom = require('../private/javascript/Classroom');
router.get('/', async (req, res, next) => {
  // Need to create the temp object to pass to createClassroom method
  const courseTempObj = {
    roomNumber: req.body.roomNumber?req.body.roomNumber:'',
    location: req.body.location?req.body.location:'',
  };

  const response = createClassroom(courseTempObj)

});

router.post('/', async(req, res, next) =>{

})

router.put('/', async(req, res, next) =>{

})

router.delete('/', async(req, res, next) =>{

})

async function createClassroom(classroomObj)
{
  const createResponse = {};

  try {
    const response = await Classroom.create({roomNumber: classroomObj.roomNumber});
    createResponse.Success = 'Success'
    createResponse.pk = response.id;
  } catch(err) {
    // Need to output these so that each attribute gets pproper error message
    // Figure out the output of error messages
    err.errors.forEach((element) => {
      createResponse.element.path = element.msg;
    })
  }
  console.log(createResponse);
  return createResponse;
}

async function updateClassroom()
{
  return {};
}

async function deleteClassroom()
{
  return {};
}

module.exports = {router, createClassroom, updateClassroom, deleteClassroom} ;
