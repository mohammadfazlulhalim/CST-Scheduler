const express = require('express');
const router = express.Router();
const Classroom = require('../private/javascript/Classroom');

let classroomList = [];

// http://localhost:3000/
router.get('/', (req, res, next) =>{
  classroomList=Classroom.findAll();
  res.render('classroom', {
    classroomList,
  });
});


