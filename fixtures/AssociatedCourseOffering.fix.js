const Associations = require('../private/javascript/Associations');
const Course = require('../private/javascript/Course');
const {testConst} = require('../constants');
const Term = require('../private/javascript/Term');
const Instructor = require('../private/javascript/Instructor');
const Program = require('../private/javascript/Program');
const instructor1 = require('./Instructor.fix').instructor1;
const instructorDonovan1 = require('./Instructor.fix').instructorDonovan1;
const instructorBryce1 = require('./Instructor.fix').instructorBryce1;
const courseOffering1 = require('./CourseOffering.fix').courseOffering1;
const courseOffering2 = require('./CourseOffering.fix').courseOffering2;
const term1 = require('./Term.fix').term1;
const course1 = require('./Course.fix').course1;
const program1 = require('./Program.fix').program1;


// eslint-disable-next-line require-jsdoc
async function loadRelationships() {
  Associations.addAssociations();
  const courseOfferingObj = {offering1: {}, offering2: {}};

  // Checking the DB to see if the entry already exists
  let courseObj = await Course.findOne({where: {courseCode: course1.courseCode}});
  // If it does not exist, create it
  if (!courseObj) {
    courseObj = await Course.create(course1);
  }
  const termObj = await Term.create(term1);
  // const termObj = await Term.findByPk(testConst.term1.id);
  let insObj = await Instructor.findOne({where: {lastName: instructor1.lastName}});
  if (!insObj) {
    insObj = await Instructor.create(instructor1);
  }
  // TODO remove the extra instructor afterwards
  let insObj2 = await Instructor.findOne({where: {lastName: instructorDonovan1.lastName}});
  if (!insObj2) {
    insObj2 = await Instructor.create(instructorDonovan1);
  }
  let insObj3 = await Instructor.findOne({where: {lastName: instructorBryce1.lastName}});
  if (!insObj3) {
    insObj3 = await Instructor.create(instructorBryce1);
  }

  let progObj = await Program.findOne({where: {programAbbreviation: program1.programAbbreviation}});
  if (!progObj) {
    progObj = await Program.create(program1);
  }

  courseOfferingObj.offering1 = {
    name: courseOffering1.name,
    startDate: courseOffering1.startDate,
    endDate: courseOffering1.endDate,
    group: courseOffering1.group,
    courseID: courseObj,
    termID: termObj.id,
    instructorID: insObj,
    programID: progObj,
  };
  courseOfferingObj.offering2 = {
    name: courseOffering2.name,
    startDate: courseOffering2.startDate,
    endDate: courseOffering2.endDate,
    group: courseOffering2.group,
    courseID: courseObj,
    termID: termObj,
    instructorID: insObj,
    programID: progObj,
  };

  return courseOfferingObj;
}

module.exports = loadRelationships;
