const CourseOffering = require('../../private/javascript/CourseOffering');
const app = require('../../app');
const SuperTest = require('supertest');
const CourseOfferingScript = require('../../fixtures/AssociatedCourseOffering.fix');
const CreateAllTables = require('../../Fixtures/createTables.fix');


describe('Functional Course Offering', () => {
  let testCourseOffering1;
  let testCourseOffering2;
  let courseObj;

  // refresh before each test
  beforeEach(async function() {
    await CreateAllTables(true);
    courseObj = await CourseOfferingScript();
    await CourseOffering.sync({force: true});
    testCourseOffering1 = courseObj.offering1;
    testCourseOffering1.course =1;
    testCourseOffering2 = courseObj.offering2;
    testCourseOffering2.course =1;
  });

  // destroy course offering table after each test
  afterEach(async function() {
    await CourseOffering.truncate();
  });

  // test that course Offering is successfully added to empty darabase
  test('testThatCourseOfferingIsCreatedInEmptyDatabase', async function() {
    await testPost(testCourseOffering1);
  });

  // test that course offering is successfully added into a pre-existing database
  test('testThatCourseOfferingIsCreated', async function() {
    await testPost(testCourseOffering1);
    await testPost(testCourseOffering2);
  });

  // tests that an empty course offering cannot be posted to database
  test('testThatInvalidCourseOfferingIsNotCreated', async function() {
    // variable to catch errors
    let err;
    let foundCO;

    testCourseOffering1.group = '';

    // posts offering to router, expects return code
    const res = await SuperTest(app)
        .post('/courseOffering')
        .send(testCourseOffering1).expect(422);

    // expects to Get error from the database
    try {
      foundCO = await CourseOffering.findOne({where: {id: parseInt(res.get('id'))}});
    } catch (error) {
      err = error;
    }
    expect(err).toBeTruthy();
    expect(foundCO).toBeFalsy();
  });

  // test that course Offering is successfully updated in the database
  test('testThatCourseOfferingIsUpdated ', async function() {
    // //posts offering to router, expects return code
    // const res = await CourseOffering.create(testCourseOffering1);
    //
    // //expects to find the same offering in database
    // const foundCO = await CourseOffering.findOne({where: {id: parseInt(res.get('id'))}});
    // expect(foundCO).toBeTruthy();

    // first add to database
    const testCO = await testPost(testCourseOffering1);

    // now change info in object
    testCO.group = 'A';

    // posts offering to router, expects return code
    const res = await SuperTest(app)
        .put('/courseOffering')
        .send(testCO.dataValues).expect(200);

    // expects to find the updated offering in database, and for it to be changed
    const foundCO = await CourseOffering.findByPk(testCO.id);
    expect(foundCO).toBeTruthy();
    expect(foundCO.group).toBe(testCO.group);
  });

  // test that invalid course Offering is not updated in the database
  test('testThatInvalidCourseOfferingIsNotUpdated ', async function() {
    // variable to catch errors
    let err;
    let foundCO;

    // first add to database
    const testCO = await testPost(testCourseOffering1);

    // now change info in object
    testCO.group = '';

    // post empty object to router, expects bad return code
    const res = await SuperTest(app)
        .put('/courseOffering')
        .send(testCO.dataValues).expect(422);

    // expects to Get error from the database
    try {
      foundCO = await CourseOffering.findOne({where: {id: parseInt(res.get('id'))}});
    } catch (error) {
      err = error;
    }
    expect(err).toBeTruthy();
    expect(foundCO).toBeFalsy();
  });

  // test that a valid object with no id is not updated
  test('testThatInvalidIDIsNotUpdated', async function() {
    // variable to catch errors
    let err;
    let foundCO;

    // first add to database
    const testCO = await testPost(testCourseOffering1);

    // change to have no id
    testCO.dataValues.id = '';
    testCO.group = 'A';

    // post empty object to router, expects bad return code
    const res = await SuperTest(app)
        .delete('/courseOffering')
        .send(testCO.dataValues).expect(404);

    // expects to Get error from the database
    try {
      foundCO = await CourseOffering.findByPk({id: parseInt(res.get('id'))});
    } catch (error) {
      err = error;
    }
    expect(err).toBeTruthy();
    expect(foundCO).toBeFalsy();
  });

  // test that course Offering is successfully deleted from the database
  test('testThatCourseOfferingIsDeleted', async function() {
    // first add to database
    const toDelete = await testPost(testCourseOffering1);

    // delete
    await testDelete(toDelete.dataValues);
  });

  // test that invalid course Offering id throws an error
  test('testThatInvalidIDIsNotDeleted', async function() {
    // variable to catch errors
    let err;
    let foundCO;

    // first add to database
    const toDelete = await testPost(testCourseOffering1);
    const oldNumCO = (await CourseOffering.findAll()).length;

    // change to have no id
    toDelete.dataValues.id = '';

    // fail to delete from database
    const res = await SuperTest(app)
        .delete('/courseOffering')
        .send(toDelete.dataValues).expect(404);

    // expects to Get error from the database
    try {
      foundCO = await CourseOffering.findByPk({id: parseInt(res.get('id'))});
    } catch (error) {
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
  // posts offering to router, expects return code
  const res = await SuperTest(app)
      .post('/courseOffering')
      .send(testCO)
      .expect(201);

  // expects to find the same offering in database
  const foundCO = await CourseOffering.findByPk(res.get('id'));
  expect(foundCO).toBeTruthy();
  return foundCO;
};

/**
 * tests put function with a given Course Offering
 * @param testCO
 */
const testPut = async function(testCO) {
  // get the old CO in the database
  const oldCO = await CourseOffering.findByPk(testCO.id);

  // posts offering to router, expects return code
  const res = await SuperTest(app)
      .put('/courseOffering')
      .send(testCO).expect(200);

  // expects to find the updated offering in database, and for it to be changed
  const foundCO = await CourseOffering.findByPk(testCO.id);
  expect(foundCO).toBeTruthy();
  expect(foundCO).not.ToBe(oldCO);
};

/**
 * Tests that testCO is successfully deleted
 * @param testCO
 */
const testDelete = async function(testCO) {
  expect(testCO).toBeTruthy();

  // Get number of Course offerings
  const oldNumCO = (await CourseOffering.findAll()).length;

  // delete the course offering
  await SuperTest(app)
      .delete('/courseOffering')
      .send(testCO)
      .expect(200); // expect 200: OK

  // If the Course offering was deleted, the number of entries in the db should decrement
  const newNumCO = (await CourseOffering.findAll()).length;
  expect(newNumCO).toBe(oldNumCO - 1);
};
