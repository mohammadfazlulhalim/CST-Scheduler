const Course = require('../../private/javascript/Course');
const Term = require('../../private/javascript/Term');
const Instructor = require('../../private/javascript/Instructor');
const Program = require('../../private/javascript/Program');
const CourseOffering = require('../../private/javascript/CourseOffering');

addAssociations = () => {
    Term.hasMany(CourseOffering, {as:'courseOfferings', foreignKey: 'termID'});
    Course.hasMany(CourseOffering);
    Instructor.hasMany(CourseOffering);
    Program.hasMany(CourseOffering);

    CourseOffering.belongsTo(Term, {foreignKey: 'termID'});
    CourseOffering.belongsTo(Course);
    CourseOffering.belongsTo(Instructor);
    CourseOffering.belongsTo(Program);
};



//This exports all the updated models
module.exports = {addAssociations};

