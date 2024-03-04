const TimeSlot=require('../../private/javascript/Timeslot')
const {DataTypes} = require("../../dataSource");
describe('searchConfict', ()=>{
    let conflictInstance1,conflictInstance2, classroomInstance ;

    //Before all tests create the conflicted timeslots table in the database
    beforeAll(async()=>{
        try{
            await sequilize.sync();

        }catch(error)
        {
            console.error ('Error creating Timeslots table: ', error)
        }
    });

    //creating conflict in schedule
    beforeEach (async()=>{
        conflictInstance1= { id:1, startDate:'2023-01-01', endDate:'2023-04-01', startTime:'8:00', endTime:'9:00', day:1, group:'B' };
        conflictInstance2= { id:2, startDate:'2023-01-01', endDate:'2023-04-01', startTime:'8:00', endTime:'9:00', day:1, group:'B' };

    });

    test ('testClassroomConflictsFound', async()=>{
        const res = await request (app)
                    .post('/classroomConflictReport')
            .send(classroom)

    })

});