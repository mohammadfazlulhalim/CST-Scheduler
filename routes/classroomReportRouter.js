const express = require('express');
const router = express.Router();
const term = require('../private/javascript/Term');
const classroom = require('../private/javascript/Classroom');
const timeslot = require('../private/javascript/Timeslot');

router.get('/', async (req, res, next) => {
  const termList = await term.findAll({order: [['termNumber', 'ASC'], ['startDate', 'DESC']]});
  const classrooms = await classroom.findAll({order: [['roomNumber', 'ASC']]});

  // Adding the year to the terms
  const newTermList= termList.map((item)=>{
    return {id: item.id, displayTerm: item.startDate.substring(0, 4)+' - '+item.termNumber};
  });

  res.render('classroomReport', {
    routerPost: false,
    title: 'Classroom Report',
    newTermList,
    classrooms,
    showModal: true,
  });
});
router.post('/', async (req, res, next) => {
  const dateGenerated= new Date();

  const realTerm = await term.findOne({where: {id: req.body.term}});
  const realClassroom = await classroom.findOne({where: {id: req.body.classroom}});

  const TimeSlots = await generateSchedule(realTerm.startDate, realTerm.endDate, realClassroom);

  const hasTimeSlots = TimeSlots.length >0;
  let ScheduleArray;
  const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const TIMES = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'];

  if (hasTimeSlots) {
    ScheduleArray = Array.from({length: 8}, () => Array(5));

    for (let i = 0; i < ScheduleArray.length; i++) {
      for (let j = 0; j < ScheduleArray[i].length; j++) {
        ScheduleArray[i][j] = null;
      }
    }

    for (const ts of TimeSlots) {
      const currentCourseOffering = await ts.getCourseOffering();
      const currentInstructorOffering = await ts.getInstructor();
      const currentCourse= await currentCourseOffering.getCourse();

      ScheduleArray[TIMES.indexOf(ts.startTime)][ts.day -1] =
        {timeSlot: ts,
          courseOffering: currentCourseOffering,
          course: currentCourse,
          Instructor: currentInstructorOffering,
        };
    }
  }

  res.render('classroomReport', {
    dateGen: dateGenerated.getFullYear()+'-'+dateGenerated.getMonth()+'-'+dateGenerated.getDate(),
    routerPost: true,
    realTerm,
    ScheduleArray,
    TIMES,
    realClassroom,
    DAYS,
    hasTimeSlots,
  });
});

/*

 */
function generateSchedule(startDate, endDate, classroom) {
  return timeslot.findAll({
    where: {startDate, endDate, ClassroomId: classroom.id},
  });
}

module.exports = {router};
