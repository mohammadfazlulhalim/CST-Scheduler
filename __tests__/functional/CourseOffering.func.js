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
    let testNewCO
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
