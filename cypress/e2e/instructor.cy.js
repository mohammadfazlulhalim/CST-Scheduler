/*The following tests are created to check functionality of the app to create, update and delete Instructors */
describe('Testing Instructor CRUD options', () => {

  //these are the selectors for HTML elements
  const addNewInsModalHeader='#addModalLabel';
  const insListingsPageHeader='body > div > div > div > h1';
  const tableFirstHeader ='body > div > div > div > table > thead > tr > th:nth-child(1)';
  const tableSecondHeader='body > div > div > div > table > thead > tr > th:nth-child(2)';
  const tableThirdHeader='body > div > div > div > table > thead > tr > th:nth-child(3)';
  const tableFourthHeader= 'body > div > div > div > table > thead > tr > th:nth-child(4)';
  const tableFifthHeader='body > div > div > div > table > thead > tr > th:nth-child(5)';
  const tableSixthHeader='body > div > div > div > table > thead > tr > th:nth-child(6)';
  const addInsModalFirstTextBoxLabel='#addModal > div > div > form > div.modal-body > label:nth-child(2)';
  const addInsModalSecondTextBoxLabel='#addModal > div > div > form > div.modal-body > label:nth-child(5)';
  const addInsModalThirdTextBoxLabel ='#addModal > div > div > form > div.modal-body > label:nth-child(8)';
  const addInsModalFourthTextBoxLabel ='#addModal > div > div > form > div.modal-body > label:nth-child(11)';
  const addInsModalFifthTextLabel ='#addModal > div > div > form > div.modal-body > label:nth-child(14)';
  const createInsButton= 'body > div > div > div > button';
  const newInsFirstNameInputTextBox='#cFirstName';
  const newInsLastNameInputTextBox='#cLastName';
  const newInsOfficeNumInputBox='#cOfficeNum';
  const newInsPhoneNumInputBox='#cPhoneNum';
  const newInsEmailInputBox='#cEmail';
  const CreateInstructorButtonOnNewInsModal='#createInstructor';
  const insListEditButtonOnFirstColumn = '#\\36 edit';
  const editModalHeader='#editModalLabel';
  const firstTextBoxOnEditModal='#eFirstName';
  const secondTextBoxOnEditModal ='#eLastName';
  const saveButtonOnEditModal ='#editInstructor';
  const insListDeleteButtonOnFirstColumnForDeleteTest ='#\\36 delete';
  const confirmDeleteButtonOnDeleteModal='#deleteInstructor';
  const navMenuSelector ='#navbarColor04 > ul > li:nth-child(2) > a';
  const navMenuItem= '#navbarColor04 > ul > li:nth-child(2) > div > a:nth-child(3)';


/* Navigating to our expected page "http://localhost:3000/instructor"*/

   beforeEach(()=>{
    cy.visit('http://localhost:3000');
    cy.get(navMenuSelector,{timeout:10000}).trigger('click')
    cy.get(navMenuItem, {timeout:10000}).click();
  });

   /* checking the availability of instructor lists headers*/
  it('testInstructorListsAreShownUnderCertainHeaders  ', () => {
    cy.get(insListingsPageHeader).should('have.text', 'Instructor Listings');
    cy.get(tableFirstHeader).should('have.text', 'First Name');
    cy.get(tableSecondHeader).should('have.text', 'Last Name');
    cy.get(tableThirdHeader).should('have.text', 'Office Number');
    cy.get(tableFourthHeader).should('have.text', 'Phone Number');
    cy.get(tableFifthHeader).should('have.text', 'Email');
    cy.get(tableSixthHeader).should('have.text', 'Actions');

  });

  /* Test to confirm the availability of instructor's name according to the fixture data*/
  it ('testAvailabilityOfAllInstructorInfo',()=>{
    cy.contains('Bryce').should('exist');
    cy.contains('Ernesto').should('exist');
    cy.contains('Rick').should('exist');
    cy.contains('Coralee').should('exist');
    cy.contains('Ron').should('exist');
  })

  /* Test to confirm the unavailability of new instructor's name (to be created/ added)  according to the fixture data*/
  it ('testUnavailabilityOfNewInstructorInfo',()=>{
    cy.contains('Ben').should('not.exist');
    cy.contains('Benson').should('not.exist');
  })

/* Test  "Add New Instructor" button navigates us to "Create New Instructor" modal, and it has required input boxes */
  it('testCreateNewInstructorModal ', () => {
    cy.get(createInsButton, {timeout:10000}).click();
    cy.get(addNewInsModalHeader).should('have.text', 'Create New Instructor');
    cy.get(addInsModalFirstTextBoxLabel).should('have.text', 'First Name:');
    cy.get(addInsModalSecondTextBoxLabel).should('have.text', 'Last Name:');
    cy.get(addInsModalThirdTextBoxLabel).should('have.text', 'Office Number:');
    cy.get(addInsModalFourthTextBoxLabel).should('have.text', 'Phone Number:');
    cy.get(addInsModalFifthTextLabel).should('have.text', 'Email:');
  });


  /* Test to  create a new instructor Ben Benson and confirm the availability inside Instructor Listings*/
  it('testAddingInformationOfNewInstructor ', () => {
    cy.get(createInsButton, {timeout:10000}).click();
    cy.get(newInsFirstNameInputTextBox, {timeout:50000}).type('Ben');
    cy.get(newInsLastNameInputTextBox,).type('Benson');
    cy.get(newInsOfficeNumInputBox, {timeout:10000}).type('223A.1');
    cy.get(newInsPhoneNumInputBox, {timeout:10000}).type('(123)-456-9655');
    cy.get(newInsEmailInputBox, {timeout:10000}).type('benson@saskpolytech.ca');
    cy.get(CreateInstructorButtonOnNewInsModal, {timeout:10000} ).click();
    cy.contains('Ben').should('exist');
  });

  /* Test to  edit instructor Ben Benson's name and confirm the availability of edited instructor inside Instructor Listings*/
  it('testEditInstructorInformation', () => {
    cy.get(insListEditButtonOnFirstColumn, {timeout:10000}).click();
    cy.get(editModalHeader).should('have.text', 'Edit Existing Instructor');
    cy.get(firstTextBoxOnEditModal, {timeout:10000}).clear();
    cy.get(firstTextBoxOnEditModal, {timeout:10000}).type('John');
    cy.get(secondTextBoxOnEditModal, {timeout:10000}).clear();
    cy.get(secondTextBoxOnEditModal, {timeout:10000}).type('Doe');
    cy.get(saveButtonOnEditModal, {timeout:10000}).click();
    cy.contains('John').should('exist');
  });

  /* Test to  delete instructor John's information and confirm the unavailability of deleted instructor inside Instructor Listings*/
  it('testDeleteInstructorButton  ', () => {

    cy.get(insListDeleteButtonOnFirstColumnForDeleteTest, {timeout:10000}).click();
    cy.get(confirmDeleteButtonOnDeleteModal, {timeout:10000}).click();
    cy.contains('John').should('not.exist');

  });
});
