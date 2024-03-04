const express = require('express');
const router = express.Router();
const Term = require('../private/javascript/Term');
const {sequelize} = require('../dataSource');
const termConstraints = require('../constants').termConstraints;
const URL = require('../constants').URL;
const CourseOffering = require('../private/javascript/CourseOffering');
const Program = require('../private/javascript/Program');
const Instructor = require('../private/javascript/Instructor');
const { Op } = require("sequelize");

router.get('/', async function(req, res, next) {
  // Declaring the array
  const termLists = await readAllTerms();
  res.render('term', {
    title: 'Manage Terms',
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
  if (req.body.auto) {
    // We need to autogenerate
    const calcYearSplit = result.calendarYear.split('-');
    let lastYear;
    let lastCO = null;

    // need to calculate out the previous year, and then from that we can filter using startdate and regex
    if (result.termNumber == 1 || result.termNumber == 4) {
      lastYear = (+calcYearSplit[0])-1;
    } else {
      lastYear = calcYearSplit[0];
    }
    try {
      const lastYearTerm = await Term.findAll({
        where: {
          startDate: {[Op.startsWith]: lastYear},
          termNumber: result.termNumber,
        },
      });
      console.log(JSON.stringify(lastYearTerm[0]));
      // console.log(JSON.stringify(lastYearTerm[0].id));
      lastCO = await CourseOffering.findAll({where: {
          TermId: lastYearTerm[0].id,
        }});
    } catch (e) {
      console.log(e);
    };

    const instructors = Instructor.findAll();
    const programs = Program.findAll();

    res.render('term', {
      termEntries: termLists,
      err: violations,
      submittedTerm: violations ? req.body : undefined,
      maxTerms: termConstraints.termNumberUpperLimit,
      minTerms: termConstraints.termNumberLowerLimit,
      title: 'Manage Terms',
      courseOfferings: lastCO,
      instructors,
      programs,
      URL,
    });

  } else {
    // Not autogenerating, use old res.render
    res.render('term', {
      termEntries: termLists,
      err: violations,
      submittedTerm: violations ? req.body : undefined,
      maxTerms: termConstraints.termNumberUpperLimit,
      minTerms: termConstraints.termNumberLowerLimit,
      title: 'Manage Terms',
      URL,
    });
  }
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
    title: 'Manage Terms',
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
    title: 'Manage Terms',
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
    return await Term.findAll({order: ['startDate']});
  } catch (err) {
    // If it is not found, declaring termEntries as undefined so that table will not be viewed on term.hbs
    // and instead a sentence declaring no term entries found is displayed
    return undefined;
  }
};

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
  return courseOfferings;
}

module.exports = {router, createTerm, deleteTerm, updateTerm};
