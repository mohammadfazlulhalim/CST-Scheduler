const Associations = require('../private/javascript/Associations');
const Course = require('../private/javascript/Course');
const {testConst} = require('../constants');
const Term = require('../private/javascript/Term');
const Instructor = require('../private/javascript/Instructor');
const Program = require('../private/javascript/Program');


// eslint-disable-next-line require-jsdoc
async function loadRelationships() {
    Associations.addAssociations();
    const courseOfferingObj = {offering1: {}, offering2: {}};

    // Checking the DB to see if the entry already exists
    let courseOBJ = await Course.findOne({where: {courseCode: testConst.course1.courseCode}});
    // If it does not exist, create it
    if (!courseOBJ) {
        courseObj = await Course.create(testConst.course1);
    }

    const termObj = await Term.create(testConst.term1);
    const insObj = await Instructor.create(testConst.instructor1);
    const progObj = await Program.create(testConst.program1);

    courseOfferingObj.offering1 = {
        name: testConst.courseOffering1.name,
        startDate: testConst.courseOffering1.startDate,
        endDate: testConst.courseOffering1.endDate,
        group: testConst.courseOffering1.group,
        courseID: courseObj,
        termID: termObj.id,
        instructorID: insObj,
        programID: progObj,
    };
    courseOfferingObj.offering2 = {
        name: testConst.courseOffering2.name,
        startDate: testConst.courseOffering2.startDate,
        endDate: testConst.courseOffering2.endDate,
        group: testConst.courseOffering2.group,
        courseID: courseObj,
        termID: termObj,
        instructorID: insObj,
        programID: progObj,
    };

    return courseOfferingObj;
}

module.exports = loadRelationships;
