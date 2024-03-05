const request =require ('supertest');
const app = require('../../app');
const Classroom= require ('../../private/javascript/Classroom');
const TimeSlot=require('../../private/javascript/Timeslot');
const {sequelize} = require("../../dataSource");
const ClassroomConflictReportController= require('../../routes/classroomConflictReportRouter');


describe('Classroom Conflict Report Router', ()=>{
    let conflictInstance1,conflictInstance2, classroomInstance ;

    //Before all tests create the conflicted timeslots table in the database
    beforeAll(async()=>{
        try{
            await sequelize.sync({force:true});

        }catch(error)
        {
            console.error ('Error creating Timeslots table: ', error)
        }
    });



 //Test endpoint for fetching classroom conflict reports

    it  ('testClassConflictURL', async()=>{
        const response = await request (app)
                    .get('/classroomConflictReport');
            expect (response.status).toBe(200);
        //TODO additional assertion to check the structure of the response

    });

    it ('testClassroomConflictsFound ', async()=>{
        const newReportData = {
            //TODO Provide necessary data to create a new report
            roomNumber:'239A'
        };
        const response = await request(app)
            .send(newReportData);
        expect(response.statusCode).toEqual(201);
    });

    it ('testClassroomConflictsNotFound ', async()=>{
        const newReportData = {
            //TODO Provide necessary data to create a new report
            roomNumber:'241'
        };
        const response = await request(app)
            .send(newReportData);
        expect(response.statusCode).toEqual(404);
    });

    //Clean up after tests
    afterAll (async()=>{
        await sequelize.close();   //close the database connection
    })

});