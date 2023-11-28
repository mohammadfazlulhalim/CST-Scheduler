// /**
//  * The purpose of this file is to tets the functionality of the program's controller/router
//  * Christeen Shlimoon
//  * @type {NonConstructor<Model> | {new(): Model<any, TModelAttributes>} | {}}
//  */
// const Program = require('../../private/javascript/Program.js');
// const {sequelize} = require('../../dataSource');
// const express = require('express');
// const supertest = require('supertest');
// const router= require('../../routes/Program');
// const app = express();
// const testConst= require('../../constants').testConst;
//
// app.use(express.json());
// app.use('/', router);
//
//
// describe('ProgramCRUDTesting', () => {
//   let programInstance;
//
//   // Before all tests, create the Program table in the database
//   beforeAll(async () => {
//     try {
//       await sequelize.sync();
//       console.log('Program table created successfully');
//     } catch (error) {
//       console.error('Error creating Program table:', error);
//     }
//   });
//
//   // Valid program setup
//   beforeEach(async () => {
//     //programInstance = {programAbbreviation: 'CST', programName: 'Computer Systems Technology'};
//     programInstance=testConst.program1;
//   });
//
//   describe('POST /', () => {
//     test('testThatValidProgramIAddedToDataBase', async () => {
//       const response = await supertest(app).post('/program').send(programInstance);
//       expect(response.status).toBe(201);
//
//       // check the response body or database for the created program
//       const createdProgram = await Program.findOne({where: {programAbbreviation: 'CST'}});
//       expect(createdProgram).toBeDefined();
//       expect(createdProgram.programName).toBe('Computer Systems Technology');
//     });
//
//     test('testThatInvalidProgramIsNotAddedToDataBase', async () => {
//       // Send a POST request with invalid data
//       const invalidProgram = {programAbbreviation: 'CST', programName: null}; // Missing required field programName
//       const response = await supertest(app).post('/program').send(invalidProgram);
//
//       // Expect a 400 Bad Request status code
//       expect(response.status).toBe(400);
//
//       // check that no program is created in the database
//       const nonExistentProgram = await Program.findOne({where: {programAbbreviation: 'CST'}});
//       expect(nonExistentProgram).toBeNull();
//     });
//
//
//     test('testThatDuplicateProgramAbbreviationIsNotAddedToDataBase', async () => {
//       // Create a program first
//       await supertest(app).post('/program').send(programInstance);
//
//       // Attempt to create a program with the same abbreviation
//       const response = await supertest(app).post('/program').send(programInstance);
//
//       // Expect a 400 Bad Request status code due to uniqueness constraint violation
//       expect(response.status).toBe(400);
//
//       // check that there is still only one program in the database
//       const programs = await Program.findAll({where: {programAbbreviation: 'CST'}});
//       expect(programs.length).toBe(1);
//     });
//   });
//
//   describe('PUT /', () => {
//     test('testThatValidProgramIsUpdatedInDataBase', async () => {
//       // Create a program first
//       await supertest(app).post('/program').send(programInstance);
//
//       // Update the program
//       const updatedProgram = {programName: 'Updated Computer Systems Technology'};
//       const response = await supertest(app).put('/program').send(updatedProgram);
//       expect(response.status).toBe(200);
//
//       // Optionally, you can check the database for the updated program
//       const existingProgram = await Program.findOne({where: {programAbbreviation: 'CST'}});
//       expect(existingProgram).toBeDefined();
//       expect(existingProgram.programName).toBe('Updated Computer Systems Technology');
//     });
//
//     test('testThatUpdatingNonexistentProgramReturns404', async () => {
//       // Send a PUT request for a program that doesn't exist
//       const nonexistentProgramUpdate = {programName: 'Updated Nonexistent Program'};
//       const response = await supertest(app).put('/program').send(nonexistentProgramUpdate);
//
//       // Expect a 404 Not Found status code
//       expect(response.status).toBe(404);
//
//       // check that the database remains unchanged
//       const originalProgram = await Program.findOne({where: {programAbbreviation: 'Nonexistent'}});
//       expect(originalProgram).toBeNull();
//     });
//
//     test('testThatInvalidProgramUpdateReturns400', async () => {
//       // Create a program first
//       await supertest(app).post('/program').send(programInstance);
//
//       // Send a PUT request with invalid data
//       const invalidProgramUpdate = {programName: null}; // Invalid data
//       const response = await supertest(app).put('/program').send(invalidProgramUpdate);
//
//       // Expect a 400 Bad Request status code
//       expect(response.status).toBe(400);
//
//       // check that the database remains unchanged
//       const originalProgram = await Program.findOne({where: {programAbbreviation: 'CST'}});
//       expect(originalProgram.programName).toBe('Computer Systems Technology');
//     });
//   });
//
//   describe('DELETE /', () => {
//     test('testThatValidProgramIsDeletedFromDataBase', async () => {
//       // Create a program first
//       await supertest(app).post('/program').send(programInstance);
//
//       // Delete the program
//       const response = await supertest(app).delete('/program');
//       expect(response.status).toBe(204);
//
//       // Optionally, you can check the database for the deleted program
//       const deletedProgram = await Program.findOne({where: {programAbbreviation: 'CST'}});
//       expect(deletedProgram).toBeNull();
//     });
//
//
//     test('testThatValidProgramIAddedToDataBaseInEmptyList', async () => {
//       // Make sure there are no existing programs
//       await Program.destroy({where: {}});
//
//       const response = await supertest(app).post('/program').send(programInstance);
//       expect(response.status).toBe(201);
//
//       // Check that the response body or database contains the created program
//       const createdProgram = await Program.findOne({where: {programAbbreviation: 'CST'}});
//       expect(createdProgram).toBeDefined();
//       expect(createdProgram.programName).toBe('Computer Systems Technology');
//     });
//
//
//     test('testThatDeletingNonexistentProgramReturns404', async () => {
//       // Make sure there are no existing programs
//       await Program.destroy({where: {}});
//
//       // Send a DELETE request for a program that doesn't exist
//       const response = await supertest(app).delete('/program');
//
//       // Expect a 404 Not Found status code
//       expect(response.status).toBe(404);
//
//       // Check that the database remains empty
//       const programs = await Program.findAll();
//       expect(programs.length).toBe(0);
//     });
//
//     test('testThatValidProgramIsDeletedFromDataBaseAndListIsLeftEmpty', async () => {
//       // Make sure there is only one program in the database
//       await Program.destroy({where: {}});
//       await supertest(app).post('/program').send(programInstance);
//
//       // Delete the program
//       const response = await supertest(app).delete('/program');
//       expect(response.status).toBe(204);
//
//       // Check that the database is empty after deletion
//       const programs = await Program.findAll();
//       expect(programs.length).toBe(0);
//     });
//
//
//     test('testThatDeletingFirstProgramInListLeavesListEmpty', async () => {
//       // Make sure there is only one program in the database
//       await Program.destroy({where: {}});
//       await supertest(app).post('/program').send(programInstance);
//
//       // Delete the program
//       const response = await supertest(app).delete('/program');
//       expect(response.status).toBe(204);
//
//       // Check that the database is empty after deleting the first program
//       const programs = await Program.findAll();
//       expect(programs.length).toBe(0);
//     });
//
//
//     test('testThatDeletingLastProgramInListLeavesListEmpty', async () => {
//       // Make sure there is only one program in the database
//       await Program.destroy({where: {}});
//       await supertest(app).post('/program').send(programInstance);
//
//       // Delete the program
//       const response = await supertest(app).delete('/program');
//       expect(response.status).toBe(204);
//
//       // Check that the database is empty after deleting the last program
//       const programsBefore = await Program.findAll();
//       expect(programsBefore.length).toBe(0);
//
//       // Add a new program
//       await supertest(app).post('/program').send(programInstance);
//
//       // Delete the newly added program
//       const secondDeleteResponse = await supertest(app).delete('/program');
//       expect(secondDeleteResponse.status).toBe(204);
//
//       // Check that the database is empty after deleting the last program
//       const programsAfter = await Program.findAll();
//       expect(programsAfter.length).toBe(0);
//     });
//   });
// });
const supertest = require('supertest');
const app = require('../../app'); // Assuming your Express app is exported from 'app.js'
const Program = require('../../private/javascript/Program');

