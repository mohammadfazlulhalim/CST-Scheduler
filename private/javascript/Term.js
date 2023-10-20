// Documentation for sequelize: https://sequelize.org/

// const {sequelize, DataTypes} = require('../../app');
const {DataTypes, sequelize} = require('../../datasource');

// Creating the model
// See: https://sequelize.org/docs/v6/core-concepts/model-basics/

const Term = sequelize.define('Term', {
    termNumber: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: 1,
          msg: 'Term number must be between 1 and 6',
        },
        max: {
          args: 6,
          msg: 'Term number must be between 1 and 6',
        },
      },
    },

  startDate: {
    type: DataTypes.DATEONLY,
    validate: {
      // Here is where I can put my validators
      // https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
      customTermStartDates(value) {
          // splitting the date based on this
          const dateArray = value.split('-');
          const monthVal = dateArray[1];
        if (this.termNumber===1) {
          if (monthVal==='08' || monthVal==='09') {
          } else {
              throw new Error('Term 1 must start in August or September');
          }
        }
        if (this.termNumber===4) {
          if (monthVal==='08' || monthVal==='09') {
          } else {
            throw new Error('Term 4 must start in August or September');
          }
        }
      },
    },
  },
  endDate: {
    type: DataTypes.DATEONLY,
    validate: {
      // Here is where I can put my validators
      // https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
      customEndDates(value) {
        // splitting the date based on this
        const dateArray = value.split('-');
        const monthVal = dateArray[1];
        if (this.termNumber===1) {
          if (monthVal!=='12') {
            throw new Error('Term 1 must end in December');
          }
        }
        if (this.termNumber===4) {
          if (monthVal!=='12') {
            throw new Error('Term 4 must end in December');
          }
        }
      },
    },
  },

}, // , {
//   validate: {
//     startDatePerTerm() {
//       // Here I can reference multiple fields
//       if (termNumber === 1) {
//         // Not sure if month is 0 based or not
//         if (startDate.month!==7 || startDate.month!==8) {
//           throw new Error('Term 1 must start in August or September');
//         }
//       }
//     },
//   },
// }
);

// Now need to keep it in sync with the database


module.exports = Term;
