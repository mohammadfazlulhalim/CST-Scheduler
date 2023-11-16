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
    let testCourseOffer;
    // set up a valid user
    beforeEach(async function() {
        // drop the table and re-create it
        await CourseOffering.sync({force: true});
        testCourseOffer = testConst.courseOffering1;
    });

    test('testThatCourseOfferingIsCreated', async function() {

        const res = await request(app).post('/CourseOffering').send(
            testCourseOffer
        )
        testUser.group = groupLetter;
        const courseOffering = await CourseOffering.create(testUser);

        expect(courseOffering).toBeTruthy();
        expect(courseOffering.group).toBe(groupLetter);

        // if valid, validate() returns the object it was validating
        // if invalid, it returns errors
        expect(await courseOffering.validate()).toBe(courseOffering);
    });

});
