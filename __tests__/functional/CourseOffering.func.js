const Course = require('../../private/javascript/Course');
const Term = require('../../private/javascript/Term');
const Instructor = require('../../private/javascript/Instructor');
const Program = require('../../private/javascript/Program');
const CourseOffering = require('../../private/javascript/CourseOffering');
const testConst = require('../../constants').testConst;
const {
    createCourseOffering,
    updateCourseOffering,
    deleteCourseOffering
}  = require('../../routes/courseOfferingRouter');
const request = require('supertest');
const app = require('../../app');


describe('Functional Course Offering', () => {
    let testCourse;
    let testTerm;
    let testInstructor;
    let testProgram;
    let testCourseOffer;
    let testNewCO
    // set up a valid user
    beforeEach(async function() {
        // drop the table and re-create it
        await Course.sync({force: true});
        await Term.sync({force: true});
        await Instructor.sync({force: true});
        await Program.sync({force: true});
        await CourseOffering.sync({force: true});
        testCourse= testConst.course1;
        testTerm= testConst.;
        testInstructor= testConst.courseOffering1;
        testProgram= testConst.courseOffering1;
        testCourseOffer = testConst.courseOffering1;
    });

    test('testThatCourseOfferingIsCreated', async function() {
        const res = await request(app).post('/CourseOffering').send(
            testCourseOffer
        )
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');

        let tempID = res.body.id;
        testNewCO = CourseOffering.findOne(tempID);

        expect(testNewCO.startDate).toBe(testCourseOffer.startDate);
        expect(testNewCO.endDate).toBe(testCourseOffer.endDate);
        expect(testNewCO.group).toBe(testCourseOffer.group);
        expect(testNewCO.name).toBe(testCourseOffer.name);
        expect(testNewCO.startDate).toBe(testCourseOffer.startDate);
        expect(testNewCO.startDate).toBe(testCourseOffer.startDate);
        expect(testNewCO.startDate).toBe(testCourseOffer.startDate);
        expect(testNewCO.startDate).toBe(testCourseOffer.startDate);

    });

});
