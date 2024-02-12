const express = require('express');
const router = express.Router();

const CourseOffering = require('../private/javascript/CourseOffering');
const Timeslot = require('../private/javascript/Timeslot');
const Term = require('../private/javascript/Term');
const Program = require('../private/javascript/Program');
const {testConst} = require('../constants');
const defineDB = require('../fixtures/createTables.fix');

router.get('/', async (req, res, next) => {
    await defineDB(false);

    terms = await Term.findAll();
    programs = await Program.findAll();


    // formatting the time
    for (let i = 0; i < terms.length; i++) {
        const splitDate = terms[i].startDate.split('-');
        terms[i].title = splitDate[0] + '-' + terms[i].termNumber;
    }

    res.render('schedule', {
        getrequest: true, terms, programs,
    });
});

router.post('/', async (req, res, next) => {
    // reloading the models with associations

    // loads the db connection
    await defineDB(false);

    const groupArray = [];

    // constants
    const GROUP_LETTERS = ['A', 'B', 'C', 'D'];
    const DAYS = [0, 1, 2, 3, 4, 5];
    const TIMES = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'];
    const DISPLAY_TIMES = ['8:00', '9:00', '10:00', '11:00', '12:00', '1:00', '2:00', '3:00'];

    let timeslotArray = new Array(req.body.group);
    const groupLetters = new Array(req.body.group);

    // looping through each group object requested
    for (let i = 0; i < req.body.group; i++) {
        groupArray.push({
            timeslotMatrix: [[], [], [], [], [], [], [], []], // outer array is times, each inner array is days
            COArray: new Array(req.body.group), groupLetter: GROUP_LETTERS[i],
        });

        // Creating the 2D array with empty values
        for (t in TIMES) {
            for (d in DAYS) {
                let timeOb = null;
                if (d == 0) {
                    timeOb = DISPLAY_TIMES[t];
                }
                groupArray[i].timeslotMatrix[t][d] = {
                    hasObj: false, cellID: t + '-' + d + '-' + GROUP_LETTERS[i], // dynamic id
                    timeslot: timeOb, // always empty except for time column
                };
            }
        }

        try {
            // fetch all timeslots that match filters
            timeslotArray = await Timeslot.findAll({
                where: {
                    group: GROUP_LETTERS[i], ProgramId: req.body.program, TermId: req.body.term,
                },
            });
            // fetch all course offerings that match filters
            groupArray[i].COArray = await CourseOffering.findAll({
                where: {
                    group: GROUP_LETTERS[i], ProgramId: req.body.program, TermId: req.body.term,
                },
            });

            // getting each course offering for this group
            for (let k = 0; k < groupArray[i].COArray.length; k++) {
                const insObj = await groupArray[i].COArray[k].getInstructor();
                groupArray[i].COArray[k].insFirst = insObj.firstName;
                groupArray[i].COArray[k].insLast = insObj.lastName;
            }
        } catch (error) {

        }



        // mapping each timeslot in this group to the matrix
        for (const tSlot of timeslotArray) {
            // const formattedTSlot = await formatCellInfo(tSlot);
            coObj = await tSlot.getCourseOffering();
            prObj = await tSlot.getProgram();
            insObj = await tSlot.getInstructor();
            cObj = await coObj.getCourse();

            tSlot.program = prObj.programAbbreviation;
            tSlot.insLast = insObj.lastName;

            tSlot.course = cObj.courseCode;
            tSlot.co = coObj;

            groupArray[i].timeslotMatrix[TIMES.indexOf(tSlot.startTime)][tSlot.day].timeslot = tSlot;// outer array is days, each inner array is times
        }
        groupLetters[i] = GROUP_LETTERS[i];
    }


    res.render('schedule', {
        groups: groupLetters, groupArray, DAYS, TIMES,
    });
});


router.put('/', async (req, res, next) => {
    const TIMES = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'];


    //[day, time, group]
    const cellID = req.body.idCell.split('-');
    const CO = req.body.CO;

    const newtSlot = {
        startDate: CO.startDate,
        endDate: CO.endDate,
        CourseOfferingId: CO.id,
        InstructorId: CO.InstructorId,
        ClassroomId: 1,
        TermId: CO.TermId,
        ProgramId: CO.ProgramId,
        startTime: '08:00',
        endTime: '09:00',
        day: 1,
        group: coObj1.group,
    };

    res.render('schedule', {
        getrequest: true, terms, programs,
    });
});


router.delete('/', async (req, res, next) => {


    await defineDB(false);

    terms = await Term.findAll();
    programs = await Program.findAll();


    // formatting the time
    for (let i = 0; i < terms.length; i++) {
        const splitDate = terms[i].startDate.split('-');
        terms[i].title = splitDate[0] + '-' + terms[i].termNumber;
    }

    res.render('schedule', {
        getrequest: true, terms, programs,
    });
});

// formatting each timeslot for easier displaying
async function formatCellInfo(tSlot) {
    coObj = await tSlot.getCourseOffering();
    prObj = await tSlot.getProgram();
    insObj = await tSlot.getInstructor();
    cObj = await coObj.getCourse();

    return prObj.programAbbreviation + '\n' + cObj.courseCode + '\n' + insObj.lastName;
}


/**
 *  This function will handle the schedule changes.
 * @param saveArray - This array will contain the edit schedule timeslots to save to the database
 * @param deleteArray - This array will contain the timeslots to delete from the database
 */
async function handleScheduleSave(saveArray, deleteArray) {
}


module.exports = router;
