// SEQUELIZE STUB TO CLARIFY DATABASE ORM CONVERSATIONS!
// Docs are utilized to assist in setting up the stub
// https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
// more resources:
    // https://codesandbox.io/s/jest-sequelize-example-5zglq?file=/src/__tests__/consumer.js
    //
const {Sequelize, DataTypes} = require('sequelize');

const courseInstance = sequelize.define ('Course', {
    courseCode: {

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
    programID: {
        allowNull: false,
    }
})

(async () => {
    await sequelize.sync( {force:true} )

})

// // // Stub end // // // //
// --------------------------



// // // TESTS // // // // //
jest.mock(sequelize);

describe('courseInstance', () => {

})


// // // Tests End // // // // //
// --------------------------

