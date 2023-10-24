const express = require('express');
const router = express.Router();
const Term = require('../private/javascript/Term');
router.get('/', async function(req, res, next) {
  // Declaring the array
  let termLists;

  try {
    // Calling the database, for all term entries, ordered by term number
    termLists = await Term.findAll({order: ['termNumber']});
  } catch (err) {
    // If it is not found, declaring termEntries as undefined so that table will not be viewed on term.hbs
    // and instead a sentence delaring no term entries found is displayed
    termLists = undefined;
  }
  res.render('term', {
    title: 'Term Listings',
    termEntries: termLists,
  });
});

module.exports = router;
