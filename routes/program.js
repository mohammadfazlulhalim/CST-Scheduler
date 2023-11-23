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
    programList= await Program.findAll({order: ['programName']});
  } catch (err) {
    programList = undefined;
  }

  res.render('program', {
    program: programList,
  });
});

// Creating a new program
router.post('/', function(req, res, next) {

});

// Update an existing program
router.post('/:id', async function(req, res, next) {
  const programId = req.params.id;
  const newName = req.body.editName; // Assuming you are using body-parser middleware
  const newAbbr = req.body.editAbbr;
  const saveButtonClicked = req.body.saveButton; // Check for the button ID

  try {
    if (req.body.hasOwnProperty('saveButton')) {
      console.log('you clicked save button');
      // Find the program in the database by ID
      const programToUpdate = await Program.findByPk(programId);

      if (programToUpdate) {
        // Update the program with the new values
        programToUpdate.programName = newName;
        programToUpdate.programAbbreviation = newAbbr;

        // Validate the program object
        const errors = await programToUpdate.validate();

        if (errors) {
          // Redirect back to the main program page with an error query parameter
          res.redirect('/?error=' + encodeURIComponent(errors.message));
        } else {
          // Save the changes to the database
          await programToUpdate.save();

          // Redirect to the main program page on success
          res.redirect('/');
        }
      } else {
        // Handle the case where the program with the given ID is not found
        res.status(404).send('Program not found.');
      }
    } else {
      // Handle the case where the button was not clicked
      res.status(400).send('Save button not clicked.');
    }
  } catch (error) {
    // Handle errors, e.g., database errors
    console.error('Error updating program:', error);
    res.status(500).send('Internal Server Error');
  }
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
