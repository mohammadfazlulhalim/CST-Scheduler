/* The following tests are created to check functionality of the app to create, update and delete courses */
describe('Testing Course CRUD options', () => {
  beforeEach(()=>{
    cy.exec('node electron-db-reset.js');
  })
  it('testCourse', () => {
    // Visit the course page
    cy.visit('http://localhost:3000/course');

    // Click the button to add a new course
    cy.get('#createCourseButton').click();

    // Ensure the add course modal is visible
    cy.get('#addModal').should('be.visible');

    // Fill in course details
    cy.wait(100);
    cy.get('#cCourseCode').type('AAA111');
    cy.wait(200); // Waiting to ensure typing is complete
    cy.get('#cCourseName').type('Test Course');
    cy.get('#cCourseNumCredits').type('3');
    cy.get('#cCourseNumHoursPerWeek').type('2');

    // List of instructors for dropdown selection
    const instructorList = ['Barrie', 'Basoalto', 'Benson', 'Caron', 'Grzesina', 'Holtslan', 'Kaban', 'Lahoda', 'New', 'Onishenko', 'Schmidt'];

    // Loop through the instructor list to check dropdown options
    for (let i = 0; i < instructorList.length; i++) {
      const num = i + 1;
      cy.get('#cInstructor > option:nth-child(' + num + ')').should('have.text', instructorList[i]);
    }

    // Select an instructor
    cy.get('#cInstructor').select('Barrie');

    // Click the button to create the course
    cy.get('#createCourse').click();

    // Ensure the add course modal is hidden after submission
    cy.get('#addModal').should('be.hidden');

    // Check if the course details are displayed in the table
    cy.get('#table').within(() => {
      // Check if the first row in the table matches the added course details
      cy.get('tr:first-child > td').eq(0).should('contain.text', 'AAA111');
      cy.get('tr:first-child > td').eq(1).should('contain.text', 'Test Course');
      cy.get('tr:first-child > td').eq(2).should('contain.text', '3');
      cy.get('tr:first-child > td').eq(3).should('contain.text', '2');
      cy.get('tr:first-child > td').eq(4).should('contain.text', 'Bryce Barrie'); // Ensure instructor name matches
    });

    // Click the "Edit" button for the first row in the table
    cy.get('#table tr:first-child .editButton').click();

    // Edit course code
    cy.get('#eCourseCode').clear();
    cy.get('#eCourseCode').type('AAA222');

    // Click the "Save Changes" button
    cy.get('#editCourse').click();
    cy.wait(100); // Waiting to ensure the update is complete

    // Check if the edited course details are updated in the table
    cy.get('#table').within(() => {
      cy.wait (500);
      cy.get('tr:first-child > td').eq(0).should('contain.text', 'AAA222');
      cy.get('tr:first-child > td').eq(1).should('contain.text', 'Test Course');
      cy.get('tr:first-child > td').eq(2).should('contain.text', '3');
      cy.get('tr:first-child > td').eq(3).should('contain.text', '2');
      cy.get('tr:first-child > td').eq(4).should('contain.text', 'Bryce Barrie');
    });

    // Click the "Edit" button again
    cy.get('#table tr:first-child .editButton').click();

    // Ensure the edit modal is visible
    cy.get('#editModal').should('be.visible');
    cy.wait(100); // Waiting to ensure modal is fully loaded

    // Check if the edit form fields contain the correct values
    cy.get('#eCourseCode').should('have.value', 'AAA222');
    cy.get('#eCourseName').should('have.value', 'Test Course');
    cy.get('#eCourseNumCredits').should('have.value', '3');
    cy.get('#eCourseNumHoursPerWeek').should('have.value', '2');

    // Loop through the instructor list to check dropdown options in edit form
    for (let i = 0; i < instructorList.length; i++) {
      const num = i + 1;
      cy.get('#eInstructor > option:nth-child(' + num + ')').should('have.text', instructorList[i]);
    }

    // Clear the edit form fields
    cy.get('#eCourseCode').clear();
    cy.get('#eCourseName').clear();
    cy.get('#eCourseNumCredits').clear();
    cy.get('#eCourseNumHoursPerWeek').clear();

    // Click the "Save Changes" button in the edit modal
    cy.get('#editCourse').click();

    // Check if the edit form fields still contain the correct values after clearing
    cy.get('#eCourseCode').should('have.value', 'AAA222');
    cy.get('#eCourseName').should('have.value', 'Test Course');
    cy.get('#eCourseNumCredits').should('have.value', '3');
    cy.get('#eCourseNumHoursPerWeek').should('have.value', '2');

    // Check error messages for invalid input
    cy.get('.invalid-feedback').eq(0).should('have.text', 'Course Code can have 3-4 characters and 3-4 digits only');
    cy.get('.invalid-feedback').eq(1).should('have.text', 'Course Name must have 1 to 50 characters.');
    cy.get('.invalid-feedback').eq(2).should('have.text', 'Enter a whole number between 0 and 6 as a valid number of credits.');
    cy.get('.invalid-feedback').eq(3).should('have.text', 'Enter a whole number between 1 and 40 as a valid number of hours.');

    // Close the edit modal
    cy.wait(200);
    cy.get('#editModal > .modal-dialog > .modal-content > .modal-header > .close').click();

    // Click the "Delete" button for the first row in the table
    cy.get('#table tr:first-child .deleteButton').click();
    cy.get('#deleteCourse').click();

    // Ensure the deleted course is no longer in the table
    cy.get('#table').within(() => {
      cy.get('tr:first-child > td').eq(0).should('contain.text', 'CDBM280');
      cy.get('tr:first-child > td').eq(1).should('contain.text', 'Database Management Systems');
      cy.get('tr:first-child > td').eq(2).should('contain.text', '5');
      cy.get('tr:first-child > td').eq(3).should('contain.text', '5');
      cy.get('tr:first-child > td').eq(4).should('contain.text', 'Ron New');
    });
  });


  /* it('testAddingInformationOfNewCourseWithEmptyTestBox ', () => {
    cy.get(createCourseButton).click();
    cy.wait(1000);
    cy.get(createCourseButtonOnNewInsModal ).click();
    cy.get(errorMessageForCourseCode).should('have.text', 'Course Code can have 3-4 characters and 3-4 digits only');
    cy.get(errorMessageForCourseName).should('have.text', 'Course Name must have 1 to 50 characters.');
    cy.get(errorMessageForCourseCredit).should('have.text', 'Enter a whole number between 0 and 6 as a valid number of credits.');
    cy.get(errorMessageForCourseHours).should('have.text', 'Enter a whole number between 1 and 40 as a valid number of hours.');
  }); */


/*   // these are the selectors for HTML elements
  const addNewCourseModalHeader='#addModalLabel';
  const courseListingsPageHeader='body > div > div > div > h1';
  const tableFirstHeader ='body > div > div > div > table > thead > tr > th:nth-child(1)';
  const tableSecondHeader='body > div > div > div > table > thead > tr > th:nth-child(2)';
  const tableThirdHeader='body > div > div > div > table > thead > tr > th:nth-child(3)';
  const tableFourthHeader= 'body > div > div > div > table > thead > tr > th:nth-child(4)';
  const tableFifthHeader='body > div > div > div > table > thead > tr > th:nth-child(5)';
  const tableSixthHeader='body > div > div > div > table > thead > tr > th:nth-child(6)';
  const addCourseModalFirstTextBoxLabel='#addModal > div > div > form > div.modal-body > label:nth-child(1)';
  const addCourseModalSecondTextBoxLabel='#addModal > div > div > form > div.modal-body > label:nth-child(4)';
  const addCourseModalThirdTextBoxLabel ='#addModal > div > div > form > div.modal-body > label:nth-child(7)';
  const addCourseModalFourthTextBoxLabel ='#addModal > div > div > form > div.modal-body > label:nth-child(10)';
  const addCourseModalFifthTextBoxLabel ='#addModal > div > div > form > div.modal-body > label:nth-child(10)';
  const createCourseButton= 'body > div > div > div > button';
  const newCourseCourseCodeInputTextBox='#cCourseCode';
  const newCourseCourseNameInputTextBox='#cCourseName';
  const newCourseNumOfCreditsInputBox='#cCourseNumCredits';
  const newCourseCourseNumHoursPerWeekInputBox='#cCourseNumHoursPerWeek';
  const createCourseButtonOnNewInsModal='#createCourse';
  const courseListEditButtonOnFourthColumn = '#\\31 6edit';
  const editModalHeader='#editModalLabel';
  const firstTextBoxOnEditModal='#eCourseCode';
  const secondTextBoxOnEditModal ='#eCourseName';
  const saveButtonOnEditModal ='#editCourse';
  const newCourseCode=' #\\31 7courseCode';
  const courseListDeleteButtonOnFourthColumnForDeleteTest ='#\\31 6delete';
  const confirmDeleteButtonOnDeleteModal='#deleteCourse';
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
  const twelfthRowOfListings= 'body > div > div > div > table > tbody > tr:nth-child(12)';
  const thirteenthRowOfListings= 'body > div > div > div > table > tbody > tr:nth-child(13)';
  const fourteenthRowOfListings= 'body > div > div > div > table > tbody > tr:nth-child(14)';
  const fifteenthRowOfListings= 'body > div > div > div > table > tbody > tr:nth-child(15)';
  const sixteenthRowOfListings= 'body > div > div > div > table > tbody > tr:nth-child(16)';
  const errorMessageForCourseCode='#addModal > div > div > form > div.modal-body > div:nth-child(3)';
  const errorMessageForCourseName='#addModal > div > div > form > div.modal-body > div:nth-child(6)';
  const errorMessageForCourseCredit='#addModal > div > div > form > div.modal-body > div:nth-child(9)';
  const errorMessageForCourseHours='#addModal > div > div > form > div.modal-body > div:nth-child(12)';


  const navMenuSelector ='#navbarColor04 > ul > li:nth-child(3) > a';
  const navMenuItem= '#navbarColor04 > ul > li:nth-child(3) > div > a:nth-child(2)';
  const fourthItemOnTheCourseList='';

  /!* Navigating to our expected page "http://localhost:3000/course"*!/

  beforeEach(()=>{
    cy.visit('http://localhost:3000/course');
  });


  it('testCourseListsAreShownUnderCertainHeaders  ', () => {
    cy.visit('http://localhost:3000');
    cy.get(navMenuSelector, {timeout: 10000}).trigger('click');
    cy.get(navMenuItem, {timeout: 10000}).click();

    /!* checking the availability of course lists headers*!/
    cy.get(courseListingsPageHeader).should('have.text', 'Course Listings');
    cy.get(tableFirstHeader).should('have.text', 'Course Code');
    cy.get(tableSecondHeader).should('have.text', 'Course Name');
    cy.get(tableThirdHeader).should('have.text', 'Number of Credits');
    cy.get(tableFourthHeader).should('have.text', 'Number of Hours');
    cy.get(tableFifthHeader).should('have.text', 'Preferred Instructor');
    cy.get(tableSixthHeader).should('have.text', 'Actions');

    /!* Test to confirm the availability of course's name according to the fixture data*!/
    cy.get(firstRowOfListings).should('have.text', '\n                    CDBM280\n                    Database Management Systems\n                    5\n                    5\n                    \n                        Edit\n                        Delete\n                    \n                ');
    cy.get(secondRowOfListings).should('have.text', '\n                    COHS190\n                    Hardware\n                    1\n                    1\n                    \n                        Edit\n                        Delete\n                    \n                ');
    cy.get(thirdRowOfListings).should('have.text', '\n                    COHS280\n                    Enterprise Systems Support\n                    3\n                    3\n                    \n                        Edit\n                        Delete\n                    \n                ');
    cy.get(fourthRowOfListings).should('have.text', '\n                    COOS291\n                    Advanced Operating Systems\n                    5\n                    5\n                    \n                        Edit\n                        Delete\n                    \n                ');
    cy.get(fifthRowOfListings).should('have.text', '\n                    COOS293\n                    Systems Administration 2\n                    4\n                    4\n                    \n                        Edit\n                        Delete\n                    \n                ');
    cy.get(sixthRowOfListings).should('have.text', '\n                    COOS294\n                    Cloud Infrastructure Administration\n                    4\n                    4\n                    \n                        Edit\n                        Delete\n                    \n                ');
    cy.get(seventhRowOfListings).should('have.text', '\n                    COSA280\n                    IT Development Project 1\n                    3\n                    3\n                    \n                        Edit\n                        Delete\n                    \n                ');
    cy.get(eighthRowOfListings).should('have.text', '\n                    COSA290\n                    IT Development Project 2\n                    6\n                    6\n                    \n                        Edit\n                        Delete\n                    \n                ');
    cy.get(ninthRowOfListings).should('have.text', '\n                    COSC292\n                    Advanced Programming 2\n                    4\n                    4\n                    \n                        Edit\n                        Delete\n                    \n                ');
    cy.get(tenthRowOfListings).should('have.text', '\n                    COSC295\n                    Advanced Mobile Application Programming\n                    4\n                    4\n                    \n                        Edit\n                        Delete\n                    \n                ');
    cy.get(eleventhRowOfListings).should('have.text', '\n                    CPMG290 \n                    IT Development Project Management 2\n                    2\n                    2\n                    \n                        Edit\n                        Delete\n                    \n                ');
    cy.get(twelfthRowOfListings).should('have.text', '\n                    CSEC280\n                    Security 1\n                    4\n                    4\n                    \n                        Edit\n                        Delete\n                    \n                ');
    cy.get(thirteenthRowOfListings).should('have.text', '\n                    CWEB280\n                    Internet Programming/Web Applications 2\n                    6\n                    5\n                    \n                        Edit\n                        Delete\n                    \n                ');
    cy.get(fourteenthRowOfListings).should('have.text', '\n                    MATH282\n                    Mathematics of Computation\n                    3\n                    3\n                    \n                        Edit\n                        Delete\n                    \n                ');
    cy.get(fifteenthRowOfListings).should('have.text', '\n                    SEM283\n                    Seminar\n                    1\n                    1\n                    \n                        Edit\n                        Delete\n                    \n                ');
    cy.get(sixteenthRowOfListings).should('have.text', '\n                    TCOM291\n                    Career Path Search\n                    1\n                    1\n                    \n                        Edit\n                        Delete\n                    \n                ');
  });

  /!* Test to confirm the unavailability of new course's name (to be created/ added)  according to the fixture data*!/
  it('testUnavailabilityOfNewCourseInfo', ()=>{
    cy.contains('CSEC290').should('not.exist');
  });

  /!* Test  "Add New Course" button navigates us to "Create New Course" modal, and it has required input boxes *!/
  it('testCreateNewCourseModal ', () => {
    cy.get(createCourseButton).click();
    cy.get(addNewCourseModalHeader).should('have.text', 'Create New Course');
    cy.get(addCourseModalFirstTextBoxLabel).should('have.text', 'Course Code:');
    cy.get(addCourseModalSecondTextBoxLabel).should('have.text', 'Course Name:');
    cy.get(addCourseModalThirdTextBoxLabel).should('have.text', 'Number of Credits:');
    cy.get(addCourseModalFourthTextBoxLabel).should('have.text', 'Number of Hours Per Week:');
    cy.get(addCourseModalFifthTextBoxLabel).should('have.text', 'Preferred Instructor:');
  });


  /!* Test to  create a new course CSEC280 and confirm the availability inside course Listings*!/
  it('testAddingInformationOfNewCourse ', () => {
    cy.get(createCourseButton).click();
    cy.get(newCourseCourseCodeInputTextBox).type('CSEC290');
    cy.wait(1000);
    cy.get(newCourseCourseNameInputTextBox).type('Advanced Security');
    cy.get(newCourseNumOfCreditsInputBox).type('4');
    cy.get(newCourseCourseNumHoursPerWeekInputBox).type('4');
    const courseList = ['CDBM280', 'COHS190', 'COHS280', 'COOS291', 'COOS293', 'COOS294', 'COSA280', 'COSA290', 'COSC292', 'COSC295', 'CPMG290 ', 'CSEC280', 'CWEB280', 'MATH282', 'SEM283', 'TCOM291'];
    for (let i = 0; i < instructorList.length; i++) {
      const nChild = i + 1;
      cy.get('#cPreferredInstructor > option:nth-child(' + nChild + ')').should('have.value', courseList[i]);
    }
    cy.get(createCourseButtonOnNewInsModal ).click();
    cy.get(newCourseCode).should('have.text', 'CSEC290');
  });

  /!* Test to  create a new course CSEC280 and confirm the availability inside course Listings*!/
  it('testAddingInformationOfNewCourseWithEmptyTestBox ', () => {
    cy.get(createCourseButton).click();
    cy.wait(1000);
    cy.get(createCourseButtonOnNewInsModal ).click();
    cy.get(errorMessageForCourseCode).should('have.text', 'Course Code can have 3-4 characters and 3-4 digits only');
    cy.get(errorMessageForCourseName).should('have.text', 'Course Name must have 1 to 50 characters.');
    cy.get(errorMessageForCourseCredit).should('have.text', 'Enter a whole number between 0 and 6 as a valid number of credits.');
    cy.get(errorMessageForCourseHours).should('have.text', 'Enter a whole number between 1 and 40 as a valid number of hours.');
  });

  /!* Test to  edit Course CSEC290's course code and course name and confirm the availability of edited course inside Course Listings*!/
  it('testEditCourseInformation', () => {
    cy.get(courseListEditButtonOnFourthColumn).click();
    cy.get(editModalHeader).should('have.text', 'Edit Existing Course');
    cy.get(firstTextBoxOnEditModal).clear();
    cy.get(firstTextBoxOnEditModal).type('CSEC295');
    cy.get(secondTextBoxOnEditModal).clear();
    cy.get(secondTextBoxOnEditModal).type('More Advanced Security');
    for (let i = 0; i < instructorList.length; i++) {
      const nChild = i + 1;
      cy.get('#ePreferredInstructor > option:nth-child(' + nChild + ')').should('have.value', courseList[i]);
    }

    cy.get(saveButtonOnEditModal).click();
    cy.contains('CSEC295').should('exist');
    // cy.get(newCourseCode).should('have.text', 'CSEC295');
  });

  /!* Test to  delete course CSEC290's information and confirm the unavailability of deleted course inside Course Listings*!/
  it('testDeleteCourseOption  ', () => {
    cy.get(courseListDeleteButtonOnFourthColumnForDeleteTest).click();
    cy.get(confirmDeleteButtonOnDeleteModal).click();
    cy.contains('CSEC295').should('not.exist');
  }); */
});
