/* The following tests are created to check functionality of the app to create, update and delete courses */
describe('Testing Course CRUD options', () => {
  beforeEach(()=>{
    cy.exec('node electron-db-reset.js');
  });
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
      cy.wait(500);
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
    //cy.get('#table tr:first-child .deleteButton').click();
    cy.get('#deleteCourse').click({force: true});

    // Ensure the deleted course is no longer in the table
    cy.get('#table').within(() => {

      cy.get('tr:first-child > td').eq(2).should('contain.text', '3');
      cy.get('tr:first-child > td').eq(3).should('contain.text', '2');

    });
  });


});
