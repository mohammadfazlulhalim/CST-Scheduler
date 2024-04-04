/* eslint-disable linebreak-style */

const Course = require('../private/javascript/Course');
const Instructor = require('../private/javascript/Instructor');
const {validInstructor} = require('./Instructor.fix');
const {create} = require('hbs');
const instructorList = require('./Instructor.fix').validInstructor;
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
    {
      courseCode: 'COOS291',
      courseName: 'Advanced Operating Systems',
      courseNumCredits: 5,
      courseNumHoursPerWeek: 5,
    },
    {
      courseCode: 'COOS293',
      courseName: 'Systems Administration 2',
      courseNumCredits: 4,
      courseNumHoursPerWeek: 4,
    },
    {
      courseCode: 'COOS294',
      courseName: 'Cloud Infrastructure Administration',
      courseNumCredits: 4,
      courseNumHoursPerWeek: 4,
    },
    {
      courseCode: 'COSA290',
      courseName: 'IT Development Project 2',
      courseNumCredits: 6,
      courseNumHoursPerWeek: 6,
    },
    {
      courseCode: 'COSC292',
      courseName: 'Advanced Programming 2',
      courseNumCredits: 4,
      courseNumHoursPerWeek: 4,
    },
    {
      courseCode: 'COSC295',
      courseName: 'Advanced Mobile Application Programming',
      courseNumCredits: 4,
      courseNumHoursPerWeek: 4,
    },
    {
      courseCode: 'CPMG290 ',
      courseName: 'IT Development Project Management 2',
      courseNumCredits: 2,
      courseNumHoursPerWeek: 2,
    },
    {
      courseCode: 'TCOM291',
      courseName: 'Career Path Search',
      courseNumCredits: 1,
      courseNumHoursPerWeek: 1,
    },
    {
      courseCode: 'COHS190',
      courseName: 'Hardware',
      courseNumCredits: 1,
      courseNumHoursPerWeek: 1,
    },

  ];

  // loop through courses and create course object entries
  // as rows in the Course table in scheduler.db
  for (let index = 0; index < courses.length; index++) {
    const course = courses[index];
    const instructor = await Instructor.findByPk((index%validInstructor.length)+1);

    // Create course
    const createdCourse = await Course.create(course);

    // Check if instructor ID is not null before setting it
    if (instructor && instructor.id) {
      await createdCourse.setInstructor(instructor.id);
    } else {
      console.log('Instructor ID is null for course:', createdCourse.name);
      // Handle the case where instructor ID is null
    }
  }
}

// eslint-disable-next-line max-len
const validCourses = [{courseCode: 'MATH282', courseName: 'Mathematics of Computation', courseNumCredits: 3, courseNumHoursPerWeek: 3},
  {courseCode: 'COSA280', courseName: 'IT Development Project 1', courseNumCredits: 3, courseNumHoursPerWeek: 3},
  {courseCode: 'CDBM280', courseName: 'Database Management Systems', courseNumCredits: 5, courseNumHoursPerWeek: 5},
  {courseCode: 'SEM283', courseName: 'Seminar', courseNumCredits: 1, courseNumHoursPerWeek: 1},
  {courseCode: 'COHS280', courseName: 'Enterprise Systems Support', courseNumCredits: 3, courseNumHoursPerWeek: 3},
  {courseCode: 'CWEB280', courseName: 'Internet Programming/Web Applications 2', courseNumCredits: 6, courseNumHoursPerWeek: 5},
  {courseCode: 'COOS291', courseName: 'Advanced Operating Systems', courseNumCredits: 5, courseNumHoursPerWeek: 5},
  {courseCode: 'COOS293', courseName: 'Systems Administration 2', courseNumCredits: 4, courseNumHoursPerWeek: 4},
  {courseCode: 'COOS294', courseName: 'Cloud Infrastructure Administration', courseNumCredits: 4, courseNumHoursPerWeek: 4},
  {courseCode: 'COSA290', courseName: 'IT Development Project 2', courseNumCredits: 6, courseNumHoursPerWeek: 6},
  {courseCode: 'COSC292', courseName: 'Advanced Programming 2', courseNumCredits: 4, courseNumHoursPerWeek: 4},
  {courseCode: 'COSC295', courseName: 'Advanced Mobile Application Programming', courseNumCredits: 4, courseNumHoursPerWeek: 4},
  {courseCode: 'CPMG290', courseName: 'IT Development Project Management 2', courseNumCredits: 2, courseNumHoursPerWeek: 2},
  {courseCode: 'TCOM291', courseName: 'Career Path Search', courseNumCredits: 1, courseNumHoursPerWeek: 1},
];

const course1 = {
  courseCode: 'CSEC280',
  courseName: 'Security 1',
  courseNumCredits: 4,
  courseNumHoursPerWeek: 4,
};

module.exports = {course1, validCourses, fillCourseTable};
// module.exports = {course1, fillCourseTable};
