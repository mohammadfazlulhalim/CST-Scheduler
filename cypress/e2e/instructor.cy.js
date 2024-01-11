describe('Testing Instructor CRUD options', () => {

  const addNewInsModalHeader='#addModalLabel';
  const insListingsPageHeader='body > div > div > div > h1';
  const tableFirstHeader ='body > div > div > div > table > thead > tr > th:nth-child(2)';
  const tableSecondHeader='body > div > div > div > table > thead > tr > th:nth-child(3)';
  const tableThirdHeader='body > div > div > div > table > thead > tr > th:nth-child(4)';
  const tableFourthHeader= 'body > div > div > div > table > thead > tr > th:nth-child(5)';
  const tableFifthHeader='body > div > div > div > table > thead > tr > th:nth-child(6)';
  const tableSixthHeader='body > div > div > div > table > thead > tr > th:nth-child(7)';
  const addInsModalFirstTextBoxLabel='#addModal > div > div > form > div.modal-body > label:nth-child(4)';
  const addInsModalSecondTextBoxLabel='#addModal > div > div > form > div.modal-body > label:nth-child(7)';
  const addInsModalThirdTextBoxLabel ='#addModal > div > div > form > div.modal-body > label:nth-child(10)';
  const addInsModalFourthTextBoxLabel ='#addModal > div > div > form > div.modal-body > label:nth-child(13)';
  const addInsModalFifthTextLabel ='#addModal > div > div > form > div.modal-body > label:nth-child(16)';
  const createInsButton= 'body > div > div > div > button' ;
  const newInsFirstNameInputTextBox='#cFirstName';
  const newInsLastNameInputTextBox='#cLastName';
  const newInsOfficeNumInputBox='#cOffice';
  const newInsPhoneNumInputBox='#cPhone';
  const newInsEmailInputBox='#cEmail';
  const CreateInstructorButtonOnNewInsModal='#createInstructor';
  const insListFirstNameOnFirstColumn='#\\31 firstName';
  const insListEditButtonOnFirstColumn = '#\\31 edit';
  const editModalHeader='#editModalLabel';
  const firstTextBoxOnEditModal='#eFirstName';
  const secondTextBoxOnEditModal ='#eLastName';
  const saveButtonOnEditModal ='#editInstructor';
  const insListDeleteButtonOnFirstColumn ='#\\31 delete' ;
  const confirmDeleteButtonOnDeleteModal='#deleteInstructor';
  const insListFirstNameOnFirstColumnAfterDeletion = '#\\32 firstName'



  const navMenuSelector ='body>open>nav';
  const navMenuItem= 'body>nav>menu';

  beforeEach(()=>{
    cy.visit('http://localhost:3000');
    cy.get(navMenuSelector).trigger('mouseover', { /* TODO find the option I must send mouse over*/});
    cy.get(navMenuItem).click();
  });

  it('Test Instructor Lists are Shown Inside Instructor Page  ', () => {
    // TODO check the tables do not exist
    cy.get(insListingsPageHeader).should('have.text', 'Instructor List');
    cy.get(tableFirstHeader).should('have.text', 'First Name');
    cy.get(tableSecondHeader).should('have.text', 'Last Name');
    cy.get(tableThirdHeader).should('have.text', 'Office Number');
    cy.get(tableFourthHeader).should('have.text', 'Phone Number');
    cy.get(tableFifthHeader).should('have.text', 'Email');
    cy.get(tableSixthHeader).should('have.text', 'Action');
    cy.get(insListEditButtonOnFirstColumn).should ('have.text', 'Edit');
    cy.get(insListDeleteButtonOnFirstColumn).should ('have.text', 'Delete');
    cy.get(createInsButton).should ('have.text', 'Add New Instructor')

  });

  it('Test Create New Instructor Modal ', () => {
    cy.get(createInsButton).click();
    cy.get(addNewInsModalHeader).should('have.text', 'Create New Instructor');
    cy.get(addInsModalFirstTextBoxLabel).should('have.text', 'First Name:');
    cy.get(addInsModalSecondTextBoxLabel).should('have.text', 'Last Name:');
    cy.get(addInsModalThirdTextBoxLabel).should('have.text', 'Office Number:');
    cy.get(addInsModalFourthTextBoxLabel).should('have.text', 'Phone Number:');
    cy.get(addInsModalFifthTextLabel).should('have.text', 'Email:');
  });


  it('Test Adding Information of New Instructor ', () => {
    cy.get(createInsButton).click();
    cy.get(newInsFirstNameInputTextBox).type('Ben');
    cy.get(newInsLastNameInputTextBox).type('Benson');
    cy.get(newInsOfficeNumInputBox).type('223A.1');
    cy.get(newInsPhoneNumInputBox).type('(123)-456-9655');
    cy.get(newInsEmailInputBox).type('benson@saskpolytech.ca');
    cy.get(CreateInstructorButtonOnNewInsModal ).click();
    cy.get(insListFirstNameOnFirstColumn).should('have.text', 'Ben');
  });

  it('Test Edit Instructor Information', () => {
    // Test Edit instructor information
    cy.get(insListEditButtonOnFirstColumn).click();
    cy.get(editModalHeader).should('have.text', 'Edit Existing Instructor');
    cy.get(firstTextBoxOnEditModal).clear();
    cy.get(firstTextBoxOnEditModal).type('John');
    cy.get(secondTextBoxOnEditModal).clear();
    cy.get(secondTextBoxOnEditModal).type('Doe');
    cy.get(saveButtonOnEditModal).click();
    cy.get(insListFirstNameOnFirstColumn).should('have.text', 'John');
  });


  it('Test Delete Instructor Button  ', () => {
    cy.get(insListDeleteButtonOnFirstColumn).click();
    // cy.get('#deleteModal > div > div').should('have.text', 'Delete Instructor');

    cy.get(confirmDeleteButtonOnDeleteModal).click();
    cy.get(insListFirstNameOnFirstColumnAfterDeletion).should('have.text', 'Coralee');
  });
});
