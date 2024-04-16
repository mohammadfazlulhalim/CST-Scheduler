const getTermsSorted = require('../../routes/termRouter').readAllTerms;

/**
 * This method gets all the terms, and then reduces them to have one occurrence
 * for each season and year. So Term 3 2023-2024 and Term 6 2023-2024 would be
 * merged into one object Spring 2023-2024 with the earliest start date and the
 * latest end date
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
      if (newList[i].calendarYear === simpleTerm.calendarYear && newList[i].season === simpleTerm.season) {
        uniqueObj = false;
        // Using helper methods to get the earliest start date and latest end date
        newList[i].startDate = getEarliestStartDate(newList[i].startDate, simpleTerm.startDate);
        newList[i].endDate = getLatestEndDate(newList[i].endDate, simpleTerm.endDate);
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

/**
 * Helper method that takes in two startDates and returns the earliest
 * occurrence of that date in original formatting
 * @param date1
 * @param date2
 * @returns {*}
 */
function getEarliestStartDate(date1, date2) {
  // Removing dashes to prepare string to number conversion
  const date1NoDash = date1.replaceAll('-', '');
  const date2NoDash = date2.replaceAll('-', '');

  // Converting to numbers for easier comparison
  const date1Number = Number(date1NoDash);
  const date2Number = Number(date2NoDash);

  if (date1Number < date2Number) {
    return date1;
  } else {
    return date2;
  }
}

/**
 * Helper method that takes in two end dates and returns the later
 * occurrence of the end dates in original formatting
 * @param date1
 * @param date2
 * @returns {*}
 */
function getLatestEndDate(date1, date2) {
  // Removing dashes to prepare string to number conversion
  const date1NoDash = date1.replaceAll('-', '');
  const date2NoDash = date2.replaceAll('-', '');

  // Converting to numbers for easier comparison
  const date1Number = Number(date1NoDash);
  const date2Number = Number(date2NoDash);

  if (date1Number > date2Number) {
    return date1;
  } else {
    return date2;
  }
}

/**
 * Method that returns a list of all terms that have the same season
 * and calendarYear of the original term passed in
 * @param termOrg Only requires fields calendarYear and season, does not need
 * to be a full term object
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