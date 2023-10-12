// Documentation for sequelize: https://sequelize.org/

const {Sequelize, DataTypes} = require ('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: '/private/database',
  // instead of using persistent storage, going to try using the in memory syntax provided on sequelize docs
  // 'sqlite::memory'
});

// Creating the model
// See: https://sequelize.org/docs/v6/core-concepts/model-basics/
const Term = sequelize.define('Term', {
  startDate: {
    type: DataTypes.DATEONLY,
      validate: {

      }
    //Here is where I can put my validators
    // https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
  },
  endDate: {
    type: DataTypes.DATEONLY,
      validate: {

      }
    //add validators
    // https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
  },
  termNumber: {
    type: DataTypes.INTEGER,
      validate: {

      }
    // https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
  }
});

// Will retrieve all items from the database
Term.retrieveList = async function()
{

}

// Now need to keep it in sync with the database
sequelize.sync()
    .then(() => {
      console.log('Term table created');
    })
    .catch((err) => {
      console.error('Error creating Term table:', err);
    });

module.exports = Term;
