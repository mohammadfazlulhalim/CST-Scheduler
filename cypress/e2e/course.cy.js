/*The following tests are created to check functionality of the app to create, update and delete courses */
describe('Testing Course CRUD options', () => {

    //these are the selectors for HTML elements
    const addNewCourseModalHeader='#addModalLabel';
    const courseListingsPageHeader='body > div > div > div > h1';
    const tableFirstHeader ='body > div > div > div > table > thead > tr > th:nth-child(1)';
    const tableSecondHeader='body > div > div > div > table > thead > tr > th:nth-child(2)';
    const tableThirdHeader='body > div > div > div > table > thead > tr > th:nth-child(3)';
    const tableFourthHeader= 'body > div > div > div > table > thead > tr > th:nth-child(4)';
    const tableFifthHeader='body > div > div > div > table > thead > tr > th:nth-child(5)';
    const addCourseModalFirstTextBoxLabel='#addModal > div > div > form > div.modal-body > label:nth-child(2)';
    const addCourseModalSecondTextBoxLabel='#addModal > div > div > form > div.modal-body > label:nth-child(5)';
    const addCourseModalThirdTextBoxLabel ='#addModal > div > div > form > div.modal-body > label:nth-child(8)';
    const addCourseModalFourthTextBoxLabel ='#addModal > div > div > form > div.modal-body > label:nth-child(11)';
    const createCourseButton= 'body > div > div > div > button';
    const newCourseCourseCodeInputTextBox='#cCourseCode';
    const newCourseCourseNameInputTextBox='#cCourseName';
    const newCourseNumOfCreditsInputBox='#cCourseNumCredits';
    const newCourseCourseNumHoursPerWeekInputBox='#cCourseNumHoursPerWeek';
    const createCourseButtonOnNewInsModal='#createCourse';
    const courseListEditButtonOnFourthColumn = '#\\34 2edit';
    const editModalHeader='#addModalLabel';
    const firstTextBoxOnEditModal='#eCourseCode'
    const secondTextBoxOnEditModal ='#eCourseName';
    const saveButtonOnEditModal ='#editCourse';
    const courseListDeleteButtonOnFourthColumnForDeleteTest ='#\\34 2delete';
    const confirmDeleteButtonOnDeleteModal='#deleteCourse';
    const firstRowOfListings= 'body > div > div > div > table > tbody > tr:nth-child(1)';
    const secondRowOfListings= 'body > div > div > div > table > tbody > tr:nth-child(2)';
    const thirdRowOfListings= 'body > div > div > div > table > tbody > tr:nth-child(3)';
    const fourthRowOfListings= 'body > div > div > div > table > tbody > tr:nth-child(4)';
    const fifthRowOfListings= 'body > div > div > div > table > tbody > tr:nth-child(5)';
    const sixthRowOfListings= 'body > div > div > div > table > tbody > tr:nth-child(6)';
    const navMenuSelector ='#navbarColor04 > ul > li:nth-child(3) > a';
    const navMenuItem= '#navbarColor04 > ul > li:nth-child(4) > div > a:nth-child(4)';
    const fourthItemOnTheCourseList='';

    /* Navigating to our expected page "http://localhost:3000/course"*/

    beforeEach(()=>{
        cy.visit('http://localhost:3000');
        cy.get(navMenuSelector,{timeout:10000}).trigger('click')
        cy.get(navMenuItem, {timeout:10000}).click();
    });

    /* checking the availability of course lists headers*/
    it('testCourseListsAreShownUnderCertainHeaders  ', () => {
        cy.get(courseListingsPageHeader).should('have.text', 'Instructor Listings');
        cy.get(tableFirstHeader).should('have.text', 'Course Code ');
        cy.get(tableSecondHeader).should('have.text', 'Course Name');
        cy.get(tableThirdHeader).should('have.text', 'Number of Credits');
        cy.get(tableFourthHeader).should('have.text', 'Number of Hours Per Week');
        cy.get(tableFifthHeader).should('have.text', 'Action');

    })

    /* Test to confirm the availability of course's name according to the fixture data*/
    it('testAvailabilityOfAllCourseInfo',()=>{
        cy.get(firstRowOfListings).should('have.text', '\n                    CDBM280\n                    Database Management Systems\n                    5\n                    5\n\n                              Edit\n                        Delete\n                    \n                ');
        cy.get(secondRowOfListings).should ('have.text', '\n                    COHS280\n                    Internet Programming/Web Applications 2\n                    6\n                    5\n\n                              Edit\n                        Delete\n                    \n                ');
        cy.get (thirdRowOfListings).should ('have.text', '\n                    COSA280\n                    IT Development Project 1\n                    3\n                    3\n\n                              Edit\n                        Delete\n                    \n                ');
        cy.get (fourthRowOfListings).should ('have.text', '\n                    MATH282\n                    Mathematics of Computation\n                    3\n                    3\n\n                              Edit\n                        Delete\n                    \n                ');
        cy.get (fifthRowOfListings).should ('have.text', '\n                    SEM283\n                    Seminar\n                    1\n                    1\n\n                              Edit\n                        Delete\n                    \n                ');

    })

    /* Test to confirm the unavailability of new course's name (to be created/ added)  according to the fixture data*/
    it ('testUnavailabilityOfNewCourseInfo',()=>{
        cy.contains('CSEC280').should('not.exist');


    })

    /* Test  "Add New Course" button navigates us to "Create New Course" modal, and it has required input boxes */
    it('testCreateNewCourseModal ', () => {
        cy.get(createCourseButton).click();
        cy.get(addNewCourseModalHeader).should('have.text', 'Create New Course');
        cy.get(addCourseModalFirstTextBoxLabel).should('have.text', 'Course Code:');
        cy.get(addCourseModalSecondTextBoxLabel).should('have.text', 'Course Name:');
        cy.get(addCourseModalThirdTextBoxLabel).should('have.text', 'Number of Credits:');
        cy.get(addCourseModalFourthTextBoxLabel).should('have.text', 'Number of Hours Per Week:');
    });


    /* Test to  create a new course CSEC280 and confirm the availability inside course Listings*/
    it('testAddingInformationOfNewCourse ', () => {
        cy.get(createCourseButton).click();
        cy.get(newCourseCourseCodeInputTextBox).type('CSEC280');
        cy.get(newCourseCourseNameInputTextBox).type('Security');
        cy.get(newCourseNumOfCreditsInputBox).type('4');
        cy.get(newCourseCourseNumHoursPerWeekInputBox).type('4');
        cy.get(createCourseButtonOnNewInsModal ).click();
        cy.get(fourthItemOnTheCourseList).should('have.text', 'CSEC280');
    });

    /* Test to  edit Course CSEC280's course code and course name and confirm the availability of edited course inside Course Listings*/
    it('testEditCourseInformation', () => {
        cy.get(courseListEditButtonOnFourthColumn).click();
        cy.get(editModalHeader).should('have.text', 'Edit Existing Course');
        cy.get(firstTextBoxOnEditModal).clear();
        cy.get(firstTextBoxOnEditModal).type('CSEC290');
        cy.get(secondTextBoxOnEditModal).clear();
        cy.get(secondTextBoxOnEditModal).type('Advanced Security');
        cy.get(saveButtonOnEditModal).click();
        cy.get(fourthItemOnTheCourseList).should('have.text', 'CSEC280');
    });

    /* Test to  delete course CSEC290's information and confirm the unavailability of deleted course inside Course Listings*/
    it('testDeleteCourseButton  ', () => {

        cy.get(courseListDeleteButtonOnFourthColumnForDeleteTest).click();
        cy.get(confirmDeleteButtonOnDeleteModal).click();
        cy.contains('CSEC290').should('not.exist');

    });
});