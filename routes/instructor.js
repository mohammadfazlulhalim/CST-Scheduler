const express = require('express');
const router = express.Router();
const Instructor = require('../private/javascript/Instructor');


router.get('/', async function(req, res, next) {
  const instructorList = await Instructor.findAll();
  console.log(instructorList);
  res.render('instructor', {
    title: 'Manage Instructors',
    instructorList,
  });
});

router.post('/', async function(req, res, next) {
  // attempt to create the given term
  const result = await createInstructor({
    instructorID: req.body.instructorID,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
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
  const instrutorList = await readAllInstructors();
  res.render('instructor', {list: instrutorList, err: violations});
});


router.put('/:id');
router.delete('/:id');

const determineOperation = (operation) => {
  switch (operation) {
    case 'create':
      break;
    case 'update':
      break;
    case 'delete':
      break;
  }
};

const createInstructor = async (Instructor) => {
  try {
    return await Instructor.create(Instructor);
  } catch (err) {
    const violations = {};
    for (const error of err.errors) {
      violations[error.property] = error.message;
    }
    return violations;
  }
};

const deleteInstructor = async (Instructor) => {

};

const updateInstructor = async (Instructor) => {

};


module.exports = router;
