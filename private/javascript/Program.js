/**
 * This file describes/defines what the object of Program is allowed to be.- Christeen Shlimoon
 */
const {sequelize, DataTypes} = require('../../dataSource');

// This is defining the program object
const Program = sequelize.define('Program', {
  // The program object has the following attributes
  // programAbbreviation is a string that should shorten the programs name
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  programAbbreviation: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true, // Enforce uniqueness for programAbbreviation
    // validations for programAbbreviation
    validate: {

      // the abbr cannot be null
      notNull: {
        args: false,
        msg: 'The programs abbreviation is required',
      },
      // the abbr must be alpha characters
      isAlpha: {
        args: true,
        msg: 'The programs abbreviation must be alphabetical',
      },

      // the abbr must be all uppercase
      isUppercase: {
        args: true,
        msg: 'The programs abbreviation must be uppercase',
      },

      // the abbr can range from 2 - 10 characters in length
      len: {
        args: [2, 10],
        msg: 'The programs abbreviation length ranges from 2-10',
      },

      // the abbr follows the form of any letters from A-Z (upper case) that's lenght is 2 - 10
      is: {
        args: /^[A-Z]{2,10}$/i,
        msg: 'The programs abbreviation is written with uppercase alphabetical characters ranging from lengths 2-10.',
      },
    },
  },
  // Program name is a string to desribe the title of the program
  programName: {
    type: DataTypes.STRING(50),
    allowNull: false,
    // validations for programName
    validate: {
      // the length for a name must be 2 - 50 characters
      len: {
        args: [2, 50],
        msg: 'The programs name length ranges from 2-50',
      },
      // the name must be written with alphabitcal names only
      // isAlpha: {
      //   args: true,
      //   msg: 'The programs name must be alphabetical',
      // },
      // the name follows the form of mix of capital and lower case letters ranging from 2 - 50 characters in length
      is: {
        args: /^[a-zA-Z\s]{2,50}$/i,
        msg: 'The programs name is written with alphabetical characters ranging from lengths 2-50.',
      },
      // the name cannot be null
      notNull: {
        args: false,
        msg: 'The programs name is required',
      },
    },

  },
},


{
  // where all program objects will be stored is the table Program
  tableName: 'Program',
});
module.exports=Program;
