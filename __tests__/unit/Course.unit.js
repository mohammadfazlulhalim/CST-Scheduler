const {sequelize} = require('../../datasource');
const testConst = require('../../constants').testConst
const Course = require('../../private/javascript/Course');
const {create} = require("hbs");
/**
 *These are tests for the courseCode attribute of Course
 */
describe('courseCode', () => {
  let course;
  let testCourse;
  let err = '';
  beforeAll(async function(){
    await Course.sync({force: true}); // wipes course table if it exists
    testCourse = testConst.course1; // test Course is created with the course properties defined in the constant.js file
  });

  test('testCreatingCourseWithAllValidInfo', async ()=>{
    try {
      course =await Course.create(testCourse);
    }catch (error){
      //if a validation error is thrown, fail the test with an error message
      err= error.message;
    }
    expect (course).toBeTruthy(); //check the course object is created.
    expect (course.courseCode).toBe(testCourse.courseCode); //check course object has the same course code as the testCourse
    expect (err).toBe(''); //check no error is thrown

    //delete course if created
    if (course){
      await course.destroy();
    }

  });
  test ('testCreatingCourseWithCourseCodeHaving4CharactersFollowedBy4Digits', async()=>{
   testCourse.courseCode= 'AAAA1111';

    try{
      course = await Course.create(testCourse);

    }catch (error){
      err=error.message;

    }
    expect (course).toBeTruthy(); //check the course object is created.
    //expect (course.courseCode).toBe(testCourse.courseCode); //check course object has the same course code as the testCourse
    expect (err).toBe(''); //check no error is thrown

  });

  test('testCreatingCourseWithCourseCodeHaving3CharactersFollowedBy3Digits', async()=>{
    testCourse.courseCode= 'AAA111';

    try{
      course = await Course.create(testCourse);

    }catch (error){
      err=error.message;

    }
    expect (course).toBeTruthy(); //check the course object is created.
    //expect (course.courseCode).toBe(testCourse.courseCode); //check course object has the same course code as the testCourse
    expect (err).toBe(''); //check no error is thrown


  });

  test('testCreatingCourseWithCourseCodeHaving5CharactersFollowedBy3Digits', async ()=>{
    testCourse.courseCode='AAAAA111';
    try{
      course= await Course.create(testCourse);
      console.log(course);
    }catch (error){
      err=error.message;
    }
    expect (course).toBeFalsy; //No course will be created
    expect (err).toBe('Validation error: Course Code can have 3-4 characters and 3-4 digits only');

  });

  test('testCreatingCourseWithCourseCodeHaving3CharacterFollowedBy5Digits ', async ()=>{
    testCourse.courseCode='AAA11111';
    try{
      course= await Course.create(testCourse);
      console.log(course);
    }catch (error){
      err=error.message;
    }
    expect (course).toBeFalsy; //No course will be created
    expect (err).toBe('Validation error: Course Code can have 3-4 characters and 3-4 digits only');

  });



});