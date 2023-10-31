
const Course = require('../private/javascript/Course');

const express = require('express');
const router = express.Router();

/* course page. */
router.get('/', getHandler);

/**
 * // separate GET Handler for http://localhost:3000/courses
 * @param {*} req request
 * @param {*} res response
 * @param {*} next next
 */
async function getHandler(req, res, next) {
    let courses;
    try {
        // read the whole table from scheduler.db -
        courses = await Course.findAll({
            attributes: ['courseCode', 'courseName', 'courseNumCredits', 'courseNumHoursPerWeek'],
            order: [['courseName', 'ASC']],
        });
        console.log(`COURSES: \n ${courses}`);
    } catch (error) {
        console.log(`courses is undefined`);
        // send courses=undefined to course.hbs which will then not show a table
        courses = undefined;
    }
    
    res.render('course', {
        title: 'List of Courses',
        courses,
    });
}

module.exports = router;
