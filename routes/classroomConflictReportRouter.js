const express= require('express');
const router = express.Router();
const {sequelize, Op} = require('../dataSource');

const Classroom= require('../private/javascript/Classroom');

const Timeslot = require('../private/javascript/Timeslot');
const {QueryTypes} = require('sequelize');

/**
 * Post Handler for classroom conflict report router
 * @param req
 * @param res
 * @param next
 */
router.post('/', async (req, res, next)=>{
  const headerArray=[{header: 'Term'}, {header: 'Course Code'}, {header: 'Weekday'}, {header: 'Start Time'}, {header: 'End Time'}, {header: 'Instructor'}];

  // Sequelize will automatically perform an SQL query to the database and create a table
  await sequelize.sync();
  const realClassroom = await Classroom.findOne({where: {id: req.body.classroom}});
  const timeSlots= await checkForConflict(realClassroom);

  console.log('>>>>>classrooms');
  console.log(realClassroom);


  res.render('test', {
    routerPost: true,
    realClassroom,
    headerArray,
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

  const timeslotsInConflict = await checkForConflict(classrooms[0]);

  res.render('classroomConflictsReport', {
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
  const timeVals = await uniqueTime(classroom);

  const timeslotsVals = await generateTimeslots(timeVals[0], timeVals[1], classroom);

}

/**
 * this function will retrieve the unique time period against provided classroom object
 * @return {Promise<object[]>}
 */
async function uniqueTime(classroom) {
  const sqlstatement = `SELECT DISTINCT Time
                        FROM (
                            SELECT startTime  AS Time FROM timeslots where ClassroomId = ${classroom.id}
                            UNION
                            SELECT endTime AS Time FROM timeslots where ClassroomId = ${classroom.id}
                            ) AS combined_times
                        `;

  try {
    const timeValsUnsorted = await sequelize.query(sqlstatement, {
      type: QueryTypes.SELECT,
    });

    for (let i = 0; i < timeValsUnsorted.length; i++) {
      // if the time is a single digit hour like 8:00am etc.
      // i.e. it looks like H:mm
      if (timeValsUnsorted[i].length < 5) {
        timeValsUnsorted[i] = '0' + timeValsUnsorted[i]
      }
    }
    return timeValsUnsorted;
  } catch (e) {
    console.log(e);
  }
}

/**
 *
 *
 * @param startDate
 * @param endDate
 * @param startTime
 * @param endTime
 * @param classroom
 */
async function generateTimeslots(startTime, endTime, classroom) {
  return await Timeslot.findAll({
    where: {
      [Op.and]: [
        // Timeslot starts before the endDate of the range
        {startTime: {[Op.lt]: endTime.Time}},
        // Timeslot ends after the startDate of the range
        {endTime: {[Op.gt]: startTime.Time}},
      ],
      ClassroomId: classroom.id,
    },
    order: [['startDate', 'ASC']],
  });
}


async function generateTimeslotsTest(classroom){

  const sqlStatement =`SELECT Timeslots.id,Timeslots.startTime, Timeslots.endTime, Timeslots.day, Timeslots.CourseOfferingId, COUNT (*) AS frequency 
                               FROM Timeslots
                               INNER JOIN Classroom
                               ON Timeslots.classroomId = ${classroom.id}
                               GROUP BY Timeslots.day
                               HAVING COUNT(*) > 1`;

  try {
    const classResult = await sequelize.query(sqlStatement, {
      type: QueryTypes.SELECT,
    });

    return classResult;
  } catch (e) {
    console.log(e);
  }

}


module.exports = {router, checkForConflict, generateTimeslotsTest};
