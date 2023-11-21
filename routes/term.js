const express = require('express');
const router = express.Router();
const Term = require('../private/javascript/Term');
router.get('/', async function(req, res, next) {
  // Declaring the array
  const termLists = await readAllTerms();
  res.render('term', {
    title: 'Term Listings',
    termEntries: termLists,
  });
});

router.post('/', async function(req, res, next) {
  // attempt to create the given term
  const result = await createTerm({
    termNumber: req.body.termNumber,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
  });
  let violations;
  if (!result.startDate || !result.endDate) {
    // if the term does not have a start/end date, that means it's invalid and errors were sent back
    res.status(422);
    // send error messages to the hbs template
    violations = result;
  } else {
    // creation was successful
    res.status(201);
    // put the ID in the response so tests can access it
    res.set('id', result.id);
  }
  const termLists = await readAllTerms();
  res.render('term', {termEntries: termLists, err: violations});
});

/**
 * Attempts to create the given term in the database
 * @param {Object} term  - An object literal with the desired term to create
 * @return {Promise<{}|Model<any, TModelAttributes>>} - the created term if successful, a list of errors if not
 */
const createTerm = async (term) => {
  try {
    return await Term.create(term);
  } catch (err) {
    const violations = {};
    for (const error of err.errors) {
      violations[error.property] = error.message;
    }
    return violations;
  }
};

const deleteTerm = async (term) => {

};

const updateTerm = async (term) => {

};

/**
 * Returns all term objects in the database.
 */
const readAllTerms = async () => {
  try {
    // Calling the database, for all term entries, ordered by term number
    return await Term.findAll({order: ['termNumber']});
  } catch (err) {
    // If it is not found, declaring termEntries as undefined so that table will not be viewed on term.hbs
    // and instead a sentence declaring no term entries found is displayed
    return undefined;
  }
};

module.exports = {router, createTerm, deleteTerm, updateTerm};
