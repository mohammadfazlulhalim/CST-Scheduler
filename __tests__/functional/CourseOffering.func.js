const CourseOffering = require('../../private/javascript/CourseOffering');
const testConst = require('../../constants').testConst;

escribe('group', () => {
    let testUser;
    // set up a valid user
    beforeEach(async function() {
        // drop the table and re-create it
        await CourseOffering.sync({force: true});
        testUser = testConst.courseOffering1;
    });

    test('testThatGroupWithOneLetterIsValid', async function() {
        const groupLetter = 'A';
        testUser.group = groupLetter;
        const courseOffering = await CourseOffering.create(testUser);

        expect(courseOffering).toBeTruthy();
        expect(courseOffering.group).toBe(groupLetter);

        // if valid, validate() returns the object it was validating
        // if invalid, it returns errors
        expect(await courseOffering.validate()).toBe(courseOffering);
    });

});
