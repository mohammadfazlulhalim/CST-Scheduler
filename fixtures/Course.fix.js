/* eslint-disable linebreak-style */

const Course = require('../private/javascript/Course');

/**
 * clears the course table if it exists and fills it 5 courses
 */
async function fillCourseTable() {
  await Course.sync({force: true});

  await createCourses();
}

/**
 * Create some courses in table
 */
async function createCourses() {
  const courses = [
    {
      courseCode: 'MATH282',
      courseName: 'Mathematics of Computation',
      courseNumCredits: 3,
      courseNumHours: 45,
    },
    {
      courseCode: 'COSA280',
      courseName: 'IT Development Project 1',
      courseNumCredits: 3,
      courseNumHours: 20,
    },
    {
      courseCode: 'CDBM280',
      courseName: 'Database Management Systems',
      courseNumCredits: 5,
      courseNumHours: 75,
    },
    {
      courseCode: 'COHS280',
      courseName: 'Enterprise Systems Support',
      courseNumCredits: 3,
      courseNumHours: 45,
    },
    {
      courseCode: 'CWEB280',
      courseName: 'Internet Programming/Web Applications 2',
      courseNumCredits: 6,
      courseNumHours: 80,
    },
  ];

  for (let index = 0; index < courses.length; index++) {
    const course = courses[index];
    await Course.create(course);
  }
}

module.exports = fillCourseTable;
