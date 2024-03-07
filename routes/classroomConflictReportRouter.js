const express= require('express');
const router = express.Router();
const {sequelize, Op} = require("../dataSource");

const Timeslot= require('../private/javascript/Timeslot');
const Classroom= require('../private/javascript/Classroom');

const timeslot = require("../private/javascript/Timeslot");
const {QueryTypes} = require("sequelize");

/**
 * Post Handler for classroom conflict report router
 * @param req
 * @param res
 * @param next
 */
router.post('/', async (req, res, next)=>{
    const headerArray=[{header:'Term'}, {header:'Course Code'}, {header:'Weekday'}, {header:'Start Time'}, {header:'End Time'}, {header:'Instructor'}];

    //Sequelize will automatically perform an SQL query to the database and create a table
    await sequelize.sync();
    const realClassroom = await Classroom.findOne({where: {id: req.body.classroom}});
    const timeSlots= await checkForConflict(realClassroom)

    console.log(">>>>>classrooms");
    console.log(realClassroom);



    res.render('test',{
        routerPost: true,
        realClassroom,
        headerArray
    });
});

/**
 * Get Handler for classroom conflict report router
 * @param req
 * @param res
 * @param next
 */
router.get('/', async (req, res, next)=>{
    const classrooms= await Classroom.findAll({order: [['roomNumber', 'ASC']]});

    res.render('test',{
        classrooms,
        showModal: true,
    });
});


/**
 * This function helps to finding and collecting  timeslots which
 * are experiencing class conflicts
 * @param classroom   is an instance of Classroom object
 */
async function checkForConflict(classroom) {




}

/**
 * this function will retrieve the unique time period against provided classroom object
 * @returns {Promise<object[]>}
 */
async function uniqueTime (){
    const sqlstatement = `SELECT DISTINCT Time
                        FROM (
                            SELECT startTime  AS Time FROM timeslots where ClassroomId = ${classroom.id}
                            UNION
                            SELECT endTime AS Time FROM timeslots where ClassroomId = ${classroom.id}
                            ) AS combined_times
                        `;

    try {
        return await sequelize.query(sqlstatement, {
            type: QueryTypes.SELECT,
        });
    } catch (e) {
        console.log(e);
    }
}



module.exports = {router, checkForConflict};