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

  // const timeslotsInConflict = await checkForConflict(classrooms[0]);

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
// async function checkForConflict(classroom) {
//
//   const timeslotsVals = await generateTimeslots(timeVals[0], timeVals[1], classroom);
//
// }

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

      // if length of the time val is less than 5 (equal to 4), then it's written as H:mm
      if (timeValsUnsorted[i].Time.length < 5) {
        timeValsUnsorted[i].Time = `0${timeValsUnsorted[i].Time}`;
      }
    }

    timeValsUnsorted.sort(compareTime);
    return timeValsUnsorted;
  } catch (e) {
    console.log(e);
  }
}

/**
 * Helper / handler for comparing two temporary objects in the unique time values array
 * for the purposes of sorting
 *
 * a and b objects looks like {Time:"10:00"} for example
 *
 *
 * @param a
 * @param b
 * @returns {number}
 */
function compareTime(a, b) {
  // Use toUpperCase() to ignore character casing
  const bandA = a.Time.toUpperCase();
  const bandB = b.Time.toUpperCase();

  let comparison = 0;
  if (bandA > bandB) {
    comparison = 1;
  } else if (bandA < bandB) {
    comparison = -1;
  }
  return comparison;
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


/**
 * New function for collecting timeslots with conflicts
 * @param classroom
 * @returns {Promise<Object[]>}
 */
async function generateTimeslotsTest(classroom) {

  const timeVals = await uniqueTime(classroom);



  const sqlStatement =`SELECT Timeslots.id,Timeslots.startTime, Timeslots.endTime, Timeslots.day, Timeslots.CourseOfferingId, COUNT (*) AS frequency 
                               FROM Timeslots
                               INNER JOIN Classroom
                               ON Timeslots.classroomId = ${classroom.id}
                               GROUP BY Timeslots.day
                               HAVING COUNT(*) > 1`;

  let redundantObject;

  try {
    redundantObject = await  sequelize.query(sqlStatement, {type: QueryTypes.SELECT,});

  }catch(err){
    console.log(err);
  }
  console.log(">>>>>>>WE ARE HERE redundantObject")
console.log(redundantObject);


  // for every unique range of time

  let sqlStatement2;
  let classResult=[];
  for ( let i = 0; i< redundantObject.length; i++) {
    sqlStatement2 = `
    SELECT Timeslots.id,Timeslots.startTime, Timeslots.endTime, Timeslots.day, Timeslots.CourseOfferingId
    FROM Timeslots
    WHERE Timeslots.ClassroomId = ${classroom.id} AND Timeslots.startTime = '${redundantObject[i].startTime}' 
    AND Timeslots.endTime = '${redundantObject[i].endTime}' 
    AND Timeslots.day = '${redundantObject[i].day}'
    AND Timeslots.startTime
`;
    try {
      classResult.push( await sequelize.query(sqlStatement2, {
        type: QueryTypes.SELECT,
       }));

    } catch (e) {
      console.log(e);
    }


  }

  return classResult;




}


module.exports = {router,  generateTimeslotsTest};
