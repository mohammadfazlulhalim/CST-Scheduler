/* The following tests are created to check functionality of the app to create, update and delete Instructors */
describe('Testing Instructor CRUD options', () => {
  // these are the selectors for HTML elements
  const addNewInsModalHeader='#addModalLabel';
  const insListingsPageHeader='body > div > div >div > div > h1';
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
  const createInsButton= 'body > div > div >div> div > button';
  const newInsFirstNameInputTextBox='#cFirstName';
  const newInsLastNameInputTextBox='#cLastName';
  const newInsOfficeNumInputBox='#cOfficeNum';
  const newInsPhoneNumInputBox='#cPhoneNum';
  const newInsEmailInputBox='#cEmail';
  const CreateInstructorButtonOnNewInsModal='#createInstructor';
  const insListEditButtonOnFirstColumn = '#\\31 2edit';
  const editModalHeader='#editModalLabel';
  const firstTextBoxOnEditModal='#eFirstName';
  const secondTextBoxOnEditModal ='#eLastName';
  const saveButtonOnEditModal ='#editInstructor';
  const insListDeleteButtonOnFirstColumnForDeleteTest ='#\\31 2delete';
  const confirmDeleteButtonOnDeleteModal='#deleteInstructor';
  const firstRowOfListings= 'body > div > div > div > table > tbody > tr:nth-child(1)';
  const secondRowOfListings= 'body > div > div > div > table > tbody > tr:nth-child(2)';
  const thirdRowOfListings= 'body > div > div > div > table > tbody > tr:nth-child(3)';
  const fourthRowOfListings= 'body > div > div > div > table > tbody > tr:nth-child(4)';
  const fifthRowOfListings= 'body > div > div > div > table > tbody > tr:nth-child(5)';
  const sixthRowOfListings= 'body > div > div > div > table > tbody > tr:nth-child(6)';
  const seventhRowOfListings= 'body > div > div > div > table > tbody > tr:nth-child(7)';
  const eighthRowOfListings= 'body > div > div > div > table > tbody > tr:nth-child(8)';
  const ninthRowOfListings= 'body > div > div > div > table > tbody > tr:nth-child(9)';
  const tenthRowOfListings= 'body > div > div > div > table > tbody > tr:nth-child(10)';
  const eleventhRowOfListings= 'body > div > div > div > table > tbody > tr:nth-child(11)';
  const navMenuSelector ='#navbarColor04 > ul > li:nth-child(3) > a';
  const navMenuItem= '#navbarColor04 > ul > li:nth-child(3) > div > a:nth-child(4)';

  /* Navigating to our expected page "http://localhost:3000/instructor"*/

  before( ()=>{
    cy.exec('node electron-db-reset.js');
  })

  beforeEach(()=>{
    cy.visit('http://localhost:3000');
    cy.get(navMenuSelector, {timeout: 10000}).trigger('click');
    cy.get(navMenuItem, {timeout: 10000}).click();
  });


  /* checking the availability of instructor lists headers*/
  it('testInstructorListsAreShownUnderCertainHeaders  ', () => {
    cy.get(insListingsPageHeader).should('have.text', 'Manage Instructors');
    cy.get(tableFirstHeader).should('have.text', 'First Name');
    cy.get(tableSecondHeader).should('have.text', 'Last Name');
    cy.get(tableThirdHeader).should('have.text', 'Office Number');
    cy.get(tableFourthHeader).should('have.text', 'Phone Number');
    cy.get(tableFifthHeader).should('have.text', 'Email');
    cy.get(tableSixthHeader).should('have.text', 'Actions');
  });

  /* Test to confirm the availability of instructor's name according to the fixture data*/
  it('testAvailabilityOfAllInstructorInfo', ()=>{
    cy.get(firstRowOfListings).should('have.text', '\n                    Ben\n                    Benson\n                    123B.1\n                    (306)-456-6859\n                    benson@saskpolytech.ca\n\n                    \n                        Edit\n                        Delete\n                    \n                ');
    cy.get(secondRowOfListings).should('have.text', '\n                    Bryce\n                    Barrie\n                    123A.1\n                    (306)-456-5467\n                    barrie@saskpolytech.ca\n\n                    \n                        Edit\n                        Delete\n                    \n                ');
    cy.get(thirdRowOfListings).should('have.text', '\n                    Coralee\n                    Kaban\n                    123A.2\n                    (306)-567-5676\n                    kaban@saskpolytech.ca\n\n                    \n                        Edit\n                        Delete\n                    \n                ');
    cy.get(fourthRowOfListings).should('have.text', '\n                    Donovan\n                    Onishenko\n                    123B.1\n                    (306)-456-6859\n                    onishenko@saskpolytech.ca\n\n                    \n                        Edit\n                        Delete\n                    \n                ');
    cy.get(fifthRowOfListings).should('have.text', '\n                    Ernesto\n                    Basoalto\n                    123B.1\n                    (306)-456-6859\n                    basalto@saskpolytech.ca\n\n                    \n                        Edit\n                        Delete\n                    \n                ');
    cy.get(eighthRowOfListings).should('have.text', '\n                    Rick\n                    Caron\n                    123A.3\n                    (306)-123-7895\n                    caron@saskpolytech.ca\n\n                    \n                        Edit\n                        Delete\n                    \n                ');
    cy.get(ninthRowOfListings).should('have.text', '\n                    Ron\n                    New\n                    123B.0\n                    (306)-678-6585\n                    new@saskpolytech.ca\n\n                    \n                        Edit\n                        Delete\n                    \n                ');
    cy.get(sixthRowOfListings).should('have.text', '\n                    Jason\n                    Schmidt\n                    123B.1\n                    (306)-456-6859\n                    schmidt@saskpolytech.ca\n\n                    \n                        Edit\n                        Delete\n                    \n                ');
    cy.get(seventhRowOfListings).should('have.text', '\n                    Micheal\n                    Grzesina\n                    123B.1\n                    (306)-456-6859\n                    grzesina@saskpolytech.ca\n\n                    \n                        Edit\n                        Delete\n                    \n                ');
    cy.get(tenthRowOfListings).should('have.text', '\n                    Wade\n                    Lahoda\n                    123B.1\n                    (306)-456-6859\n                    wade@saskpolytech.ca\n\n                    \n                        Edit\n                        Delete\n                    \n                ');
    cy.get(eleventhRowOfListings).should('have.text', '\n                    firstName\n                    Holtslan\n                    125B.1\n                    (306)-456-6859\n                    holtslan@saskpolytech.ca\n\n                    \n                        Edit\n                        Delete\n                    \n                ');
  });

  /* Test to confirm the unavailability of new instructor's name (to be created/ added)  according to the fixture data*/
  it('testUnavailabilityOfNewInstructorInfo', ()=>{
    cy.contains('Bin').should('not.exist');
  });

  /* Test  "Add New Instructor" button navigates us to "Create New Instructor" modal, and it has required input boxes */
  it('testCreateNewInstructorModal ', () => {
    cy.get(createInsButton, {timeout: 10000}).click();
    cy.get(addNewInsModalHeader).should('have.text', 'Create New Instructor');
    cy.get(addInsModalFirstTextBoxLabel).should('have.text', 'First Name:');
    cy.get(addInsModalSecondTextBoxLabel).should('have.text', 'Last Name:');
    cy.get(addInsModalThirdTextBoxLabel).should('have.text', 'Office Number:');
    cy.get(addInsModalFourthTextBoxLabel).should('have.text', 'Phone Number:');
    cy.get(addInsModalFifthTextLabel).should('have.text', 'Email:');
  });


  /* Test to  create a new instructor Ben Benson and confirm the availability inside Instructor Listings*/
  it('testAddingInformationOfNewInstructor ', () => {
    cy.get(createInsButton).click();
    cy.get(newInsFirstNameInputTextBox).type('Bin');
    cy.get(newInsLastNameInputTextBox).type('Benson');
    cy.get(newInsOfficeNumInputBox).type('223A.1');
    cy.get(newInsPhoneNumInputBox).type('(123)-456-9655');
    cy.get(newInsEmailInputBox).type('bbenson@saskpolytech.ca');
    cy.get(CreateInstructorButtonOnNewInsModal ).click();
    cy.contains('Bin').should('exist');
  });

  /* Test to  edit instructor Ben Benson's name and confirm the availability of edited instructor inside Instructor Listings*/
  it('testEditInstructorInformation', () => {
    cy.wait(200);
    cy.get(insListEditButtonOnFirstColumn).click();
    cy.wait(200);
    cy.get(editModalHeader).should('have.text', 'Edit Existing Instructor');
    cy.get(firstTextBoxOnEditModal).clear();
    cy.wait(200);
    cy.get(firstTextBoxOnEditModal).type('John');
    cy.wait(200);
    cy.get(secondTextBoxOnEditModal).clear();
    cy.get(secondTextBoxOnEditModal).type('Doe');
    cy.get(saveButtonOnEditModal).click();
    cy.contains('John').should('exist');
  });

  /* Test to  delete instructor John's information and confirm the unavailability of deleted instructor inside Instructor Listings*/
  it('testDeleteInstructorButton  ', () => {
    cy.get(insListDeleteButtonOnFirstColumnForDeleteTest).click();
    cy.get(confirmDeleteButtonOnDeleteModal).click();
    cy.contains('John').should('not.exist');
  });
});
