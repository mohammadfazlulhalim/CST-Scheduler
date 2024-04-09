const getTermsSorted = require('../../routes/termRouter').readAllTerms;

/**
 *
 * @param termList
 * @return {*[]}
 */
async function reduceTermsToSeason() {
  const termList = await getTermsSorted();
  const newList = [];
  // loop through each
  termList.forEach((term) => {
    // reducing the current term to just the year and season,
    // and the earliest startdate and latest end date
    const simpleTerm =
      {
        season: term.season,
        calendarYear: term.calendarYear,
        startDate: term.startDate,
        endDate: term.endDate,
      };
    // check if simpleTerm exists in newList
    let uniqueObj = true;
    // looping through the terms that have been added
    for (let i = 0; i < newList.length; i++) {
      // if the term we are looking at in the new list matches the current object,
      // we set uniqueObj to false
      if (termList[i].calendarYear === simpleTerm.calendarYear && termList[i].season === simpleTerm.season) {
        uniqueObj = false;
        // Checking if the current one has an earlier start date than what is already added
        // TODO: Get proper date comparison

        

        // if (termList[i].startDate > simpleTerm.startDate) {
        //   termList[i].startDate = simpleTerm.startDate;
        // }
        // // checking if the current one has a later start date than what is already saved
        // if (termList[i].endDate < simpleTerm.endDate) {
        //   termList[i].endtDate = simpleTerm.endDate;
        // }
      }
    }
    // if it is unique after going through newList, we need to add it to new list
    if (uniqueObj) {
      newList.push(simpleTerm);
    }
  });

  newList.sort(compareTermsByYearSeason);
  return newList;
}

function getEarliestStartDate(date1, date2) {
  const date1NoDash = date1.replaceAll('-', '');
  const date2NoDash = date2.replaceAll('-', '');



}

/**
 *
 * @param termOrg
 * @return {Promise<*[]>}
 */
async function getTermsFromYearSeason(termOrg) {
  const termList = await getTermsSorted();
  const newList = [];
  termList.forEach((term) => {
    if (term.calendarYear === termOrg.calendarYear && term.season === termOrg.season) {
      newList.push(term);
    }
  });
  return newList;
}

/**
 * Helper method by ordering the term by calendarYear first, in reverse chronological order
 * And then orders the seasons by Fall, Winter, Spring
 * @param term1
 * @param term2
 * @returns {number}
 */
function compareTermsByYearSeason(term1, term2) {
  if (term1.calendarYear === term2.calendarYear) {
    switch (term1.season) {
      case 'Fall':
        return -1;
      case 'Winter':
        if (term2.season === 'Fall') {
          return 1;
        } else {
          return -1;
        }
      case 'Spring':
        return 1;
    }
  } else if (term2.calendarYear > term1.calendarYear) {
    return 1;
  } else {
    return -1;
  }
}

module.exports = {getTermsFromYearSeason, reduceTermsToSeason};