describe('Program CRUD Testing', () => {
  let programInstance;

  beforeEach(() => {
    programInstance = {programAbbreviation: 'CST', programName: 'Computer Systems Technology'};
  });

  describe('POST /program/add', () => {
    test('should add a valid program to the database', async () => {
      const response = await supertest(app).post('/program/add').send(programInstance);
      expect(response.status).toBe(201);

      const createdProgram = await Program.findOne({where: {programAbbreviation: 'CST'}});
      expect(createdProgram).toBeDefined();
      expect(createdProgram.programName).toBe('Computer Systems Technology');
    });

    test('should reject an invalid program and return 400 Bad Request', async () => {
      // Send a POST request with invalid data
      const invalidProgram = {programAbbreviation: 'CST', programName: null}; // Missing required field programName
      const response = await supertest(app).post('/program/add').send(invalidProgram);

      expect(response.status).toBe(400);

      // Check that no program is created in the database
      const nonExistentProgram = await Program.findOne({where: {programAbbreviation: 'CST'}});
      expect(nonExistentProgram).toBeNull();
    });

    test('should reject a duplicate program abbreviation and return 400 Bad Request', async () => {
      // Create a program first
      await supertest(app).post('/program/add').send(programInstance);

      // Attempt to create a program with the same abbreviation
      const response = await supertest(app).post('/program/add').send(programInstance);

      expect(response.status).toBe(400);

      // Check that there is still only one program in the database
      const programs = await Program.findAll({where: {programAbbreviation: 'CST'}});
      expect(programs.length).toBe(1);
    });
  });

  describe('POST /program/edit', () => {
    test('should update a valid program in the database', async () => {
      // Create a program first
      await supertest(app).post('/program/add').send(programInstance);

      // Update the program
      const updatedProgram = {programName: 'Updated Computer Systems Technology'};
      const response = await supertest(app).post('/program/edit').send({...programInstance, ...updatedProgram});

      expect(response.status).toBe(200);

      // Check the database for the updated program
      const existingProgram = await Program.findOne({where: {programAbbreviation: 'CST'}});
      expect(existingProgram).toBeDefined();
      expect(existingProgram.programName).toBe('Updated Computer Systems Technology');
    });

    test('should reject updating a nonexistent program and return 404 Not Found', async () => {
      // Send a POST request to update a program that doesn't exist
      const nonexistentProgramUpdate = {programName: 'Updated Nonexistent Program'};
      const response = await supertest(app).post('/program/edit').send(nonexistentProgramUpdate);

      expect(response.status).toBe(404);

      // Check that the database remains unchanged
      const originalProgram = await Program.findOne({where: {programAbbreviation: 'Nonexistent'}});
      expect(originalProgram).toBeNull();
    });

    test('should reject an invalid program update and return 400 Bad Request', async () => {
      // Create a program first
      await supertest(app).post('/program/add').send(programInstance);

      // Send a POST request to update a program with invalid data
      const invalidProgramUpdate = {programName: null}; // Invalid data
      const response = await supertest(app).post('/program/edit').send({...programInstance, ...invalidProgramUpdate});

      expect(response.status).toBe(400);

      // Check that the database remains unchanged
      const originalProgram = await Program.findOne({where: {programAbbreviation: 'CST'}});
      expect(originalProgram.programName).toBe('Computer Systems Technology');
    });
  });

  describe('POST /program/delete', () => {
    test('should delete a valid program from the database', async () => {
      // Create a program first
      await supertest(app).post('/program/add').send(programInstance);

      // Delete the program
      const response = await supertest(app).post('/program/delete').send({progID: programInstance.id});

      expect(response.status).toBe(200);

      // Check the database for the deleted program
      const deletedProgram = await Program.findOne({where: {programAbbreviation: 'CST'}});
      expect(deletedProgram).toBeNull();
    });


    test('should reject deleting a nonexistent program and return 404 Not Found', async () => {
      // Send a POST request to delete a program that doesn't exist
      const response = await supertest(app).post('/program/delete').send({progID: 'nonexistentID'});

      expect(response.status).toBe(404);

      // Check that the database remains unchanged
      const programs = await Program.findAll();
      expect(programs.length).toBe(0);
    });
  });
});
