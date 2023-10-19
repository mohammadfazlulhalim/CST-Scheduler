
const {sequelize, DataTypes} = require('../../datasource');



// MODEL STUB START
const Course = sequelize.define ('Course', {
    courseCode: {
        // might have been tested elsewhere
        // unsure if story34 branch needs testing
        type: DataTypes.STRING

    },
    courseName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                message: "Error: Course Name must have 1 to 100 characters."
            }
        },
        len: [1,100], // check if it's inclusive of the range numbers
        message: "Error: Course Name must have 1 to 100 characters."
    },
    courseNumCredits: {
        type: DataTypes.INTEGER,
        allowNull: false,
        min: 0,
        max: 6,
        message: "Error: Enter a whole number between 0 and 6 as a valid number of credits."
    },
    courseNumHoursPerWeek: {
        type: DataTypes.INTEGER,
        allowNull: false,
        isInt: {
            message: "Error: Enter a whole number between 1 and 168 as a valid number of credits."
        },
        min: 1,
        max: 168,
        message: "Error: Enter a whole number between 1 and 168 as a valid number of credits."
    }

})



module.exports = Course;