const express = require('express');
const router = express.Router();
const termMethods = require('../private/javascript/termMethods')
const Instructor = require('../private/javascript/Instructor');
const Timeslot = require('../private/javascript/Timeslot');
const title = require('../constants').pageTitles.instructorHoursReport;


router.get('/', async function(req, res, next) {
  const termList = await termMethods.reduceTermsToSeason();

  const instructorList = await Instructor.findAll({order: ['lastName']});
  for (let i=0; i<instructorList.length; i++) {
    instructorList[i].primaryHours = 0;
    instructorList[i].alternativeHours = 0;
    instructorList[i].totalHours = 0;
  }

  res.render('instructorHoursReport', {
    title,
    modal: true,
    termList,
    instructorList
  });
});

router.post('/', async function(req, res, next) {
  // Splitting the four values by the '_' calendarYear_season_startDate_endDate
  const termSelectArray = req.body.termSelect.split('_');
  // taking the array and creating an object literal
  const simpleTermObj = {season: termSelectArray[0], calendarYear: termSelectArray[1], startDate: termSelectArray[2], endDate: termSelectArray[3]};
  const termList = await termMethods.getTermsFromYearSeason(simpleTermObj);
  const instructorList =await calculateHours(termList);

  res.render('instructorHoursReport', {
    title,
    termSelected: simpleTermObj,
    instructorList,
  });
});



/**
 *
 * @param termList
 * @returns {Promise<Model<any, TModelAttributes>[]>}
 */
async function calculateHours(termList) {
  const instructorList = await Instructor.findAll({order: ['lastName']});

  for (let i=0; i<instructorList.length; i++) {
    instructorList[i].primaryHours = 0;
    instructorList[i].alternativeHours = 0;
    instructorList[i].totalHours = 0;
    for (let j=0;j<termList.length;j++) {
      const tsPrimaryArray = await Timeslot.findAll({where:
          {
            TermID: termList[j].id,
            primaryInstructor: instructorList[i].id,
          }});
      const tsAlternativeArray = await Timeslot.findAll({where:
          {
            TermID: termList[j].id,
            alternativeInstructor: instructorList[i].id,
          }});
      // Could implement better logic to calculate this, but this works for limitations of schedule page
      instructorList[i].primaryHours += tsPrimaryArray.length;
      instructorList[i].alternativeHours += tsAlternativeArray.length;
      instructorList[i].totalHours += tsPrimaryArray.length+tsAlternativeArray.length;
    }
  }

  return instructorList;
}


module.exports = {router};
