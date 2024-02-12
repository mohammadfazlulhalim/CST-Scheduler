const supertest = require('supertest');
const app = require('../../app');
const Program = require('../../private/javascript/Program');
const programList = require('../../fixtures/Program.fix').programList;
const program1 = require('../../fixtures/Program.fix').program1;

// This set of tests ensures that Program objects are handled within the database properly
describe('Programs in the database', () => {
  let testProgram;

  // Create a valid program to use as a base for testing
  beforeEach(async () => {
    // Drop the table and re-create it
    await Program.sync({force: true});
    testProgram = {...program1};
  });

  test('testThatValidProgramAddsToEmptyList', async () => {
    // Do the POST test starting with an empty database
    const res = await supertest(app).post('/program').send(testProgram).expect(201); // Expect 201: Created

    // Find the newly added program in the database
    const foundProgram = await Program.findOne({where: {id: parseInt(res.get('id'))}});
    // If the program does not exist, it will not be truthy; it will be null
    expect(foundProgram).toBeTruthy();
  });

  test('testThatValidProgramAddsToPopulatedList', async () => {
    // Create a few valid programs in the database
    for (const program of programList) {
      await Program.create(program);
    }
    const res = await supertest(app).post('/program').send(testProgram).expect(201); // Expect 201: Created

    // Find the newly added program in the database
    const foundProgram = await Program.findOne({where: {id: parseInt(res.get('id'))}});
    // If the program does not exist, it will not be truthy; it will be null
    expect(foundProgram).toBeTruthy();
  });

  test('testThatInvalidProgramDoesNotSaveToList', async () => {
    // Store the initial number of programs to compare against later
    const oldNumPrograms = (await Program.findAll()).length;
    // Change program name so that the program object is invalid
    testProgram.programName = '0';
    // Attempt to create the program in the database
    await supertest(app).post('/program').send(testProgram).expect(422); // Expect 422: Unprocessable Entity
    // Since no program should have been added to the database, the number of programs should remain the same
    const newNumPrograms = (await Program.findAll()).length;
    expect(newNumPrograms).toBe(oldNumPrograms);
  });

  test('testThatValidProgramDeletedFromPopulatedList', async () => {
    // Create a few valid programs in the database
    for (const program of programList) {
      await Program.create(program);
    }

    // Do the DELETE test now that there are some programs in the database
    const newProgram = (await Program.create(testProgram)).dataValues;
    // Store the initial number of programs to compare against later
    const oldNumPrograms = (await Program.findAll()).length;

    await supertest(app).delete('/program').send(newProgram).expect(200); // Expect 200: OK
  });

  test('testThatValidProgramDeletesLastItem', async () => {
    // Do the DELETE test now that there are some programs in the database
    const newProgram = (await Program.create(testProgram)).dataValues;
    // Store the initial number of programs to compare against later
    await supertest(app).delete('/program').send(newProgram).expect(200); // Expect 200: OK
  });

  test('testThatInvalidProgramDoesNotUpdateList', async () => {
    // Create a new program to update
    const programToUpdate = (await Program.create(testProgram)).dataValues;
    const originalProgramName = programToUpdate.programName;

    // Attempt to update the newly added program with invalid data
    await supertest(app)
        .put('/program')
        .send({
          progID: programToUpdate.id,
          programAbbreviation: programToUpdate.programAbbreviation,
          programName: '0', // Invalid data
        })
        .expect(422); // Expect 422: Unprocessable Entity

    // Check that the database remains unchanged
    const updatedProgram = await Program.findOne({where: {id: programToUpdate.id}});
    expect(updatedProgram.programName).toBe(originalProgramName);
  });

  test('testThatNonExistentProgramCannotBeUpdated', async () => {
    // Create a new program to update
    const programToUpdate = (await Program.create(testProgram)).dataValues;
    // Store the initial number of programs to compare against later
    const oldNumProgram = (await Program.findAll()).length;
    // Try to update the newly added program
    await supertest(app).put('/program').send({
      progID: programToUpdate.id + 1, // Non-existent ID
      programName: programToUpdate.programName,
      programAbbreviation: programToUpdate.programAbbreviation,
    }).expect(404); // Expect 404: Not Found
    // Ensure it didn't add a new program
    const newNumProgram = (await Program.findAll()).length;
    expect(newNumProgram).toBe(oldNumProgram);
  });

  test('testThatValidProgramIsUpdated', async () => {
    // Create a new program to update
    const programToUpdate = (await Program.create(testProgram)).dataValues;
    // Store the initial number of programs to compare against later
    const oldNumProgram = (await Program.findAll()).length;
    // Try to update the newly added program
    await supertest(app).put('/program').send({
      progID: programToUpdate.id,
      programName: programToUpdate.programName,
      programAbbreviation: programToUpdate.programAbbreviation,
    }).expect(201); // Expect 200: OK
    // Ensure it didn't add a new program
    const newNumProgram = (await Program.findAll()).length;
    expect(newNumProgram).toBe(oldNumProgram);
  });
});
