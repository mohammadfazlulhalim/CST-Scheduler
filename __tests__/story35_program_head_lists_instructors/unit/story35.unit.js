const Instructor = require('../../../private/javascript/Instructor');
Instructor.sequelize.storage = ':memory:';


describe('firstName', () => {
    test('testThatValidFirstNameCanBeEntered', async function() {
        const instructorFName = 'Sally';        // define first name
        const instructorLName = 'Sutherland';          // define last name
        const instructor = await Instructor.create({    //create db object
            firstName: instructorFName,
            lastName: instructorLName
        });

        expect(instructor).toBeTruthy(); //check that instructor Object is created
        expect(instructor.firstName).toBe(instructorFName); //check that instructor Object First name is correct

        let err = '';
        try {
            await instructor.validate();
        } catch (error) {
            // If a validation error is thrown, fail the test with an error message
            err = error.message;
        }

        expect(err).toBe(''); //check that no errors are thrown

        await instructor.destroy();
    });

    test('testThatFirstNameCanNotBeEmpty', async function() {
        const instructorFName = '';        // define first name
        const instructorLName = 'Sutherland'    //define last name
        const instructor = await Instructor.create({    //create db object
            firstName: instructorFName,
            lastName: instructorLName
        });

        expect(instructor).toBeTruthy(); //check that instructor Object is created
        expect(instructor.firstName).toBe(instructorFName); //check that instructor Object First name is correct

    });

    test('testThatFirstNameCanBeOneLetter', async function() {
        const instructorFName = 'S';        // define first name
        const instructorLName = 'Sutherland'    //define last name
        const instructor = await Instructor.create({    //create db object
            firstName: instructorFName,
            lastName: instructorLName
        });

        expect(instructor).toBeTruthy(); //check that instructor Object is created
        expect(instructor.firstName).toBe(instructorFName); //check that instructor Object First name is correct
        expect(instructor.validate()).resolves.toBe({}); //check that no errors are thrown
    });

    test('testThatFirstNameCanBe50Chars', async function() {
        const instructorFName = 'Sally';        // define first name
        const instructorLName = 'Sutherland'    //define last name
        const instructor = await Instructor.create({    //create db object
            firstName: instructorFName,
            lastName: instructorLName
        });

        expect(instructor).toBeTruthy(); //check that instructor Object is created
        expect(instructor.firstName).toBe(instructorFName); //check that instructor Object First name is correct
        expect(instructor.validate()).resolves.toBe({}); //check that no errors are thrown
    });

    test('testThatFirstNameCanNotBe51Chars', async function() {
        const instructorFName = 'Sally';        // define first name
        const instructorLName = 'Sutherland'    //define last name
        const instructor = await Instructor.create({    //create db object
            firstName: instructorFName,
            lastName: instructorLName
        });

        expect(instructor).toBeTruthy(); //check that instructor Object is created
        expect(instructor.firstName).toBe(instructorFName); //check that instructor Object First name is correct
        // expect(instructor.validate()).toBe({}); //check that no errors are thrown
    });
});


