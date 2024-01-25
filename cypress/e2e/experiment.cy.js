// Meaningless test that I am using to learn Cypress
// https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test
describe('Cypress Learning', () => {
  it('passes', () => {
    // Opens administration page
    cy.visit('localhost:3000/administration');

    // Opens classroom using displayed text (blackbox)
    cy.contains('Manage Classrooms').click();

    // Opens Add modal
    cy.contains('Add New Classroom').click();

    // Fills out add modal using IDs (whitebox)
    cy.get('#cRoomNumber').type('250A');
    // Only types in the first letter, not sure why
    cy.get('#cLocation').type('Saskatoon Main Campus');
    // Clicks save button - causing problems somehow - selector is not finding it
    cy.contains('[data-cy="createSubmit"]').click({force: true});

    // Best practices for selecting elements
    // https://docs.cypress.io/guides/references/best-practices#Selecting-Elements
  });
});
