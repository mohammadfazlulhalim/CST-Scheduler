
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
        courses = await Course.findAll({
            attributes: ['courseCode', 'courseName', 'courseNumCredits', 'courseNumHours'],
            order: [['courseName', 'ASC']],
        });
        console.log(`COURSES: \n ${courses}`);
    } catch (error) {
        console.log(`courses is undefined`);
        courses = undefined;
    }

    res.render('course', {
        title: 'List of Courses',
        courses,
    });
}

module.exports = router;
