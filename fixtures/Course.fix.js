/* eslint-disable linebreak-style */

const Course = require('../private/javascript/Course');

/**
 * clears the course table if it exists and fills it 5 courses
 */
async function fillCourseTable() {
  await createCourses();
}

/**
 * Create some courses in table
 */
async function createCourses() {
  // hardcoded list of course object literals
  // property info based on info found on https://saskpolytech.ca/programs-and-courses/programs/Computer-Systems-Technology.aspx#courses
  const courses = [
    {
      courseCode: 'MATH282',
      courseName: 'Mathematics of Computation',
      courseNumCredits: 3,
      courseNumHoursPerWeek: 3,
    },
    {
      courseCode: 'COSA280',
      courseName: 'IT Development Project 1',
      courseNumCredits: 3,
      courseNumHoursPerWeek: 3,
    },
    {
      courseCode: 'CDBM280',
      courseName: 'Database Management Systems',
      courseNumCredits: 5,
      courseNumHoursPerWeek: 5,
    },
    {
      courseCode: 'SEM283',
      courseName: 'Seminar',
      courseNumCredits: 1,
      courseNumHoursPerWeek: 1,
    },
    {
      courseCode: 'COHS280',
      courseName: 'Enterprise Systems Support',
      courseNumCredits: 3,
      courseNumHoursPerWeek: 3,
    },
    {
      courseCode: 'CWEB280',
      courseName: 'Internet Programming/Web Applications 2',
      courseNumCredits: 6,
      courseNumHoursPerWeek: 5,
    },
  ];

  // loop through courses and create course object entries
  // as rows in the Course table in scheduler.db
  for (let index = 0; index < courses.length; index++) {
    const course = courses[index];
    await Course.create(course);
  }
}

module.exports = fillCourseTable;
