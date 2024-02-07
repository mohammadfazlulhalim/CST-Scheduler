const {Sequelize, DataTypes, Op} = require('sequelize');

let connectionString;
connectionString = 'sqlite:./private/database/scheduler.db';
if (process.env.TESTING_MODE==='testing') {
  connectionString = 'sqlite::memory:';
}

if (process.env.TESTING_MODE==='cypress') {
  connectionString = 'sqlite:./private/database/dev.db';
}

const sequelize = new Sequelize(connectionString, {logging: false});


module.exports = {Sequelize, DataTypes, sequelize, Op};
