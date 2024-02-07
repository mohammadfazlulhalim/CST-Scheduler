const Course = require('../private/javascript/Course');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res,next)=>{
  //Declaring the array
  const courseLists= await readAllCourses();

  res.render ('course',{
    title: 'Course Listings',
    courseList: courseLists,
  });

});











const readAllCourses = async ()=>{
  try {
    //calling the database, for all course entries, ordered by course number
    return await Course.findAll({order:['courseCode']});
  }catch(err){
    // If course not found in database it will return undefined so that courseList will be empty
    return undefined;
  }
}

module.exports = router;
