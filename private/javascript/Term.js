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
        if (this.termNumber===1 || this.termNumber===4) {
          if (monthVal==='08' || monthVal==='09') {
          } else {
              throw new Error('Term ' + this.termNumber + ' must start in August or September');
          }
        }
        if (this.termNumber===2 || this.termNumber===5) {
          if (monthVal !=='01') {
            throw new Error('Term ' + this.termNumber + ' must start in January');
          }

        }
        if (this.termNumber===3 || this.termNumber===6 ) {
          if (monthVal !=='05') {
            throw new Error('Term ' + this.termNumber + ' must start in May');
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
        if (this.termNumber===1 || this.termNumber===4) {
          if (monthVal!=='12') {
            throw new Error('Term ' + this.termNumber + ' must end in December');
          }
        }
        if (this.termNumber===2 || this.termNumber===5) {
          if (monthVal!=='04') {
            throw new Error('Term ' + this.termNumber + ' must end in April');
          }
        }
        if (this.termNumber===3 || this.termNumber===6) {
          if (monthVal==='05' || monthVal==='06') {
          } else {
            throw new Error('Term ' + this.termNumber + ' must end in May or June');
          }
        }
      },
      checkEndAfterStart(value) {
        const endDateArray = value.split('-');
        const startDateArray = this.startDate.split('-');

        // As all the month validators make sure the months do not overlap, we just need to make sure the year
        // of the end date is not before the year of the start date to make sure end date is after the start date
        if (startDateArray[0]>endDateArray[0])
        {
          throw new Error('End date must be after start date')
        }
        //there is a special exception for term 3 and 6, as they can have start and end date in the same month
        if (this.termNumber===3 || this.termNumber===6)
        {
          if (startDateArray[1]==='05' && endDateArray[1]==='05')
          {
            if (startDateArray[2]>=endDateArray[2])
            {
              throw new Error('End date must be after start date')
            }
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
