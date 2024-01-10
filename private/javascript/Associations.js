const Course = require('../../private/javascript/Course');
const Term = require('../../private/javascript/Term');
const Instructor = require('../../private/javascript/Instructor');
const Program = require('../../private/javascript/Program');
const CourseOffering = require('../../private/javascript/CourseOffering');

addAssociations = () => {
    // Course offering associations:
    Term.hasMany(CourseOffering, {as:'courseOfferings', foreignKey: 'termID'});
    Course.hasMany(CourseOffering, {as:'courseOfferings', foreignKey: 'courseID'});
    Instructor.hasMany(CourseOffering, {as:'courseOfferings', foreignKey: 'instructorID'});
    Program.hasMany(CourseOffering), {as:'courseOfferings', foreignKey: 'programID'};

    CourseOffering.belongsTo(Term, {foreignKey: 'termID'});
    CourseOffering.belongsTo(Course, {foreignKey: 'courseID'});
    CourseOffering.belongsTo(Instructor, {foreignKey: 'instructorID'});
    CourseOffering.belongsTo(Program, {foreignKey: 'programID'});

    // Timeslot associations:

};



//This exports all the updated models
module.exports = {addAssociations};

