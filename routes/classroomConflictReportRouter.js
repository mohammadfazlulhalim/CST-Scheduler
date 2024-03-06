const express= require('express');
const router = express.Router();


/**
 * Post Handler for classroom conflict report router
 * @param req
 * @param res
 * @param next
 */
router.post('/', async (req, res, next)=>{

});

/**
 * Get Handler for classroom conflict report router
 * @param req
 * @param res
 * @param next
 */
router.get('/', async (req, res, next)=>{
   ;
});


/**
 * This function helps to finding and collecting  timeslots which
 * are experiencing class conflicts
 * @param classroom   is an instance of Classroom object
 */
async function checkForConflict(classroom) {

}



module.exports = {router, checkForConflict};