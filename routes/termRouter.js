const express = require('express');
const router = express.Router();
const Term = require('../private/javascript/Term');
const {sequelize} = require('../dataSource');
const termConstraints = require('../constants').termConstraints;
const URL = require('../constants').URL;
const CourseOffering = require('../private/javascript/CourseOffering');
const Program = require('../private/javascript/Program');
const Instructor = require('../private/javascript/Instructor');
const {Op} = require('sequelize');
const createCourseOffering = require('../private/javascript/courseOfferingMethods').createCourseOffering;
const Course = require('../private/javascript/Course');
const title = require('../constants').pageTitles.term;

router.get('/', async function(req, res, next) {
  // Declaring the array
  const termLists = await readAllTerms();
  res.render('term', {
    title,
    termEntries: termLists,
    URL,
  });
});

/**
 * POST handler for http://localhost:3000/term
 */
router.post('/', async function(req, res, next) {
  await sequelize.sync();
  // attempt to create the given term
  const result = await createTerm({
    termNumber: req.body.termNumber,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
  });
  let violations;
  if (result.error) {
    // if the term does not have a start/end date, that means it's invalid and errors were sent back
    res.status(422);
    // send error messages to the hbs template
    violations = result.error;
  } else {
    // creation was successful
    res.status(201);
    // put the ID in the response so tests can access it
    res.set('id', result.id);
  }

  const termLists = await readAllTerms();


  // checking if autogenerating - if so, using separate res.render
  // will not enter if there is an error for efficiency
  if (req.body.auto && !result.error) {

    // calling these now as they are needed later
    const instructors = await Instructor.findAll({order: [['lastName', 'ASC']]});
    const programs = await Program.findAll({order: [['programAbbreviation', 'ASC']]});

    // We need to autogenerate
    const calcYearSplit = result.calendarYear.split('-');
    let lastYear;
    let lastCO = null;

    // need to calculate out the previous year, and then from that we can filter using startdate and regex
    if (result.termNumber == 1 || result.termNumber == 4) {
      lastYear = (+calcYearSplit[0]) - 1;
    } else {
      lastYear = calcYearSplit[0];
    }
    try {
      // Finding last years term id
      const lastYearTerm = await Term.findAll({
        where: {
          startDate: {[Op.startsWith]: lastYear},
          termNumber: result.termNumber,
        },
      });
      // Finding all last years Coures Offerings
      lastCO = await CourseOffering.findAll({
        include: [Course],
        where: {
          TermId: lastYearTerm[0].id,
        },
      });
      // maps course offerings so that they have sequential numbering
      lastCO = mapCourseOfferings(lastCO, result);
    } catch (e) {
      console.log(e);
    };

    // seperate res.render call with all the attributes for course offering modal
    res.render('term', {
      termEntries: termLists,
      err: violations,
      submittedTerm: violations ? req.body : undefined,
      maxTerms: termConstraints.termNumberUpperLimit,
      minTerms: termConstraints.termNumberLowerLimit,
      title,
      courseOfferings: lastCO,
      instructors,
      programs,
      URL,
    });

    // else statement for the if req.body.autogenerate && !result.error
  } else {
    // Not autogenerating, use old res.render
    res.render('term', {
      termEntries: termLists,
      err: violations,
      submittedTerm: violations ? req.body : undefined,
      maxTerms: termConstraints.termNumberUpperLimit,
      minTerms: termConstraints.termNumberLowerLimit,
      title,
      URL,
    });
  }
});

router.post('/course-offerings', async function(req, res, next) {
  const termLists = await readAllTerms();
  let nError = 1;
  const coCreateArray = [];
  res.status(201);
  for (const tempCO of req.body.listCourseOfferings) {
    const retCreate = await createCourseOffering(tempCO);
    if (retCreate.error) {
      tempCO.err = retCreate.error;
      tempCO.count = nError++;
      tempCO.Course = await Course.findByPk(tempCO.CourseId);
      coCreateArray.push(tempCO);
      res.status(422);
    }
  }

  const instructors = await Instructor.findAll({order: [['lastName', 'ASC']]});
  const programs = await Program.findAll({order: [['programAbbreviation', 'ASC']]});

  res.render('term', {
    termEntries: termLists,
    maxTerms: termConstraints.termNumberUpperLimit,
    minTerms: termConstraints.termNumberLowerLimit,
    title,
    courseOfferings: coCreateArray,
    URL,
    instructors,
    programs,
  });
});
/**
 * DELETE handler for http://localhost:3000/term
 */
