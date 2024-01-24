const {sequelize, DataTypes} = require('../../../../../Downloads/cstprojects-prj5.cstscheduler-d6d17070552c/cstprojects-prj5.cstscheduler-d6d17070552c/dataSource');
const Course = require('../../../../../Downloads/cstprojects-prj5.cstscheduler-d6d17070552c/cstprojects-prj5.cstscheduler-d6d17070552c/private/javascript/Course');
const Term = require('../../../../../Downloads/cstprojects-prj5.cstscheduler-d6d17070552c/cstprojects-prj5.cstscheduler-d6d17070552c/private/javascript/Term');
const Instructor = require('../../../../../Downloads/cstprojects-prj5.cstscheduler-d6d17070552c/cstprojects-prj5.cstscheduler-d6d17070552c/private/javascript/Instructor');
const Program = require('../../../../../Downloads/cstprojects-prj5.cstscheduler-d6d17070552c/cstprojects-prj5.cstscheduler-d6d17070552c/private/javascript/Program');
const Room = require('../../../../../Downloads/cstprojects-prj5.cstscheduler-d6d17070552c/cstprojects-prj5.cstscheduler-d6d17070552c/private/javascript/Classroom');

// constant stores the regex for validating 12 or 24hr time
// valid upper: 00:00
// valid lower: 23:59
// invalid fail: 24:00
// could be better to just store 24 hour time for better comparison...
const regexTimeString = `^([01][0-9]|2[0-3]):([0-5][0-9])$`;

/**
 * This class stores objects that represent course offerings to be used in the CST Scheduler.
 */
const Timeslot = sequelize.define('Timeslot', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    //Dates - YYYY-MM-DD
    startDate: {
        type: DataTypes.STRING,
    },

    endDate: {
        type: DataTypes.STRING,
    },

    startTime: {
        type: DataTypes.TIME,
        validate: {
            is: {
                args: regexTimeString,
                msg: `Invalid Start Time for TimeSlot`
            }, //regex for time string
        },
    },

    endTime: {
        type: DataTypes.TIME,
        validate: {
            is: {
                args: regexTimeString,
                msg: `Invalid end Time for TimeSlot`
            }, //regex for time string
        },
    },

    day: {
        type: DataTypes.NUMBER,
        validate: {
            min: {
                args: -1,
                msg: 'Invalid Day for TimeSlot',
            },
            max: {
                args: 6,
                msg: 'Invalid Day for TimeSlot',
            },
        },
    },

    group: {
        type: DataTypes.STRING(1),
        validate: {
            isAlphanumeric: {
                args: true,
                msg: 'Course Offering group can only contain letters and numbers',
            },
            isUppercase: {
                args: true,
                msg: 'Course Offering group can only contain uppercase letters',
            },
            len: {
                args: [0, 1],
                msg: 'Course offering group can only be 0 or 1 character long',
            },
        },
    },

}, {
    tableName: 'Timeslots',
});


module.exports = Timeslot;