const express = require('express');
const router = express.Router();


/**
 * Processing GET request for rendering the instructor report page.
 *
 */
router.get('', function(req, res, next) {

});


/**
 * After the completion of the instructor report form,
 * this processes the POST request to render the instructor report
 * for the requested instructor(s)
 */
router.post('', function(req, res, next) {

});

/**
 * Helper function for the POST.
 * Help to gather timeslots for instructor
 */
function generateSchedule() {

}


module.exports = router;
