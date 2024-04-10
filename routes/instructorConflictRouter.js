const express= require('express');
const router = express.Router();
const {sequelize, Op, DataTypes} = require('../dataSource');

const Timeslot = require('../private/javascript/Timeslot');
const Instructor = require('../private/javascript/Instructor');

/**
 * The handler when the user selects the term
 * @param req
 * @param res
 * @param next
 */
router.get('/instructorConflict');

router.post('/instructorConflict');

/**
 * function that would return a list of timeslots with associated instructors that have conflicts.
 * @return {Promise<Object[]>}
 * @param timeslotList - List of timeslots that have the selected term
 * @param instructorList - List of all instructors
 */
getConflicts(timeslotList, instructorList);

module.exports = {router};
