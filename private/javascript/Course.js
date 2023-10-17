
const {Sequelize, DataTypes} = require('sequelize');
const sequelize = new Sequelize('');



// STUB START
const Course = sequelize.define ('Course', {
    courseCode: {
        // might have been tested elsewhere
        // unsure if story34 branch needs testing
        type: DataTypes.STRING,

    },
    courseName: {
        type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true,
        validate: {
            len: [1,100] // check if it's inclusive of the range numbers
        }
    },
    courseNumCredits: {
        type: DataTypes.INTEGER,
        allowNull: false,
        min: 0,
        max: 99,
    },
    courseNumHoursPerWeek: {
        type: DataTypes.INTEGER,
        allowNull: false,
        min: 1,
        max: 168, // 168 hours in a week
    },
    // programID: {
    //
    // }
})

(async () => {
    await sequelize.sync( {force:true} )
})



module.exports = Course;