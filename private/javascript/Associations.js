const Course = require('../../private/javascript/Course');
const Term = require('../../private/javascript/Term');
const Instructor = require('../../private/javascript/Instructor');
const Program = require('../../private/javascript/Program');
const CourseOffering = require('../../private/javascript/CourseOffering');
const Timeslot = require('../../private/javascript/Timeslot');
const Classroom = require('../../private/javascript/Classroom');

function addAssociations() {
  Term.hasMany(CourseOffering);
  Term.hasMany(Timeslot);

  Course.hasMany(CourseOffering);

  Instructor.hasMany(CourseOffering);
  Instructor.hasMany(Timeslot);

  Program.hasMany(CourseOffering);
  Program.hasMany(Timeslot);

  Classroom.hasMany(Timeslot);


  Timeslot.belongsTo(Instructor);
  Timeslot.belongsTo(Classroom);
  Timeslot.belongsTo(CourseOffering);
  Timeslot.belongsTo(Program);
  Timeslot.belongsTo(Term);

  CourseOffering.hasMany(Timeslot);
  CourseOffering.hasMany(Instructor);
  CourseOffering.belongsTo(Term);
  CourseOffering.belongsTo(Course);
  CourseOffering.belongsTo(Program);
};


// This exports all the updated models
module.exports = {addAssociations};

