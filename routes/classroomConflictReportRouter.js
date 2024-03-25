const express= require('express');
const router = express.Router();
const {sequelize, Op} = require('../dataSource');

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

  const headerArray=[{header: 'Term'}, {header: 'Course Code'}, {header: 'Weekday'}, {header: 'Start Time'}, {header: 'End Time'}, {header: 'Instructor'}, {header: 'Program'}];

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

    // // imagining
    // let timeslotsForCurrentDay = [];
    //
    // // O n^2 algo attempt
    // // processing each timeslot in the initial timeslot list for conflicts
    // for (let j = 0; j < initialTimeslotsForTermClassroomWeekday.length; j++) {
    //   let currTimeslot = initialTimeslotsForTermClassroomWeekday[j];
    //
    //
    // }


    if (initialTimeslotsForTermClassroomWeekday.length>0) {
      // - try out one of the O(n^2) algorithms later to detect conflicts on all timeslots.
      // first timeslot in list
      const currentTimeslot = initialTimeslotsForTermClassroomWeekday[0];


      try {
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
                  [Op.and]: {
                    endTime: {
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
            ]},
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
          conflictingTimeslots0.push(conflictingTimeslotsNow);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }

  // return classResult;
  return conflictingTimeslots0;
}


module.exports = {router, generateTimeslotsTest: generateTimeslots};
