const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../database/database.sqlite'
});



// const InstrucorList = await sequelize.g

const Instructor = sequelize.define('Instructor', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// sequelize.sync() // pass stuff in here to make it drop?
//     .then(() => {
//         console.log('Database synchronized');
//     })
//     .catch((error) => {
//         console.error('Error synchronizing database:', error);
//     });
//
// const me = Instructor.create({firstName: 'Mason', lastName:'Rayburn'});
//
// me.then((instructor) => {
//     console.log(instructor.firstName);
// }).catch((error) => {
//     console.error('Error creating Instructor:', error);
// });

