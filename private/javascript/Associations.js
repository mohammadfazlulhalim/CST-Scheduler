const Course = require('../../private/javascript/Course');
const Term = require('../../private/javascript/Term');
const Instructor = require('../../private/javascript/Instructor');
const Program = require('../../private/javascript/Program');
const CourseOffering = require('../../private/javascript/CourseOffering');


CourseOffering.belongsTo(Course);
CourseOffering.belongsTo(Term);
CourseOffering.belongsTo(Instructor);
CourseOffering.belongsTo(Program);

Term.hasMany(CourseOffering);
Course.hasMany(CourseOffering);
Instructor.hasMany(CourseOffering);
Program.hasMany(CourseOffering);

