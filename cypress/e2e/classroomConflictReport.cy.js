it('testClassroomConflictsFound ', () => {
    // Opens main page - and go to Classroom Conflict Report Page
    cy.visit('localhost:3000');
    cy.contains('Reports').click();
    cy.get ('.nav-item.dropdown .dropdown-menu a[href="/classroomConflictReport"]').click();
    cy.get('#classroomConflictModal').should('be.visible');
    // Assert that the URL has changed to the classroom Conflict Report page
    cy.url().should('include', '/classroomConflictReport');

    // Sort orders are checked in the other test, as one giant test was not running smoothly

    // Check that Enter button is disabled
    cy.get('#modalSubmit').should('be.disabled');

    // Check that classroom field can be entered
    cy.contains('Classroom');
    cy.get('#classroomSelect').select('239B');

    cy.get('#modalSubmit').should('be.disabled');

    cy.get('#modalSubmit').should('not.be.disabled');
    cy.get('#modalSubmit').click();

    cy.get('#classroomConflictModal').should('be.hidden');





});