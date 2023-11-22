const {Sequelize, DataTypes} = require('sequelize');
const Associations = require('/private/javascript/Associations');

let connectionString;
connectionString = 'sqlite:./private/database/scheduler.db';
if (process.env.TESTING_MODE==='testing') {
  connectionString = 'sqlite::memory:';
}

const sequelize = new Sequelize(connectionString);


module.exports = {Sequelize, DataTypes, sequelize};
