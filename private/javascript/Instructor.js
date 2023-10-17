const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../database/database.sqlite'
});

//Database constructor for Instructor
const Instructor = sequelize.define('Instructor', {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: 'Exception "First Name cannot be empty"',
                },
                len: {
                    args: [1, 50],
                    msg: 'Exception "First Name cannot be more than 50 characters"',
                },
            },
        },
        lastName: {
            type: DataTypes.STRING
        },
    },
    {
        tableName: 'Instructor'
    });

function getAllInstructors() {

}

module.exports = Instructor;