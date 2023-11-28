/**
 * The purpose of this file is to help with the CRUD of the program object. Christeen Shlimoon
 * @type {e | (() => Express)}
 */
const express = require('express');
const router = express.Router();
const Program = require('../private/javascript/Program');
const {where} = require('sequelize');

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
router.post('/create', async function(req, res, next) {
  const newName = req.body.addName;
  const newAbbr = req.body.addAbbr;
  let errors;


  // if (true) {
  // Check if the program with the given name already exists


  createProgram(newName, newAbbr);
  // } else {
  //   // Program already exists, handle the error or notify the user
  //   console.log('Program with the same name already exists:', existingProgram.toJSON());
  //   errors = 'Program with the same name already exists.';
  // }
  console.log('out of block');
  const programList = await FindAllPrograms();
  res.render('program', {
    errMsg: errors,
    program: programList,
  });
});

// Update an existing program
router.post('/update', async function(req, res, next) {
  const newName = req.body.editName;
  const newAbbr = req.body.editAbbr;
  const id=req.body.editID;
  let errors;


  console.log('you clicked save button');
  const programToUpdate = await Program.findByPk(id);
  console.log('id is '+id);

  updateProgram(programToUpdate, newName, newAbbr);
  const programList=await FindAllPrograms();
  res.render('program', {
    // get list of programs
    // errors
    errMsg: errors, // got rid of error
    program: programList,

  });
});


router.post('/delete', async function(req, res, next) {
  const deleteProg = req.body.progID;
  let errors;
  const programToDelete = await Program.findByPk(deleteProg);
  deleteProgram(programToDelete);
  const programList = await FindAllPrograms();
  res.render('program', {
    errMsg: errors,
    program: programList,
  });
});
// eslint-disable-next-line require-jsdoc
async function FindAllPrograms() {
  let programList;

  try {
    programList = await Program.findAll({order: ['programName']});
  } catch (err) {
    programList = undefined;
  }

  return programList;
}


// Helper methods for CRUD

/**
 * This methods purpose will help with the creation of a program to simplify the router.post
 */
async function createProgram(newName, newAbbr) {
  try {
    // const existingProgram = await Program.findOne({where: {programName: newName}});
    console.log('in the try');
    // Program doesn't exist, so add it
    const newProgram = await Program.create({
      programName: newName,
      programAbbreviation: newAbbr,
    });

    console.log('Program added successfully:', newProgram.toJSON());
  } catch (err) {
    console.log('in the catch');
    errors = mapErrors(err);
    console.log(errors);
  }
}

/**
 * This methods purpose will help with the deletion of a program to simplify the router.delete
 */
async function deleteProgram(programToDelete) {
  try {
    await programToDelete.destroy();
  } catch (err) {
    errors = mapErrors(err);
    console.error(errors);
  }
}

/**
 * This methods purpose will help with the updating of a program to simplify the router.put
 */
async function updateProgram(programToUpdate, newName, newAbbr) {
  if (programToUpdate) {
    try {
      // errors = await programToUpdate.validate();

      programToUpdate.programName = newName;
      programToUpdate.programAbbreviation = newAbbr;
      await programToUpdate.update({programName: newName, programAbbreviation: newAbbr});
    } catch (err) {
      errors = mapErrors(err);
      console.log(errors);
    }
  }
}

const mapErrors=(err)=>{
  // const viol={error: {}};
  // for (const error of err.errors) {
  //   viol.error[error.path]=error.message;
  // }
  // return viol;
  const viol = {error: {}};

  if (err && err.errors && typeof err.errors[Symbol.iterator] === 'function') {
    for (const error of err.errors) {
      viol.error[error.path] = error.message;
    }
  } else {
    // If err.errors is not iterable, add a generic error message
    viol.error['general'] = 'An unexpected error occurred.';
  }

  return viol;
};
module.exports = router;
