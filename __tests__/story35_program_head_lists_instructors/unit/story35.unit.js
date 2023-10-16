const Instructor = require('../../../private/javascript/CourseOffering');
Instructor.sequelize.storage = ':memory:';


describe('firstName', () => {
    test('testThatFirstNameCanBeEntered', async function() {
        const instructorFName = 'Sally';
        const instructorLName = 'Sutherland'
        const instructor = await Instructor.create({
            firstName: instructorFName,
            lastName: instructorLName
        });

        expect(instructor).toBeTruthy(); //check that instructor Object is created
        expect(instructor.firstName).toBe(instructorFName); //check that instructor Object First name is correct
        expect(courseOffering.validate()).toBe({}); //check that no errors are thrown
    });
});


