/**
 * The purpose of this file is to help with the CRUD of the program object. Christeen Shlimoon
 * @type {e | (() => Express)}
 */
const express = require('express');
const router = express.Router();
const Program = require('../private/javascript/Program');

// Reading the programs
router.get('/', async function(req, res, next) {
  let programList;

  try {
    programList = await Program.findAll({});
  } catch (err) {
    programList = undefined;
  }

  res.render('program', {

  });
});

// Creating a new program
router.post('/', function(req, res, next) {

});

// updating an existing program
router.put('/', function(req, res, next) {

});

// deleting an existing program
router.delete('/', function(req, res, next) {

});

// Helper methods for CRUD

/**
 * This methods purpose will help with the creation of a program to simplify the router.post
 */
function createProgram() {

}

/**
 * This methods purpose will help with the deletion of a program to simplify the router.delete
 */
function deleteProgram(programAbbreviation) {

}

/**
 * This methods purpose will help with the updating of a program to simplify the router.put
 */
function updateProgram(programAbbreviation) {

}
module.exports = router;
