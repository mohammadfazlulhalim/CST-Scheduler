// Documentation for sequelize: https://sequelize.org/
const {DataTypes, sequelize} = require('../../dataSource');
const termNumberUpperLimit = require('../../constants').termConstraints.termNumberUpperLimit;
const termNumberLowerLimit = require('../../constants').termConstraints.termNumberLowerLimit;

// Creating the model
// See: https://sequelize.org/docs/v6/core-concepts/model-basics/

const Term = sequelize.define('Term', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  termNumber: {
    type: DataTypes.INTEGER,
    // Checking that term is between 1-6 inclusive
    validate: {
      // use a custom validator to get a custom message in the same format as the others
      customNumberNotNull(value) {
        if (!value && value !== 0) {
          throw new Error('Term number cannot be empty');
        }
      },
      min: {
        args: termNumberLowerLimit,
        msg: 'Term number must be between ' + termNumberLowerLimit + ' and ' + termNumberUpperLimit,
      },
      max: {
        args: termNumberUpperLimit,
        msg: 'Term number must be between ' + termNumberLowerLimit + ' and ' + termNumberUpperLimit,
      },
    },
  },
  startDate: {
    type: DataTypes.DATEONLY,
    validate: {
      // Checking that start date is valid based on term number
      customTermStartDates(value) {
        if (value === null || value === undefined || value === '') {
          throw new Error('Term start date cannot be empty');
        }
        // splitting the date into an array so we can access just the month
        // Group standard for dates will be 'YYYY-MM-DD'
        const dateArray = value.split('-');
        // Month will always be the second position following group standard
        const monthVal = dateArray[1];
        // validators for term 1 & 4 as they run the same time
        if (this.termNumber === 1 || this.termNumber === 4) {
          // Valid starting months are August and April
          if (monthVal === '08' || monthVal === '09') {
          } else {
            throw new Error('Term ' + this.termNumber + ' must start in August or September');
          }
        }
        // validators for term 2 & 5 as they run the same time
        if (this.termNumber === 2 || this.termNumber === 5) {
          // Valid starting month is January
          if (monthVal !== '01') {
            throw new Error('Term ' + this.termNumber + ' must start in January');
          }
        }
        // validators for term 3 & 6 as they run the same time
        if (this.termNumber === 3 || this.termNumber === 6) {
          // Valid starting month is May
          if (monthVal !== '05') {
            throw new Error('Term ' + this.termNumber + ' must start in May');
          }
        }
      },
    },
  },
  endDate: {
    type: DataTypes.DATEONLY,
    validate: {
      // custom validator that checks that the ending month is valid
      customEndDates(value) {
        if (value === null || value === undefined || value === '') {
          throw new Error('Term end date cannot be empty');
        }
        // splitting the date into an array so we can access just the month
        // Group standard for dates will be 'YYYY-MM-DD'
        const dateArray = value.split('-');
        // Month will always be the second position following group standard
        const monthVal = dateArray[1];
        // validators for term 1 & 4 as they run the same time
        if (this.termNumber === 1 || this.termNumber === 4) {
          // Valid ending month is December
          if (monthVal !== '12') {
            throw new Error('Term ' + this.termNumber + ' must end in December');
          }
        }
        // validators for term 2 & 5 as they run the same time
        if (this.termNumber === 2 || this.termNumber === 5) {
          // Valid ending month is April
          if (monthVal !== '04') {
            throw new Error('Term ' + this.termNumber + ' must end in April');
          }
        }
        // validators for term 3 & 6 as they run the same time
        if (this.termNumber === 3 || this.termNumber === 6) {
          // Valid ending months are May and June
          if (monthVal === '05' || monthVal === '06') {
          } else {
            throw new Error('Term ' + this.termNumber + ' must end in May or June');
          }
        }
      },
      // custom validator that checks that the start date is after the end date
      checkEndAfterStart(value) {
        // since this is already taken care of, don;t check for it here
        if (value === null || value === undefined || value === '') {
          return;
        }
        // Splitting the end and start dates into arrays, so that we can compare just on Month, Year, or Day
        // The group standard for dates are 'YYYY-MM-DD'
        const endDateArray = value.split('-');
        const startDateArray = this.startDate.split('-');

        // As all the month validators make sure the months do not overlap, we just need to make sure the year
        // of the end date is not before the year of the start date to make sure end date is after the start date
        if (startDateArray[0] > endDateArray[0]) {
          throw new Error('End date must be after start date');
        }
        // there is a special exception for term 3 and 6, as they can have start and end date in the same month (May)
        if (this.termNumber === 3 || this.termNumber === 6) {
          // Need to check that they are both ending in May
          if (startDateArray[1] === '05' && endDateArray[1] === '05') {
            // If they both end in May, compare the date
            if (startDateArray[2] >= endDateArray[2]) {
              throw new Error('End date must be after start date');
            }
          }
        }
      },
    },
  },
  year: {
    type: DataTypes.INTEGER,
    get() {
      if (this.termNumber >= 1 && this.termNumber <= 3) {
        return 1;
      } else if (this.termNumber >= 4 && this.termNumber <= 6) {
        return 2;
      } else {
        return 3;
      }
    },
  },
  calendarYear: {
    type: DataTypes.INTEGER,
    get() {
      const yearVal = +(this.startDate.split('-'))[0];
      if (this.termNumber == 1 || this.termNumber == 4) {
        return yearVal + '-' + (yearVal+1);
      } else {
        return (yearVal-1) + '-' + yearVal;
      }
    },
  },
},
);


module.exports = Term;
