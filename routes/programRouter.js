const express = require('express');
const router = express.Router();
const Program = require('../private/javascript/Program');
const {sequelize} = require('../dataSource');
const URL = require('../constants').URL;
const title = require('../constants').pageTitles.program;

// Reading the programs
router.get('/', async function(req, res, next) {
  // initialize a list of programs
  let programList;

  try {
    // try to collect the programs and order them
    programList= await Program.findAll({order: ['programName']});
  } catch (err) {
    programList = undefined;
  }
  // render the page
  res.render('program', {
    program: programList,
    URL,
    title
  });
});

// Create new programs
router.post('/', async function(req, res, next) {
  await sequelize.sync();
  // attempt to create the given term
  const result = await createProgram({
    programName: req.body.programName,
    programAbbreviation: req.body.programAbbreviation,
  });

  // initialize errors/violations
  let violations;

  if (result.error) {
    // if error occurs, that means it's invalid and errors were sent back
    res.status(422);
    // send error messages to the hbs template
    violations = result.error;
  } else {
    // creation was successful
    res.status(201);
    // put the ID in the response so tests can access it
    res.set('id', result.id);
  }
  // Gather the list of programs
  const programLists = await FindAllPrograms();
  // render the page
  res.render('program', {
    program: programLists,
    err: violations,
    submittedProgram: violations ? req.body : undefined,
    URL,
    title
  });
});

// Update programs
router.put('/', async function(req, res, next) {
  await sequelize.sync();
  // From the hbs form gather the data
  const programID = req.body.progID;
  const programName = req.body.programName;
  const programAbbreviation = req.body.programAbbreviation;

  // find if that program exists
  const programToUpdate = await Program.findByPk(programID);
  let violations;
  // if it doesnt exist
  if (!programToUpdate) {
    res.status(404);
  } else {// else update
    const result = await updateProgram(programToUpdate, programName, programAbbreviation);

    // initialize violations
    // let violations;
    if (result.error) {
      // if error that means it's invalid and errors were sent back
      res.status(422);
      // send error messages to the hbs template
      violations = result.error;
    } else {
      // creation was successful
      res.status(201);
      // put the ID in the response so tests can access it
      res.set('id', result.id);
    }
  }

  // Gather the programs
  const programLists = await FindAllPrograms();
  // render the page
  res.render('program', {
    program: programLists,
    putErr: violations,
    putSubmittedProgram: violations ? req.body : undefined,
    URL,
    title
  });
});

// Delete program
router.delete('/', async function(req, res, next) {
  await sequelize.sync();
  // Gather data from hbs inputs on form
  const programPK= req.body.progID;
  const programToDelete=await Program.findByPk(programPK);

  // Try to delete the program
  const result= await deleteProgram(programToDelete);

  // Initialize the violations
  let violations;

  try {
    if (result.error) {
      // error, that means it's invalid and errors were sent back
      res.status(422);
      // send error messages to the hbs template
      violations = result.error;
    } else {
      // creation was successful
      res.status(201);
      // put the ID in the response so tests can access it
      res.set('id', result.id);
    }
  } catch (err) {

  }

  // Gather the programs
  const programLists = await FindAllPrograms();
  // Render the page
  res.render('program', {
    program: programLists,
    err: violations,
    submittedProgram: violations ? req.body : undefined,
    URL,
    title
  });
});


// ***HELPER  METHODS***

// Update a program helper
const updateProgram = async (programToUpdate, newName, newAbbr) => {
  let errors; // Define the errors variable

  try {
    // Update the program attributes
    const programUpdated = await programToUpdate.update({
      programName: newName,
      programAbbreviation: newAbbr,
    });
    return programUpdated;
  } catch (err) {
    errors = mapErrors(err);
    return errors;
  }
};


// Delete a program helper
const deleteProgram= async (programToDelete)=>{
  try {
    // delete the program
    await programToDelete.destroy();
  } catch (err) {
    errors = mapErrors(err);
  }
};

// Finding all the programs
// eslint-disable-next-line require-jsdoc
async function FindAllPrograms() {
  // initialize a list
  let programList;

  try {
    // find the programs
    programList = await Program.findAll({order: ['programName']});
  } catch (err) {
    programList = undefined;
  }

  return programList;
}

// Create a program helper
const createProgram = async (program) => {
  try {
    // create the program
    const programToCreate = await Program.create({
      programName: (program.programName),
      programAbbreviation: program.programAbbreviation,

    });
    return programToCreate;
  } catch (err) {
    return mapErrors(err);
  }
};


// Mapping errors helper
const mapErrors = (err) => {
  const violations = {error: {}};

  if (err.errors && typeof err.errors[Symbol.iterator] === 'function') {
    for (const error of err.errors) {
      violations.error[error.path] = error.message;
    }
  } else {
  }

  return violations;
};


module.exports = {router, createProgram, deleteProgram, updateProgram};
