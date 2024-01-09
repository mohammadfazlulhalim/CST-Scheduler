const {sequelize} = require('../../dataSource');

const {testConst} = require("../../constants");

const CourseOffering = require('../../private/javascript/CourseOffering');
const Classroom = require('../../private/javascript/Classroom');
const TimeSlot = require('../../private/javascript/TimeSlot.js');
const Course = require('../../private/javascript/Course');
const Associations = (require('../../private/javascript/Associations'))

let timeSlotInstance;
let classroomCreated;
let courseofferingCreated;


// course offering constant for having one entry
// in the table after .sync force true is run on the tables
const CourseOfferingInstance = {
    courseCode: 'COSA280',
    termNumber: 4,
    group: 'A',
}


/**
 * Helper to refresh the db after a describe
 *      - reset objects to default constants
 *
 * @returns {Promise<void>}     the promise can be handled by async
 */
async function updateDatabase() {
    try {
        await sequelize.sync();
    } catch (err) {
        console.error(`Error syncing sequelize:\n${err}`)
    }

    await Classroom.sync({force: true});
    await CourseOffering.sync({force: true});

    Associations.addAssociations();

    // have a classroom and courseoffering exist during the tests
    classroomCreated = await Classroom.create(testConst.roomEntryS38) // 239B
    courseofferingCreated = await CourseOffering.create(CourseOfferingInstance);

    await TimeSlot.sync({force: true});

    // the obj literal constant contains a room number
    // and a course offering ID
    timeSlotInstance = Object.assign({}, testConst.timeSlot1);

    Associations.addAssociations();

}


/**
 * Ritish's Code, read over the test and should work for us - Brandon
 */
// PK does autoincrement behind the scenes...
describe('timeslot id tests', () => {
    beforeEach(async () => {
        await updateDatabase()
    })

    test('testTSTimeSlotHasValidID', async () => {
        try {
            const createdTimeSlot = await TimeSlot.create(timeSlotInstance);
            const foundTimeSlot = await TimeSlot.findOne(
                {where: {timeslotID: createdTimeSlot.timeslotID}}
            )
            expect(foundTimeSlot).toBeTruthy()
        } catch (error) {
            console.error(error.message);
        }
    })
}); // end id tests


// TODO fix association tests LATER
// associations test - course offering
/**
 * Ritish's Code - only modified the beforeEach,need to inspect the rest
 */
describe('tests TS association with course offering', () => {

    beforeEach(async () => {
        await updateDatabase()
    })

    test('testTSAssociatedCourseOfferingValid', async () => {
        try {
            // statements
            const timeslotcreated = await TimeSlot.create(timeSlotInstance);
            const timeslotread = await TimeSlot.findOne({
                where: {
                    timeslotID: timeslotcreated.timeslotID
                },
                include: CourseOffering
            })


            // expect the timeslot instance to have a referenceable
            // courseoffering id that established the association in the first place.


        } catch (e) {
            // in case of any errors in test
            console.log(e);
        }
    })

}) // TS course offering associations tests end here


// starttime
/**
 * Ritish's code - need's some slight refinements
 */
describe('timeslot starttime tests', () => {

    beforeEach(async () => {
        await updateDatabase()
    })

    // lower bound 24hrs - 00:00
    test('testTSTimeSlotStartTimeLowerBoundValid', async () => {
        try {
            timeSlotInstance.starttime = '00:00'
            await TimeSlot.create(timeSlotInstance);
            const createdTimeSlot = await TimeSlot.findOne()
            expect(createdTimeSlot).toBeTruthy()
            expect(createdTimeSlot.starttime).equals('00:00');

        } catch (error) {
            // TODO: Modification - may not work so need to validate
            expect(1).ToEqual(2);
            console.error(error.message);
        }
    })

    // testing valid at upper bound 23:59
    test('testTSTimeSlotStartTimeUpperBound24HrsValid', async () => {
        try {
            timeSlotInstance.starttime = '23:59'
            await TimeSlot.create(timeSlotInstance);
            const createdTimeSlot = await TimeSlot.findOne()
            expect(createdTimeSlot).toBeTruthy()
            // TODO: Add check that the time is correct
        } catch (error) {
            console.error(error.message);
        }
    })

    // testing invalid at 24:00 since max is 23:59
    test('testTSTimeSlotStartTimeUpperBoundHourInvalid', async () => {
        try {
            timeSlotInstance.starttime = '24:00'
            await TimeSlot.create(timeSlotInstance);
            const createdTimeSlot = await TimeSlot.findOne()
            fail()
        } catch (error) {
            expect(error.errors.length).toBe(1);
            expect(error.errors[0].message)
                .toBe('Invalid Start Time for TimeSlot');
        }
    })

    // random string
    test('testTSTimeSlotStartTimeInvalid', async () => {
        try {
            timeSlotInstance.starttime = `non-time string`
            await TimeSlot.create(timeSlotInstance);
            fail()
        } catch (error) {
            expect(error.errors.length).toBe(1);
            expect(error.errors[0].message)
                .toBe('Invalid Start Time for TimeSlot');
        }
    })

}); // end start time tests


/**
 * Ritish's code - Need some modifications
 */
// endtime tests
describe('timeslot endtime tests', () => {

    beforeEach(updateDatabase)

    test('testTSTimeSlotEndTimeValid', async () => {
        try {
            timeSlotInstance.starttime = '16:00'
            timeSlotInstance.endtime = '17:00'
            await TimeSlot.create(timeSlotInstance);
            const createdTimeSlot = await TimeSlot.findOne()
            expect(createdTimeSlot).toBeTruthy()
            // TODO: Check the times to make sure they are correck
        } catch (error) {
            console.error(error.message);
        }
    })

    test('testTSTimeSlotEndTimeInvalid', async () => {
        try {
            timeSlotInstance.endtime = "non-time string"
            await TimeSlot.create(timeSlotInstance);
            fail()
        } catch (error) {
            expect(error.errors.length).toBe(1);
            expect(error.errors[0].message)
                .toBe('Invalid End Time for TimeSlot');
        }
    })

}); // end of endtime tests


// day tests
/**
 * Ritish's code - needs some modifications
 */
describe("timeslot day tests", () => {
    beforeEach(async () => {
        await updateDatabase()
    })

    test('testTSTimeSlotDayValid', async () => {
        try {
            timeSlotInstance.day = 'Tuesday'
            await TimeSlot.create(timeSlotInstance);
            const createdTimeSlot = await TimeSlot.findOne()
            expect(createdTimeSlot).toBeTruthy()
            // TODO: check that the day is Tuesday
        } catch (error) {
            console.error(error.message);
        }
    })

    test('testTSTimeSlotDayInvalid', async () => {
        try {
            timeSlotInstance.day = 'Tuday'
            await TimeSlot.create(timeSlotInstance);
            const createdTimeSlot = await TimeSlot.findOne()
            fail();
        } catch (error) {
            expect(error.errors.length).toBe(1);
            expect(error.errors[0].message)
                .toBe('Invalid Day for TimeSlot');
        }
    })

}) // day tests end here

