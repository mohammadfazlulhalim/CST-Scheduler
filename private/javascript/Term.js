// Documentation for sequelize: https://sequelize.org/

//const {sequelize, DataTypes} = require('../../app');
const {DataTypes, sequelize} = require('../../datasource');

// Creating the model
// See: https://sequelize.org/docs/v6/core-concepts/model-basics/

const Term = sequelize.define('Term', {
    startDate: {
        type: DataTypes.DATEONLY,
        validate: {
            //Here is where I can put my validators
            // https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
            customValidator(value) {
                // Going to do a check that it is not null
                // if (value===null) {
                //     throw new Error('Start date must be entered');
                // }
                // // This should probably be a switch statement later on
                // if (termNumber===1)
                // {
                //     // getMonth() returns a zero-based value
                //     if (value.getMonth() !==7 || value.Month !==8)
                //     {
                //         throw new Error('Term 1 must start in August or September');
                //     }
                // }
            }
        }
    },
    endDate: {
        type: DataTypes.DATEONLY,
        validate: {
            //add validators
            // https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
        }
    },
    termNumber: {
        type: DataTypes.INTEGER,
        validate: {
            min: {
                args: 1,
                msg: 'Term number must be between 1 and 6',
            },
            // max: {
            //     args: 6,
            //     msg: 'Term number must be between 1 and 6',
            // }
        }
    }
});

// Now need to keep it in sync with the database


module.exports = Term;
