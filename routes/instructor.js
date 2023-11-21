const express = require('express');
const router = express.Router();
const Instructor = require('../private/javascript/Instructor');


router.get('/instructor');
router.post('/instructor');
router.put('/instructor/:id');
router.delete('/instructor/:id');
function determineOperation(operation) {
  // no code allowed
}
function addInstructor(Instructor) {
// No code allowed
}
function deleteInstructor(Instructor) {
  // No code allowed
}
function editInstructor(Instructor) {
  // No code allowed
}

module.exports = router;
