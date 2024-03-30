const express= require('express');
const router = express.Router();
const {sequelize, Op, DataTypes} = require('../dataSource');

const Instructor= require('../private/javascript/Instructor');
const Classroom= require('../private/javascript/Classroom');
const CourseOffering= require('../private/javascript/CourseOffering');
const Course= require('../private/javascript/Course');
const Program= require('../private/javascript/Program');
const Term=require('../private/javascript/Term');
const Timeslot = require('../private/javascript/Timeslot');
const {QueryTypes} = require('sequelize');

const term = require('../private/javascript/Term');
const {stack} = require('sequelize/lib/utils');
const {timeSlot1} = require("../fixtures/Timeslot.fix");

// this is a quick array for designating weekdays as numbers
// 0 is Sunday --> 6 is Saturday
const daysNumberedZeroIndex = [0, 1, 2, 3, 4, 5, 6];


/**
 * Post Handler for classroom conflict report router
 * @param req
 * @param res
 * @param next
 */
router.post('/', async (req, res, next)=>{
  const classrooms= await Classroom.findAll({order: [['roomNumber', 'ASC']]});
  const terms= await Term.findAll({order: [['termNumber', 'ASC'], ['startDate', 'ASC']]});

  const headerArray=[ {header: 'Term'},{header: 'Course Code'},{header: 'Weekday'}, {header: 'Start Time'}, {header: 'End Time'}, {header: 'Instructor'}, {header: 'Program'}];

  // Sequelize will automatically perform an SQL query to the database and create a table
  await sequelize.sync();
  const realClassroom = await Classroom.findOne({where: {id: req.body.classroom}});
  const realTerm = await term.findOne({where: {id: req.body.term}});
  // assign the final output of conflicting timeslots as an array of objects to timeslotsReturned
  const timeslotsReturned = await generateTimeslots(realClassroom, realTerm);


  res.render('classroomConflictReport', {
    routerPost: true,
    realClassroom,
    realTerm,
    headerArray,
    timeslotsReturned,
    classrooms,
    terms,
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

  const terms= await Term.findAll({order: [['termNumber', 'ASC'], ['startDate', 'ASC']]});

  res.render('classroomConflictReport', {
    classrooms,
    terms,
    showModal: true,
  });
});


/**
 * New function for collecting timeslots with conflicts
 * @return {Promise<Object[]>}
 * @param classroom
 * @param term
 */
async function generateTimeslots(classroom, term) {
  // gather timeslots using Operators provided by Op class - will add onto it later

  const conflictingTimeslots0 = [];
  for (let i = 0; i < daysNumberedZeroIndex.length; i++) {
    let count = 0;
    const initialTimeslotsForTermClassroomWeekday = await Timeslot.findAll({
      where: {
        [Op.and]: [
          {TermId: term.id},
          {ClassroomId: classroom.id},
          {day: daysNumberedZeroIndex[i]},
        ],
      },
      order: [['startTime', 'ASC'], ['day', 'ASC']],


    });


    if (initialTimeslotsForTermClassroomWeekday.length > 0) {
      // - try out one of the O(n^2) algorithms later to detect conflicts on all timeslots.
     for (let j = 0; j < initialTimeslotsForTermClassroomWeekday.length; j++) {
        let currentTimeslot = initialTimeslotsForTermClassroomWeekday[j];
        let count = 0;


        const conflictingTimeslotsNow = await Timeslot.findAll({
          where: {
            [Op.and]: [

              {TermId: term.id},
              {ClassroomId: classroom.id},
              {day: daysNumberedZeroIndex[i]},


              // OR block
              {
                // either the start time conflicts
                [Op.or]: {
                  startTime: {
                    [Op.and]: {
                      [Op.gte]: currentTimeslot.startTime,
                      [Op.lt]: currentTimeslot.endTime,
                    },
                  },
                  // or the end time conflicts
                  endTime: {
                    [Op.and]: {
                      [Op.gt]: currentTimeslot.startTime,
                      [Op.lte]: currentTimeslot.endTime,
                    },
                  },

                },
              },
              // OR block
              {
                [Op.or]: {
                  startDate: {
                    [Op.and]: {
                      [Op.gte]: currentTimeslot.startDate,
                      [Op.lt]: currentTimeslot.endDate,
                    },
                  },
                  endDate: {
                    [Op.and]: {
                      [Op.gt]: currentTimeslot.startDate,
                      [Op.lte]: currentTimeslot.endDate,
                    },
                  },
                },
              },
            ]
          },
          include: [
            {
              model: CourseOffering,
              include: Course,
            },
            {
              model: Instructor,
            },
            {
              model: Term,
            },
            {
              model: Classroom,
            },
            {
              model: Program,
            },
          ],

          order: [['startTime', 'ASC'], ['day', 'ASC']],

        });

        if (conflictingTimeslotsNow.length > 1) {
          if (conflictingTimeslots0.length >0) {
              if (searchObj(conflictingTimeslots0[conflictingTimeslots0.length-1], conflictingTimeslotsNow)===false){
                  conflictingTimeslots0.push(conflictingTimeslotsNow);
                  count++;
                }


          }else{
            conflictingTimeslots0.push(conflictingTimeslotsNow);
            count++;}

        }

      }
    }

    }

  // return classResult;
  return conflictingTimeslots0;

}

/**
 * Helper function to determine common object available on the 2nd array
 * @param objArray1
 * @param objArray2
 * @returns {boolean}
 */
function searchObj(objArray1, objArray2) {
  let found = false;

  for (let i = 0; i < objArray1.length; i++) {
    const obj1 = objArray1[i]
    if (objArray2.some(obj2=> obj2.id === obj1.id)) {
      found = true;

      break;
    }

  }
  return found;
}



module.exports = {router, generateTimeslotsTest: generateTimeslots,searchObj };
