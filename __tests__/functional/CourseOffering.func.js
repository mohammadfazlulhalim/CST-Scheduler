const Course = require('../../private/javascript/Course');
const Term = require('../../private/javascript/Term');
const Instructor = require('../../private/javascript/Instructor');
const Program = require('../../private/javascript/Program');
const CourseOffering = require('../../private/javascript/CourseOffering');
const testConst = require('../../constants').testConst;
const app = require('../../app');
const Associations = require("../../private/javascript/Associations");
const SuperTest = require('supertest');
const expect = require("expect");


describe('Functional Course Offering', () => {
    let testCourse;
    let testTerm;
    let testInstructor;
    let testProgram;
    let testCourseOffering1;
    let testCourseOffering2;
    beforeAll(async function() {
        await Course.sync({force: true});
        await Term.sync({force: true});
        await Instructor.sync({force: true});
        await Program.sync({force: true});
        await CourseOffering.sync({force: true});

        Associations.addAssociations();

        //set up a valid user with foreign keys
        testCourse = testConst.course1;
        testTerm = testConst.term1;
        testInstructor = testConst.instructor1;
        testProgram = testConst.program1;
    })

    //refresh before each test
    beforeEach(async function() {
        testCourseOffering1 = testConst.courseOffering1;
        testCourseOffering2 = testConst.courseOffering2;
    })

    //destroy course offering table after each test
    afterEach(async function() {
        await CourseOffering.destroy();
    })

    //test that course Offering is successfully added to empty darabase
    test('testThatCourseOfferingIsCreatedInEmptyDatabase', async function(){
        await testPost(testCourseOffering1);
    });

    //test that course offering is successfully added into a pre-existing database
    test('testThatCourseOfferingIsCreated', async function() {
        await testPost(testCourseOffering1);
        await testPost(testCourseOffering2);
    });

    //tests that an empty course offering cannot be posted to database
    test('testThatInvalidCourseOfferingIsNotCreated',async function() {
        //variable to catch errors
        let err;
        let foundCO;

        //posts offering to router, expects return code
        const res = await SuperTest(app)
            .post('/courseOffering')
            .send({}).expect(422);

        //expects to Get error from the database
        try {
            foundCO = await CourseOffering.findOne({where: {id: parseInt(res.get('id'))}});
        }
        catch(error) {
            err = error;
        }
        expect(err).toBeTruthy();
        expect(foundCO).toBeFalsy();
    });

    //test that course Offering is successfully updated in the database
    test('testThatCourseOfferingIsUpdated ', async function(){
        //first add to database
        await testPost(testCourseOffering1);

        //now change info in object
        testCourseOffering1.group = 'A';

        //update
        await testPut(testCourseOffering1);
    });

    //test that invalid course Offering is not updated in the database
    test('testThatInvalidCourseOfferingIsNotUpdated ', async function(){
        //variable to catch errors
        let err;
        let foundCO;

        //first add to database
        await testPost(testCourseOffering1);

        //post empty object to router, expects bad return code
        const res = await SuperTest(app)
            .put('/courseOffering')
            .send({}).expect(422);

        //expects to Get error from the database
        try {
            foundCO = await CourseOffering.findOne({where: {id: parseInt(res.get('id'))}});
        }
        catch(error) {
            err = error;
        }
        expect(err).toBeTruthy();
        expect(foundCO).toBeFalsy();
    });

    //test that a valid object with no id is not updated
    test('testThatInvalidIDIsNotUpdated', async function(){
        //variable to catch errors
        let err;
        let foundCO;

        //first add to database
        await testPost(testCourseOffering1);

        //change to have no id
        testCourseOffering1.id = '';

        //post empty object to router, expects bad return code
        const res = await SuperTest(app)
            .delete('/courseOffering')
            .send(testCourseOffering1.id).expect(422);

        //expects to Get error from the database
        try {
            foundCO = await CourseOffering.findOne({where: {id: parseInt(res.get('id'))}});
        }
        catch(error) {
            err = error;
        }
        expect(err).toBeTruthy();
        expect(foundCO).toBeFalsy();
    });

    //test that course Offering is successfully deleted from the database
    test('testThatCourseOfferingIsDeleted', async function(){
        //first add to database
        await testPost(testCourseOffering1);

        //delete
        await testDelete(testCourseOffering1);
    });


    //test that invalid course Offering id throws an error
    test('testThatInvalidIDIsNotDeleted', async function(){
        //variable to catch errors
        let err;
        let foundCO;

        //first add to database
        await testPost(testCourseOffering1);

        // Get number of Course offerings
        const oldNumCO = (await CourseOffering.findAll()).length;

        //fail to delete from database
        const res = await SuperTest(app)
            .delete('/courseOffering')
            .send(testCourseOffering2).expect(404);

        //expects to Get error from the database
        try {
            foundCO = await CourseOffering.findOne({where: {id: parseInt(res.get('id'))}});
        }
        catch(error) {
            err = error;
        }
        expect(err).toBeTruthy();
        expect(foundCO).toBeFalsy();

        // If a course offering is not deleted, the amount of entries should remain the same
        const newNumCO = (await CourseOffering.findAll()).length;
        expect(newNumCO).toBe(oldNumCO);
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
        .send(testCO)
        .expect(201);

    //expects to find the same offering in database
    const foundCO = await CourseOffering.findOne({where: {id: parseInt(res.get('id'))}});
    expect(foundCO).toBeTruthy();
};

/**
 * tests put function with a given Course Offering
 * @param testCO
 */
const testPut = async function(testCO) {
    //get the old CO in the database
    const oldCO = await CourseOffering.findOne({where: {id: testCO.id}});

    //posts offering to router, expects return code
    const res = await SuperTest(app)
        .put('/courseOffering')
        .send(testCO).expect(200);

    //expects to find the updated offering in database, and for it to be changed
    const foundCO = await CourseOffering.findOne({where: {id: parseInt(res.get('id'))}});
    expect(foundCO).toBeTruthy();
    expect(foundCO).not.ToBo(oldCO);
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

    // delete the course offering
    await SuperTest(app).delete('/courseOffering').send(testCO).expect(200); // expect 200: OK

    // If the Course offering was deleted, the number of entries in the db should decrement
    const newNumCO = (await CourseOffering.findAll()).length;
    expect(newNumCO).toBe(oldNumCO - 1);
};
