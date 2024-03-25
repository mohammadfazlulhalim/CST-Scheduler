const CourseOffering = require('../private/javascript/CourseOffering');
const Instructor = require('../private/javascript/Instructor');
const course = require('../private/javascript/Course');
const constants = require('../constants');
const courseOffering = require('../private/javascript/CourseOffering');
const Term = require('../private/javascript/Term');
const Course = require('../private/javascript/Course');
const Program = require('../private/javascript/Program');
const validCourses = require('../fixtures/Course.fix').validCourses;

/**
 * This function clears the courseOffering table if it exists and fills it with 15 course offerings.
 */
async function fillCourseOfferingTable() {
  await CourseOffering.create(courseOffering1);
  const COA = await CourseOffering.bulkCreate(validCourseOfferingsB);
  const COB = await CourseOffering.bulkCreate(validCourseOfferingsA);
  const COSPLIT = await CourseOffering.bulkCreate(validSplitCourseOfferings);

  for (let i=0; i<COA.length; i++) {
    COA[i].setCourse(await course.findByPk((i%validCourses.length)+1));
    COB[i].setCourse(await course.findByPk((i%validCourses.length)+1));
  }

  let COHA = courseOffering1;
  let COSA = courseOffering2;
  for (let i=0; i<COSPLIT.length; i++) {
    COSPLIT[i].setTerm(2);
    COSPLIT[i].setProgram(2);
  }


  COSPLIT[0].setInstructor(11);
  COSPLIT[1].setInstructor(1);
  COSPLIT[2].setInstructor(7);
  COSPLIT[3].setInstructor(6);
  COSPLIT[0].setCourse(15);
  COSPLIT[1].setCourse(11);
  COSPLIT[2].setCourse(4);
  COSPLIT[3].setCourse(14);


  /* CourseOffering.belongsTo(Term);
  CourseOffering.belongsTo(Course);
  CourseOffering.belongsTo(Instructor);
  CourseOffering.belongsTo(Program); */
  COSA.group = 'A';
  COHA = await CourseOffering.create(COHA);
  COSA = await CourseOffering.create(COSA);
  COHA.setTerm(3);
  COSA.setTerm(3);
  COHA.setProgram(1);
  COSA.setProgram(1);
  COHA.setInstructor(11);
  COSA.setInstructor(3);
  COHA.setCourse(15);
  COSA.setCourse(4);

  let COHB = courseOffering1;
  let COSB = courseOffering2;
  COHB.group = 'B';
  COSB.group = 'B';
  COHB = await CourseOffering.create(COHB);
  COSB = await CourseOffering.create(COSB);
  COHB.setTerm(3);
  COSB.setTerm(3);
  COHB.setProgram(1);
  COSB.setProgram(1);
  COHB.setInstructor(11);
  COSB.setInstructor(3);
  COHB.setCourse(15);
  COSB.setCourse(4);

  let COHC = courseOffering1;
  let COSC = courseOffering2;
  COHC.group = 'C';
  COSC.group = 'C';
  COHC = await CourseOffering.create(COHC);
  COSC = await CourseOffering.create(COSC);
  COHC.setTerm(3);
  COSC.setTerm(3);
  COHC.setProgram(1);
  COSC.setProgram(1);
  COHC.setInstructor(11);
  COSC.setInstructor(3);
  COHC.setCourse(15);
  COSC.setCourse(4);

  let COHD = courseOffering1;
  let COSD = courseOffering2;
  COHD.group = 'D';
  COSD.group = 'D';
  COHD = await CourseOffering.create(COHD);
  COSD = await CourseOffering.create(COSD);
  COHD.setTerm(3);
  COSD.setTerm(3);
  COHD.setProgram(1);
  COSD.setProgram(1);
  COHD.setInstructor(11);
  COSD.setInstructor(3);
  COHD.setCourse(15);
  COSD.setCourse(4);

  courseOffering1.group = 'A';
  courseOffering2.group = 'B';
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

const validSplitCourseOfferings =[
  {name: 'Hardware', startDate: '2023-01-02', endDate: '2023-04-28', group: 'A', CourseId: 1},
  {name: 'Advanced Programming', startDate: '2023-03-01', endDate: '2023-04-28', group: 'A', CourseId: 1},
  {name: 'Seminar', startDate: '2023-01-02', endDate: '2023-02-02', group: 'A', CourseId: 1},
  {name: 'Technical Communications', startDate: '2023-04-15', endDate: '2023-05-14', group: 'A', CourseId: 1},
]


;

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


// eslint-disable-next-line max-len
module.exports = {courseOffering1, courseOffering2, validCourseOfferingsA, validCourseOfferingsB, fillCourseOfferingTable};
