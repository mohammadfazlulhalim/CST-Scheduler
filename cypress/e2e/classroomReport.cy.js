const Timeslot = require('../../private/javascript/Timeslot');
const {sequelize} = require('../../datasource');
const constants = require('../../constants');
const Instructor = require('../../private/javascript/Instructor');


describe('template spec', () => {
  // beforeEach(async () => {
  //   // drop the table and re-create it
  //   await Timeslot.sync({force: true});
  //   testTimeslot = {...constants.testConst.instructor1};
  // });

  it('passes', () => {
    cy.visit('http://localhost:3000');

    // add more steps
    cy.contains('Reports');
    cy.contains('Administration').click();
    // cy.contains('Reports');
  });
});
