const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize('sqlite:./private/database/scheduler.db');
// const sequelizeTesting = new Sequelize('sqlite::memory:');
const sequelizeTesting = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:',
});
module.exports = {Sequelize, DataTypes, sequelize, sequelizeTesting};
