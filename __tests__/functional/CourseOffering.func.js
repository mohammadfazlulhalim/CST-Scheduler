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
const Associations = require("../../private/javascript/Associations");
const SuperTest = require('supertest');


describe('Functional Course Offering', () => {
    let testCourse;
    let testTerm;
    let testInstructor;
    let testProgram;
    let testCourseOffering;
    let testNewCO
    beforeAll(async function() {
        await Course.sync({force: true});
        await Term.sync({force: true});
        await Instructor.sync({force: true});
        await Program.sync({force: true});
        await CourseOffering.sync({force: true});

        Associations.addAssociations();
    })
    // set up a valid user
    beforeEach(async function() {
        // drop the table and re-create it
        testCourse = testConst.course1;
        testTerm = testConst.term1;
        testInstructor = testConst.instructor1;
        testProgram = testConst.program1;
        testCourseOffering = testConst.courseOffering1;
    });

    //test that course offering is successfully added
    test('testThatCourseOfferingIsCreated', async function() {
        await testPost(testCourseOffering);
    });

    test('testThatEmptyObjectIsNotCreated', async function(){

    });



});

/**
 * tests post function with a given Course Offering
 * @param testCO
 */
const testPost = async function(testCO) {
    //posts offering to router, expects return code
    const res = await SuperTest(app)
        .post('/courseOffering')
        .send(testCO).expect(201);

    //expects to find the same offering in database
    const foundCO = await CourseOffering.findOne({where: {id: parseInt(res.get('id'))}});
    expect(foundCO).toBeTruthy();
};

/**
 * Tests that testCO is successfully deleted
 * @param testCO
 */
const testDelete = async function(testCO) {

    //get testCO is already in the database
    const toDelete = await CourseOffering.findOne({where: {id: testCO.id}});
    expect(toDelete).toBeTruthy();

    // Get number of Course offerings
    const oldNumCO = (await CourseOffering.findAll()).length;

    // delete the term
    await SuperTest(app).delete('/courseOffering').send(testCO).expect(200); // expect 200: OK

    // If the term was deleted successfully, the number of terms in the database should
    // be one less than the count after the 'create' statement
    const newNumCO = (await Term.findAll()).length;
    expect(newNumCO).toBe(oldNumCO - 1);
};
