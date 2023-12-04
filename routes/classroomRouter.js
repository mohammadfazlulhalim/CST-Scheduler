const express = require('express');
const router = express.Router();
const ClassroomRouter = require('../private/javascript/Classroom');
router.get('/', async (req, res, next) => {
  let classroomList = [];
  // Gathering classrooms from database
  try {
    classroomList = await ClassroomRouter.findAll({
      order: ['roomNumber'],
    });
  } catch (error) { // If there are no classrooms, the list will be empty.
    console.error('Error:', error);
  }
  res.render('classroom', {classroomList, title: 'Classrooms'});
});
module.exports = router;
