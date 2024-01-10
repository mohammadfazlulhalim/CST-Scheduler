const express = require('express');
const router = express.Router();
const {sequelize} = require('../dataSource');

router.get('/classroomReport', (req, res, next) => {
});
router.post('/classroomReport', (req, res, next) => {
});

function generateClassroom(startDate, endDate, classroom) {}


module.exports = router;
