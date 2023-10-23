const {Sequelize, DataTypes} = require('sequelize');

let connectionString;
connectionString = 'sqlite:./private/database/scheduler.db';
if (process.env.TESTING_MODE==='testing') {
  connectionString = 'sqlite:memory:';
}

const sequelize = new Sequelize(connectionString);

module.exports = {Sequelize, DataTypes, sequelize};
