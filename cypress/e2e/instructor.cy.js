describe('Testing Add New Instructor Button', () => {
    it('Instructor listings page is shown', () => {
        cy.visit('http://localhost:3000/instructor');
        cy.get('body > div > div > div > button').click();
        cy.get('#addModalLabel').should('have.text','Create New Instructor');
        cy.get('')
    })
})