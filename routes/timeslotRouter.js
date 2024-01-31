// This one will not have a page, but will handle CRUD functionality to maintain consistency

const Timeslot = require('../private/javascript/Timeslot');

/**
 * This helper method calls the database to handle Create
 * @param timeslotObj Object literal containing timeslot information to create
 * @return {Promise<{}>} object literal containing primary of timeslot created, success message and error messages
 */
async function createTimeslot(timeslotObj) {
  // See previous routers for syntax/object literals to maintain consistency
  return {};
}

/**
 * This helper method calls the database to handle update
 * @param timeslotObj object literal containing timeslot information to update
 * @return {Promise<{}>} object literal containing primary key of timeslot updated, success message and error messages
 */
async function updateTimeslot(timeslotObj) {
  // See previous routers for syntax/object literals to maintain consistency
  return {};
}

/**
 * This helper method calls the database to handle delete
 * @param timeslotObj object literal containing timeslot information to delete
 * @return {Promise<{}>} object literal containing primary key of timeslot delete, success message and error messages
 */
async function deleteTimeslot(timeslotObj) {
  // See previous routers for syntax/object literals to maintain consistency
  return {};
}

module.exports = {createTimeslot, updateTimeslot, deleteTimeslot};
