const {Sequelize, DataTypes} = require('sequelize');
const {static} = require('express');

let connectionString;
connectionString = 'sqlite:./private/database';
if (process.env.TESTING_MODE==='testing') {
  connectionString = 'sqlite:memory:';
}
// connectionString = 'sqlite:memory:';
const sequelize = new Sequelize(connectionString);


function Memory()
{
  connectionString = 'sqlite:memory:';
}

function Database()
{

}



module.exports = {Sequelize, DataTypes, sequelize};
