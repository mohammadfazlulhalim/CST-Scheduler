const express = require('express');
const router = express.Router();
const getTermsSorted = require('./termRouter').readAllTerms;
const Instructor = require('../private/javascript/Instructor');
const Timeslot = require('../private/javascript/Timeslot');


router.get('/', async function(req, res, next) {
  const termList = await reduceTermsToSeason();

  res.render('instructorHoursReport', {
    modal: true,
    termList,
  });
});

router.post('/', async function(req, res, next) {
  // Splitting the two values by the '_'
  const termSelectArray = req.body.termSelect.split('_');
  // taking the array and creating an object literal
  const simpleTermObj = {season: termSelectArray[0], calendarYear: termSelectArray[1]};

  const termList = await getTermsFromYearSeason(simpleTermObj);

  const instructorList =await calculateHours(termList);

  res.render('instructorHoursReport', {
    instructorList,
  });
});

/**
 *
 * @param termList
 * @return {*[]}
 */
async function reduceTermsToSeason() {
  const termList = await getTermsSorted();
  const newList = [];
  // loop through each
  termList.forEach((term)=>{
    // reducing the current term to just the year and season
    const simpleTerm ={season: term.season, calendarYear: term.calendarYear};
    // check if simpleTerm exists in newList
    let uniqueObj = true;
    // looping through the terms that have been added
    newList.forEach((term)=>{
      // if the term we are looking at in the new list matches the current object,
      // we set uniqueObj to false
      if (term.calendarYear === simpleTerm.calendarYear && term.season === simpleTerm.season) {
        uniqueObj = false;
      }
    });
    // if it is unique after going through newList, we need to add it to new list
    if (uniqueObj) {
      newList.push(simpleTerm);
    }
  });
  return newList;
}

/**
 *
 * @param termOrg
 * @return {Promise<*[]>}
 */
async function getTermsFromYearSeason(termOrg) {
  const termList = await getTermsSorted();
  const newList = [];
  termList.forEach((term)=>{
    if (term.calendarYear === termOrg.calendarYear && term.season === termOrg.season) {
      newList.push(term);
    }
  });
  return newList;
}

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
      // TODO: Implement better logic to calculate this
      instructorList[i].primaryHours += tsPrimaryArray.length;
      instructorList[i].alternativeHours += tsAlternativeArray.length;
      instructorList[i].totalHours += tsPrimaryArray.length+tsAlternativeArray.length;
    }
  }

  return instructorList;
}


module.exports = {router};
