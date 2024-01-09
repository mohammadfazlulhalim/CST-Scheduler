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

// TODO fix association tests LATER
// associations test - course offering
/**
 * Ritish's Code - only modified the beforeEach,need to inspect the rest
 */
describe('timeslotCourseOffering', () => {

    beforeEach(async () => {
        await updateDatabase()
    })

    test('testAssociatedCourseOfferingValid', async () => {
        // TODO: Add associations
    })
});

describe('timeslotStartTime', () => {
    beforeEach(async () => {
        await updateDatabase()
    })

    // lower bound 24hrs - 00:00
    test('testStartTimeLowerBoundValid', async () => {
        try {
            timeSlotInstance.starttime = '00:00'
            await TimeSlot.create(timeSlotInstance);
            const createdTimeSlot = await TimeSlot.findOne()
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
            await TimeSlot.create(timeSlotInstance);
            const createdTimeSlot = await TimeSlot.findOne()
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
    test('testStartTimeInvalid', async () => {
        try {
            timeSlotInstance.starttime = 'non-numeric';
            await TimeSlot.create(timeSlotInstance);
            fail()
        } catch (error) {
            expect(error.errors.length).toBe(1);
            expect(error.errors[0].message)
                .toBe('Invalid Start Time for TimeSlot');
        }
    })
});

describe('timeslotEndtime', () => {
    beforeEach(updateDatabase)

    test('testEndTimeValid', async () => {
        try {
            timeSlotInstance.starttime = '16:00'
            timeSlotInstance.endtime = '17:00'
            await TimeSlot.create(timeSlotInstance);
            const createdTimeSlot = await TimeSlot.findOne()
            expect(createdTimeSlot).toBeTruthy()
            expect(createdTimeSlot.endtime).toBe('17:00')
        } catch (error) {
            console.error(error.message);
        }
    })

    test('testEndTimeInvalid', async () => {
        try {
            timeSlotInstance.endtime = 'non-numeric';
            await TimeSlot.create(timeSlotInstance);
            fail()
        } catch (error) {
            expect(error.errors.length).toBe(1);
            expect(error.errors[0].message)
                .toBe('Invalid End Time for TimeSlot');
        }
    })
});

describe("timeslotDay", () => {
    beforeEach(async () => {
        await updateDatabase()
    })

    test('testDayValid', async () => {
        try {
            timeSlotInstance.day = 'Tuesday'
            await TimeSlot.create(timeSlotInstance);
            const createdTimeSlot = await TimeSlot.findOne()
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
            await TimeSlot.create(timeSlotInstance);
            const createdTimeSlot = await TimeSlot.findOne()
            fail();
        } catch (error) {
            expect(error.errors.length).toBe(1);
            expect(error.errors[0].message)
                .toBe('Invalid Day for TimeSlot');
        }
    })
});

