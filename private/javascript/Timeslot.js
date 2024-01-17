const {sequelize, DataTypes} = require('../../dataSource');
const Course = require('../javascript/Course');
const Term = require('../javascript/Term');
const Instructor = require('../javascript/Instructor');
const Program = require('../javascript/Program');
const Room = require('../javascript/Classroom');

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
    },

    endTime: {
        type: DataTypes.TIME,
    },

    day: {
        type: DataTypes.NUMBER,
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