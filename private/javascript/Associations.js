const Course = require('../../private/javascript/Course');
const Term = require('../../private/javascript/Term');
const Instructor = require('../../private/javascript/Instructor');
const Program = require('../../private/javascript/Program');
const CourseOffering = require('../../private/javascript/CourseOffering');
const Classroom = require('../../private/javascript/Classroom');
const Timeslot = require('../../private/javascript/Timeslot');

addAssociations = () => {
  Course.belongsTo(Instructor); // Default Instructor
  // Course offering associations:
  Term.hasMany(CourseOffering);
  Course.hasMany(CourseOffering, {foreignKey: {allowNull: false}});
  Instructor.hasMany(CourseOffering);
  Program.hasMany(CourseOffering);

  CourseOffering.belongsTo(Term);
  CourseOffering.belongsTo(Course);
  CourseOffering.belongsTo(Instructor, {foreignKey: {name: 'primaryInstructor'}});
  CourseOffering.belongsTo(Instructor, {foreignKey: {name: 'alternativeInstructor'}});
  CourseOffering.belongsTo(Program);

  // Timeslot associations:
  Term.hasMany(Timeslot);
  CourseOffering.hasMany(Timeslot);
  Instructor.hasMany(Timeslot);
  Program.hasMany(Timeslot);
  Classroom.hasMany(Timeslot);

  Timeslot.belongsTo(Term);
  Timeslot.belongsTo(CourseOffering);
  Timeslot.belongsTo(Instructor, {foreignKey: {name: 'primaryInstructor'}});
  Timeslot.belongsTo(Instructor, {foreignKey: {name: 'alternativeInstructor'}});
  Timeslot.belongsTo(Program);
  Timeslot.belongsTo(Classroom);
};


module.exports = {addAssociations};
