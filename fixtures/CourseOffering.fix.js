const CourseOffering = require('../private/javascript/CourseOffering');
const Instructor = require('../private/javascript/Instructor');
const course = require('../private/javascript/Course');
const constants = require('../constants');
const courseOffering = require('../private/javascript/CourseOffering');
const testConst = require('../constants').testConst;
const validCourses = require('../fixtures/Course.fix').validCourses;

/**
 * This function clears the courseOffering table if it exists and fills it with 15 course offerings.
 */
async function fillCourseOfferingTable() {
  await CourseOffering.create(courseOffering1);
  const COA = await CourseOffering.bulkCreate(validCourseOfferingsB);
  const COB = await CourseOffering.bulkCreate(validCourseOfferingsA);

  for (let i=0; i<COA.length; i++) {
    COA[i].setCourse(await course.findByPk((i%validCourses.length)+1));
    COB[i].setCourse(await course.findByPk((i%validCourses.length)+1));
  }
}

const validCourseOfferingsB = [
  {name: 'Advanced Operating Systems', startDate: '2023-01-01', endDate: '2023-04-01', group: 'B', CourseId: 1},
  {name: 'Systems Administration 2', startDate: '2023-01-01', endDate: '2023-04-01', group: 'B', CourseId: 1},
  {name: 'Cloud Infrastructure Administration', startDate: '2023-01-01', endDate: '2023-04-01', group: 'B', CourseId: 1},
  {name: 'IT Development Project 2', startDate: '2023-01-01', endDate: '2023-04-01', group: 'B', CourseId: 1},
  {name: 'Advanced Programming 2', startDate: '2023-01-01', endDate: '2023-04-01', group: 'B', CourseId: 1},
  {name: 'Advanced Mobile Application Programming', startDate: '2023-01-01', endDate: '2023-04-01', group: 'B', CourseId: 1},
  {name: 'IT Development Project Management 2', startDate: '2023-01-01', endDate: '2023-04-01', group: 'B', CourseId: 1},
  {name: 'Career Path Search', startDate: '2023-01-01', endDate: '2023-04-01', group: 'B', CourseId: 1},
];
const validCourseOfferingsA = [
  {name: 'Advanced Operating Systems', startDate: '2023-09-01', endDate: '2023-12-15', group: 'A', CourseId: 1},
  {name: 'Systems Administration 2', startDate: '2023-09-01', endDate: '2023-12-15', group: 'A', CourseId: 1},
  {name: 'Cloud Infrastructure Administration', startDate: '2023-09-01', endDate: '2023-12-15', group: 'A', CourseId: 1},
  {name: 'IT Development Project 2', startDate: '2023-09-01', endDate: '2023-12-15', group: 'A', CourseId: 1},
  {name: 'Advanced Programming 2', startDate: '2023-09-01', endDate: '2023-12-15', group: 'A', CourseId: 1},
  {name: 'Advanced Mobile Application Programming', startDate: '2023-09-01', endDate: '2023-12-15', group: 'A', CourseId: 1},
  {name: 'IT Development Project Management 2', startDate: '2023-09-01', endDate: '2023-12-15', group: 'A', CourseId: 1},
  {name: 'Career Path Search', startDate: '2023-09-01', endDate: '2023-12-15', group: 'A', CourseId: 1},
];

const courseOffering1 = {
  name: 'Hardware',
    startDate: '2023-09-01',
    endDate: '2023-12-15',
    group: 'A',
    CourseId: 1,
    termID: 1,
    instructorID: 1,
    programID: 1,
};
const courseOffering2 = {
  name: 'Seminar',
    startDate: '2023-09-01',
    endDate: '2023-12-15',
    group: 'B',
    CourseId: 1,
    termID: 1,
    instructorID: 1,
    programID: 1,
};


module.exports = {courseOffering1, courseOffering2, validCourseOfferingsA, validCourseOfferingsB, fillCourseOfferingTable};
