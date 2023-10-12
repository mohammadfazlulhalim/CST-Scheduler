const SequelizeInst = require('sequelize');
const sqlite = require('sqlite3');
const {DataTypes} = require('sequelize');

const sequelize = new SequelizeInst('sqlite:./database');

try {
  sequelize.authenticate().then(() => console.log('Connection has been established successfully.'));

} catch (error) {
  console.error('Unable to connect to the database:', error);
}

const User = sequelize.define('User', {
  username: DataTypes.STRING,
  birthday: DataTypes.DATE,
});

console.log(User === sequelize.models.User);
