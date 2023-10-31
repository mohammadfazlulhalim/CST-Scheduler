const express = require('express');
const router = express.Router();
const Instructor = require('../private/javascript/Instructor');

//get handler for http://localhost:3000/instructor
router.get('/', async function(req, res, next) {

  //arraylist of JSON objects
  let instructorList;

  try {
    instructorList = await Instructor.findAll({}); //retrieve from database
  } catch (err) {
    instructorList = undefined; //if there are no course offerings
  }

  //render hbs to electron
  res.render('instructor', {
    title: 'View Instructor',
    instructorList: instructorList,
  });
});

module.exports = router;
