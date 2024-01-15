const {sequelize} = require('../../dataSource');

const {testConst} = require("../../constants");

const CourseOffering = require('../../private/javascript/CourseOffering');
const Classroom = require('../../private/javascript/Classroom');
const Timeslot = require('../../private/javascript/Timeslot.js');
const Term = require("../../private/javascript/Term");
const Instructor = require("../../private/javascript/Instructor");
const Program = require("../../private/javascript/Program");
const Associations = (require('../../private/javascript/Associations'))

let timeSlotInstance;
let classroomCreated;
let courseofferingCreated;


// course offering constant for having one entry
// in the table after .sync force true is run on the tables
// const CourseOfferingInstance = {
//     courseCode: 'COSA280',
//     termNumber: 4,
//     group: 'A',
// }

//
// /**
//  * Helper to refresh the db after a describe
//  *      - reset objects to default constants
//  *
//  * @returns {Promise<void>}     the promise can be handled by async
//  */
// async function updateDatabase() {
//     try {
//         await sequelize.sync();
//     } catch (err) {
//         console.error(`Error syncing sequelize:\n${err}`)
//     }
//
//     await Classroom.sync({force: true});
//     await CourseOffering.sync({force: true});
//     Associations.addAssociations();
//
//     // have a classroom and courseoffering exist during the tests
//     classroomCreated = await Classroom.create(testConst.roomEntryS38) // 239B
//     courseofferingCreated = await CourseOffering.create(CourseOfferingInstance);
//
//     await Timeslot.sync({force: true});
//
//     // the obj literal constant contains a room number and a course offering ID
//     timeSlotInstance = Object.assign({}, testConst.timeSlot1);
//
// }

describe('timeslotStartTime', () => {
    beforeAll(async function() {
        await Term.sync({force: true});
        await Instructor.sync({force: true});
        await Program.sync({force: true});
        await CourseOffering.sync({force: true});
        await Classroom.sync({force: true});

        Associations.addAssociations();
        await Term.create(testConst.term1);
        await Instructor.create(testConst.instructor1);
        await Program.create(testConst.program1);
        await CourseOffering.create(testConst.courseOffering1);
        await Classroom.create(testConst.classroom1)

    })
    beforeEach(async () => {
        timeSlotInstance = testConst.timeSlot1;
    })

    afterEach(async function() {
        await Timeslot.truncate();
    });

    // lower bound 24hrs - 00:00
    test('testStartTimeLowerBoundValid', async () => {
        try {
            timeSlotInstance.starttime = '00:00'

            const createdTimeSlot = await Timeslot.findOne()
            expect(createdTimeSlot).toBeTruthy()
            expect(createdTimeSlot.starttime).equals('00:00');

        } catch (error) {
            console.error(error.message);
        }
    })

    // testing valid at upper bound 23:59
    test('testStartTimeUpperBound24HrsValid', async () => {
        try {
            timeSlotInstance.starttime = '23:59';

            const createdTimeSlot = await Timeslot.findOne()
            expect(createdTimeSlot).toBeTruthy()
            // TODO: Add check that the time is correct
            expect(createdTimeSlot.starttime).toBe('23:59')
        } catch (error) {
            console.error(error.message);
        }
    })

    // testing invalid at 24:00 since max is 23:59
    test('testStartTimeUpperBoundHourInvalid', async () => {
        try {
            timeSlotInstance.starttime = '24:00';

            const createdTimeSlot = await Timeslot.findOne()
            fail()
        } catch (error) {
            expect(error.errors.length).toBe(1);
            expect(error.errors[0].message)
                .toBe('Invalid Start Time for Timeslot');
        }
    })

    // random string
    test('testStartTimeInvalid', async () => {
        try {
            timeSlotInstance.starttime = 'non-numeric';

            fail()
        } catch (error) {
            expect(error.errors.length).toBe(1);
            expect(error.errors[0].message)
                .toBe('Invalid Start Time for Timeslot');
        }
    })

    test('testEndTimeValid', async () => {
        try {
            timeSlotInstance.starttime = '16:00'
            timeSlotInstance.endtime = '17:00'

            const createdTimeSlot = await Timeslot.findOne()
            expect(createdTimeSlot).toBeTruthy()
            expect(createdTimeSlot.endtime).toBe('17:00')
        } catch (error) {
            console.error(error.message);
        }
    })

    test('testEndTimeInvalid', async () => {
        try {
            timeSlotInstance.endtime = 'non-numeric';

            fail()
        } catch (error) {
            expect(error.errors.length).toBe(1);
            expect(error.errors[0].message)
                .toBe('Invalid End Time for Timeslot');
        }
    })


    test('testDayValid', async () => {
        try {
            timeSlotInstance.day = 'Tuesday'

            const createdTimeSlot = await Timeslot.findOne()
            expect(createdTimeSlot).toBeTruthy()
            // TODO: check that the day is Tuesday
            expect(createdTimeSlot.day).toBe('Tuesday')
        } catch (error) {
            console.error(error.message);
        }
    })

    test('testDayInvalid', async () => {
        try {
            timeSlotInstance.day = 'Tuday'

            const createdTimeSlot = await Timeslot.findOne()
            fail();
        } catch (error) {
            expect(error.errors.length).toBe(1);
            expect(error.errors[0].message)
                .toBe('Invalid Day for Timeslot');
        }
    })

    test('testNoAssociationsValid', async () => {
        try {
            timeSlotInstance.termID = ''
            timeSlotInstance.courseOfferingID = ''
            timeSlotInstance.programID = ''
            timeSlotInstance.roomID = ''
            timeSlotInstance.instructorID = ''

            const createdTimeSlot = await Timeslot.findOne()
            expect(createdTimeSlot).toBeTruthy()
        } catch (error) {
            console.error(error.message);
        }
    })
});

