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

router.post('/', async(req, res, next) =>{

})

router.put('/', async(req, res, next) =>{

})

router.delete('/', async(req, res, next) =>{

})

async function createClassroom()
{

}

async function updateClassroom()
{

}

async function deleteClassroom()
{

}

module.exports = {router, createClassroom, updateClassroom, deleteClassroom} ;
