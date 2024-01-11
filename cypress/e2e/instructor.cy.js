describe('Testing Instructor CRUD options', () => {
  beforeEach(()=>{
    cy.visit('http://localhost:3000');
  });
  const InsListingsPageHeader='body > div > div > div > h1';
  const tableFirstHeader ='body > div > div > div > table > thead > tr > th:nth-child(2)';
  const tableSecondHeader='body > div > div > div > table > thead > tr > th:nth-child(3)';
  const tableThirdHeader='body > div > div > div > table > thead > tr > th:nth-child(4)';
  const tableFourthHeader= 'body > div > div > div > table > thead > tr > th:nth-child(5)';
  const tableFifthHeader='body > div > div > div > table > thead > tr > th:nth-child(6)';
  const tableSixthHeader='body > div > div > div > table > thead > tr > th:nth-child(7)';

  const navMenuSelector ='body>open>nav';
  const navMenuItem= 'body>nav>menu';

  it('Instructor listings page is shown', () => {
    // TODO check the tables do not exist

    cy.get(navMenuSelector).trigger('mouseover', { /* TODO find the option I must send mouse over*/});
    cy.get(navMenuItem).click();
    cy.get(InsListingsPageHeader).should('have.text', 'Instructor List');
    cy.get(tableFirstHeader).should('have.text', 'First Name');
    cy.get(tableSecondHeader).should('have.text', 'Last Name');
    cy.get(tableThirdHeader).should('have.text', 'Office Number');
    cy.get(tableFourthHeader).should('have.text', 'Phone Number');
    cy.get(tableFifthHeader).should('have.text', 'Email');
    cy.get(tableSixthHeader).should('have.text', 'Action');
  });
  it('Create New Instructor modal is shown after clicking ADD NEW INSTRUCTOR Button', () => {
    cy.get('body > div > div > div > button').click();
    cy.get('#addModalLabel').should('have.text', 'Create New Instructor');
    cy.get('#addModal > div > div > form > div.modal-body > label:nth-child(4)').should('have.text', 'First Name:');
    cy.get('#addModal > div > div > form > div.modal-body > label:nth-child(7)').should('have.text', 'Last Name:');
    cy.get('#addModal > div > div > form > div.modal-body > label:nth-child(10)').should('have.text', 'Office Number:');
    cy.get('#addModal > div > div > form > div.modal-body > label:nth-child(13)').should('have.text', 'Phone Number:');
    cy.get('#addModal > div > div > form > div.modal-body > label:nth-child(16)').should('have.text', 'Email:');
  });


  it('Add information inside New Instructor modal', () => {
    cy.visit('http://localhost:3000/instructor');
    cy.get('body > div > div > div > button').click();
    cy.get('#cFirstName').type('Ben');
    cy.get('#cLastName').type('Benson');
    cy.get('#cOffice').type('223A.1');
    cy.get('#cPhone').type('224-456');
    cy.get('#cEmail').type('benson@saskpolytech.ca');
    cy.get('#createInstructor').click();
    cy.get('#\\31 firstName').should('have.text', 'Ben');
  });

  it('Edit information inside Instructor List Page ', () => {
    // Test Edit instructor information
    cy.visit('http://localhost:3000/instructor');
    cy.get('#\\31 edit').click();
    cy.get('#editModalLabel').should('have.text', 'Edit Existing Instructor');
    cy.get('#eFirstName').clear();
    cy.get('#eFirstName').type('John');
    cy.get('#eLastName').clear();
    cy.get('#eLastName').type('Doe');
    cy.get('#editInstructor').click();
    cy.get('#\\31 firstName').should('have.text', 'John');
  });


  it('Delete information inside Instructor List Page ', () => {
    cy.visit('http://localhost:3000/instructor');
    cy.get('#\\31 delete').click();
    // cy.get('#deleteModal > div > div').should('have.text', 'Delete Instructor');

    cy.get('#deleteInstructor').click();
    cy.get('#\\32 firstName').should('have.text', 'Coralee');
  });
});
