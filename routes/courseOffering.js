const express = require('express');
const router = express.Router();

const courseOfferings = [];

router.get('/', courseOfferingGet);

/**
 * This function handles GET requests for http://localhost:3000/course-offerings
 *
 * @param {request}  req  - The GET request object
 * @param {response} res  - The GET response object
 * @param {function} next - The next function to call
 */
function courseOfferingGet(req, res, next) {
}