router.delete('/', async function(req, res, next) {
  const result = await deleteTerm({id: req.body.id});
  let violations;
  if (result <= 0) {
    res.status(404);
    violations = {id: 'Term not found; cannot delete'};
  }
  const termLists = await readAllTerms();
  res.render('term', {
    termEntries: termLists,
    err: violations,
    maxTerms: termConstraints.termNumberUpperLimit,
    minTerms: termConstraints.termNumberLowerLimit,
    title,
    URL,
  });
});

/**
 * PUT request handler for http://localhost:3000/term
 */
router.put('/', async function(req, res, next) {
  const result = await updateTerm({
    id: req.body.id,
    termNumber: req.body.termNumber,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
  });
  let violations;
  if (result.error) {
    if (result.error.invalidKey) {
      // if the invalidKey message is defined, then a non-existent term is trying to update
      res.status(404);
    } else {
      // if the term does not have a start/end date, that means it's invalid and errors were sent back
      res.status(422);
    }
    violations = result.error;
  }

  const termLists = await readAllTerms();
  res.render('term', {
    termEntries: termLists,
    putErr: violations,
    putSubmittedTerm: violations ? req.body : undefined,
    maxTerms: termConstraints.termNumberUpperLimit,
    minTerms: termConstraints.termNumberLowerLimit,
    title,
    URL,
  });
});

/**
 * Attempts to create the given term in the database
 * @param {Object} term  - An object literal with the desired term to create
 * @return {Promise<any>} - the created term if successful, a list of errors if not
 */
const createTerm = async (term) => {
  try {
    return await Term.create({
      termNumber: parseInt(term.termNumber),
      startDate: term.startDate,
      endDate: term.endDate,
    });
  } catch (err) {
    // return formatted errors
    return mapErrors(err);
  }
};

/**
 * Attempts to delete the given term from the database.
 * @param {Object} term       - The term to delete
 * @return {Promise<number>}  - The number of rows deleted; should only be 1 if successful
 */
const deleteTerm = async (term) => {
  try {
    // try to delete the term
    return await Term.destroy({where: {id: term.id}});
  } catch (err) {
    // if an error occurred, state that 0 rows were deleted
    return 0;
  }
};

/**
 * Attempts to update the given term in the database.
 * @param {Object} term     - The term to update
 * @return {Promise<any>}  - The updated term if successful, a list of errors otherwise
 */
const updateTerm = async (term) => {
  // find the term to update
  const termToUpdate = await Term.findByPk(term.id);
  if (termToUpdate) {
    // only try to update the term if it already exists
    try {
      return await termToUpdate.update({
        termNumber: parseInt(term.termNumber),
        startDate: term.startDate,
        endDate: term.endDate,
      });
    } catch (err) {
      // return formatted validation errors when invalid
      return mapErrors(err);
    }
  } else {
    // if not found, return an invalid key error message
    return {error: {invalidKey: 'Could not find an existing term to update'}};
  }
};

/**
 * Returns all term objects in the database.
 */
const readAllTerms = async () => {
  try {
    // Calling the database, for all term entries, ordered by term number
    return (await Term.findAll({order: ['startDate']})).sort(compareTerm);
  } catch (err) {
    // If it is not found, declaring termEntries as undefined so that table will not be viewed on term.hbs
    // and instead a sentence declaring no term entries found is displayed
    return undefined;
  }
};

/**
 * This function is used to create a sort order for term in reverse chronology using school year, and ascending term number when
 * the school year is equal
 * @param term1
 * @param term2
 * @returns {number}
 */
function compareTerm(term1, term2) {
  if (term1.calendarYear === term2.calendarYear) {
    return term1.termNumber - term2.termNumber;
  } else if (term2.calendarYear > term1.calendarYear) {
    return 1;
  } else {
    return -1;
  }
}

/**
 * Given an error object, this function maps it to a more presentable format for the hbs template.
 * @param {Object} err  - An object representing errors
 * @return {{}}         - Formatted error object
 */
const mapErrors = (err) => {
  const violations = {error: {}};
  for (const error of err.errors) {
    violations.error[error.path] = error.message;
  }
  return violations;
};

/**
 * Takes in an array of course offerings, and changes the dates and term
 * to match with the term, and then returns the array of course offerings
 * @param courseOfferings
 * @returns {*}
 */
function mapCourseOfferings(courseOfferings, newTerm) {
  for (let i = 0; i < courseOfferings.length; i++) {
    courseOfferings[i].count = (i + 1);
    courseOfferings[i].startDate = newTerm.startDate;
    courseOfferings[i].endDate = newTerm.endDate;
    courseOfferings[i].TermId = newTerm.id;
  }
  return courseOfferings;
}

module.exports = {router, createTerm, deleteTerm, updateTerm, readAllTerms};
