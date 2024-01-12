const CourseOffering = require('../private/javascript/CourseOffering');
const Associations = require('../private/javascript/Associations');
const Course = require('../private/javascript/Course');
const {testConst} = require('../constants');
const Term = require('../private/javascript/Term');
const Instructor = require('../private/javascript/Instructor');
const Program = require('../private/javascript/Program');


// eslint-disable-next-line require-jsdoc
async function loadRelationships() {
  const courseOfferingObj = {offering1: {}, offering2: {}};

  await Program.sync({force: true});
  await Instructor.sync({force: true});
  await Term.sync({force: true});
  await Course.sync({force: true});

  await CourseOffering.sync({force: true});

  Associations.addAssociations();

  const courseObj = await Course.create(testConst.course1);
  const termObj = await Term.create(testConst.term1);
  const insObj = await Instructor.create(testConst.instructor1);
  const progObj = await Program.create(testConst.program1);
  const tempObj1 = {
    name: 'Hardware',
    startDate: '2023-09-01',
    endDate: '2023-12-15',
    group: 'B',
    courseID: courseObj,
    termID: termObj,
    instructorID: insObj,
    programID: progObj,
  };
  const tempObj2 = {
    name: 'Seminar',
    startDate: '2023-09-01',
    endDate: '2023-12-15',
    group: 'B',
    courseID: courseObj,
    termID: termObj,
    instructorID: insObj,
    programID: progObj,
  };

  // courseOfferingObj.offering1 = await CourseOffering.create(tempObj1);
  courseOfferingObj.offering1 = tempObj1;
  courseOfferingObj.offering2 = tempObj2;
  // courseOfferingObj.offering2 = await CourseOffering.create(tempObj2);



  return courseOfferingObj;
}

module.exports = loadRelationships;
