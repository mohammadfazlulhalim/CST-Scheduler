/**
 * The purpose of this file is to tets the functionality of the program's controller/router
 * Christeen Shlimoon
 * @type {NonConstructor<Model> | {new(): Model<any, TModelAttributes>} | {}}
 */
const Program = require('../../private/javascript/Program.js');
const {sequelize} = require('../../dataSource');
const express = require('express');
const supertest = require('supertest');
const router= require('../../routes/Program');
const app = express();

app.use(express.json());
app.use('/', router);


describe('ProgramCRUDTesting', () => {
  let programInstance;

  // Before all tests, create the Program table in the database
  beforeAll(async () => {
    try {
      await sequelize.sync();
      console.log('Program table created successfully');
    } catch (error) {
      console.error('Error creating Program table:', error);
    }
  });

  // Valid program setup
  beforeEach(async () => {
    programInstance = {programAbbreviation: 'CST', programName: 'Computer Systems Technology'};
  });

  describe('POST /', () => {
    test('testThatValidProgramIAddedToDataBase', async () => {
      const response = await supertest(app).post('/program').send(programInstance);
      expect(response.status).toBe(201);

      // Optionally, you can check the response body or database for the created program
      const createdProgram = await Program.findOne({where: {programAbbreviation: 'CST'}});
      expect(createdProgram).toBeDefined();
      expect(createdProgram.programName).toBe('Computer Systems Technology');
    });

    test('testThatInvalidProgramIsNotAddedToDataBase', async () => {
      // Send a POST request with invalid data
      const invalidProgram = {programAbbreviation: 'CST', programName: null}; // Missing required field programName
      const response = await supertest(app).post('/program').send(invalidProgram);

      // Expect a 400 Bad Request status code
      expect(response.status).toBe(400);

      // check that no program is created in the database
      const nonExistentProgram = await Program.findOne({where: {programAbbreviation: 'CST'}});
      expect(nonExistentProgram).toBeNull();
    });
  });

  describe('PUT /', () => {
    test('testThatValidProgramIsUpdatedInDataBase', async () => {
      // Create a program first
      await supertest(app).post('/program').send(programInstance);

      // Update the program
      const updatedProgram = {programName: 'Updated Computer Systems Technology'};
      const response = await supertest(app).put('/program').send(updatedProgram);
      expect(response.status).toBe(200);

      // Optionally, you can check the database for the updated program
      const existingProgram = await Program.findOne({where: {programAbbreviation: 'CST'}});
      expect(existingProgram).toBeDefined();
      expect(existingProgram.programName).toBe('Updated Computer Systems Technology');
    });

    test('testThatUpdatingNonexistentProgramReturns404', async () => {
      // Send a PUT request for a program that doesn't exist
      const nonexistentProgramUpdate = {programName: 'Updated Nonexistent Program'};
      const response = await supertest(app).put('/program').send(nonexistentProgramUpdate);

      // Expect a 404 Not Found status code
      expect(response.status).toBe(404);

      // check that the database remains unchanged
      const originalProgram = await Program.findOne({where: {programAbbreviation: 'Nonexistent'}});
      expect(originalProgram).toBeNull();
    });

    test('testThatInvalidProgramUpdateReturns400', async () => {
      // Create a program first
      await supertest(app).post('/program').send(programInstance);

      // Send a PUT request with invalid data
      const invalidProgramUpdate = {programName: null}; // Invalid data
      const response = await supertest(app).put('/program').send(invalidProgramUpdate);

      // Expect a 400 Bad Request status code
      expect(response.status).toBe(400);

      // check that the database remains unchanged
      const originalProgram = await Program.findOne({where: {programAbbreviation: 'CST'}});
      expect(originalProgram.programName).toBe('Computer Systems Technology');
    });
  });

  describe('DELETE /', () => {
    test('testThatValidProgramIsDeletedFromDataBase', async () => {
      // Create a program first
      await supertest(app).post('/program').send(programInstance);

      // Delete the program
      const response = await supertest(app).delete('/program');
      expect(response.status).toBe(204);

      // Optionally, you can check the database for the deleted program
      const deletedProgram = await Program.findOne({where: {programAbbreviation: 'CST'}});
      expect(deletedProgram).toBeNull();
    });
  });
});
