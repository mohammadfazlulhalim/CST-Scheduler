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
  beforeEach(async function(){
    await Course.sync({force: true}); // wipes course table if it exists
    testCourse = testConst.course1; // test Course is created with the course properties defined in the constant.js file
    err=''; //empty error message (if any)
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
    expect (err.length).toBe(0); //check no error is thrown

  });

  test('testCreatingCourseWithCourseCodeHaving3CharactersFollowedBy3Digits', async()=>{
    testCourse.courseCode= 'AAA111';

    try{
      course = await Course.create(testCourse);

    }catch (error){
      err=error.message;

    }
    expect (course).toBeTruthy(); //check the course object is created.
    expect (err.length).toBe(0); //check no error is thrown


  });

  test('testCreatingCourseWithCourseCodeHaving5CharactersFollowedBy3Digits', async ()=>{

    try{
      testCourse.courseCode='AAAAA111';
      course= await Course.create(testCourse);
    }catch (error){
      err=error.message;
    }
    expect (course).toBeFalsy; //No course will be created
    expect (err).toBe('Validation error: Course Code can have 3-4 characters and 3-4 digits only');

  });

  test('testCreatingCourseWithCourseCodeHaving3CharacterFollowedBy5Digits ', async ()=>{

    try{
      testCourse.courseCode='AAA11111';
      course= await Course.create(testCourse);
    }catch (error){
      err=error.message;
    }
    expect (course).toBeFalsy; //No course will be created
    expect (err).toBe('Validation error: Course Code can have 3-4 characters and 3-4 digits only');

  });



});

describe ('courseName', ()=>{
  let course;
  let err='';
  let testCourse;
  beforeEach(async()=>{
    await Course.sync({force: true}); // wipes course table if it exists
    testCourse= testConst.course1; //test Course is created with the course properties defined in the constant.js file
    err='';  //empty the error message (if any)
  });

  test('testCreatingCourseWithCourseNameUpperLimit', async()=>{

    try {
      testCourse.courseName ='A'.repeat(50)
      course = await Course.create(testCourse);
    }catch(error){
      err =error.message;
    }
    expect (err.length).toBe(0);
    expect (course).toBeTruthy(); //check the course object is created.
  });
  test('testCreatingCourseWithCourseNameOverUpperLimit', async()=>{

    try {
      testCourse.courseName ='A'.repeat(51);
      course = await Course.create(testCourse);
    }catch(error){
      err =error.message;
    }
    expect (err).toBe('Validation error: Course Name must have 1 to 50 characters.');
    expect (course).toBeFalsy(); //No course will be created
  });

  test('testCreatingCourseWithEmptyCourseName', async()=>{

    try {
      testCourse.courseName ='';
      course = await Course.create(testCourse);
    }catch(error){
      err =error.message;
    }
    expect (err).toBe('Validation error: Course Name must have 1 to 50 characters.');
    expect (course).toBeFalsy(); //No course will be created
  });

});

describe('courseNumCredits', ()=>{
  let course;
  let err ='';
  let testCourse;
  beforeEach(async()=>{
    await Course.sync({force: true}); // wipes course table if it exists
    testCourse= testConst.course1; //test Course is created with the course properties defined in the constant.js file
    err='';  //empty the error message (if any)
  });

  test('testCreatingCourseWithCreditUnitsHavingEmptyFields ', async ()=>{

    try {
      testCourse.courseNumCredits=null;
      course = await Course.create(testCourse);
    }catch (error){
      err= error.message;
    }
    expect (err).toBe('notNull Violation: Course.courseNumCredits cannot be null');
    expect (course).toBeFalsy(); //No course will be created
  });
  test('testCreatingCourseWithCreditUnitsHavingString', async ()=>{

    try {
      testCourse.courseNumCredits='six';
      course = await Course.create(testCourse);
    }catch (error){
      err= error.message;
    }

    expect (err).toBe('Validation error: Enter a whole number between 0 and 6 as a valid number of credits.');
    expect (course).toBeFalsy(); //No course will be created
  });

  test('testCreatingCourseWithCreditUnitsHavingDecimalNumber', async ()=>{

    try {
      testCourse.courseNumCredits=2.5;
      course = await Course.create(testCourse);
    }catch (error){
      err= error.message;
    }

    expect (err).toBe('Validation error: Enter a whole number between 0 and 6 as a valid number of credits.');
    expect (course).toBeFalsy(); //No course will be created
  });

  test('testCreatingCourseWithCreditUnitOverLimit', async ()=>{
    try{
     testCourse.courseNumCredits=7;
      course= await Course.create(testCourse);
      }catch(error){
         err= error.message;
        }
        expect (err).toBe('Validation error: Enter a whole number between 0 and 6 as a valid number of credits.');
         expect(course).toBeFalsy();

  });

  test('testCreatingCourseWithCreditUniUpperLimit', async ()=>{
    try{
      testCourse.courseNumCredits=6;
      course= await Course.create(testCourse);
    }catch(error){
      err= error.message;
      }
    expect (err.length).toBe(0);
    expect(course).toBeTruthy();

  });

  test('testCreatingCourseWithCreditUnitwithLowerLimit', async ()=>{
    try{
      testCourse.courseNumCredits=0;
      course= await Course.create(testCourse);
    }catch(error){
      err= error.message;
    }
    expect (err.length).toBe(0);
    expect(course).toBeTruthy();

  });
});

 describe('courseNumHoursPerWeek', ()=>{
   let course;
   let err ='';
   let testCourse;

   beforeEach(async()=>{
     await Course.sync({force: true}); // wipes course table if it exists
     testCourse= testConst.course1; //test Course is created with the course properties defined in the constant.js file
     err='';  //empty the error message (if any)
   });

   test ('testCreatingCourseWithEmptyCourseNumberOfHoursPerWeek', async()=>{
     try{
       testCourse.courseNumHoursPerWeek=null;
       course= await Course.create(testCourse);
     }catch(error){
       err= error.message;
     }
     expect (err).toBe('notNull Violation: Course.courseNumHoursPerWeek cannot be null');
     expect(course).toBeFalsy();

   });
   test ('testCreatingCourseWithCourseNumberOfHoursHavingString ', async()=>{
     try{
       testCourse.courseNumHoursPerWeek="Twenty";
       course= await Course.create(testCourse);
     }catch(error){
       err= error.message;
     }
     expect (err).toBe('Validation error: Enter a whole number between 1 and 168 as a valid number of hours.');
     expect(course).toBeFalsy();

   });

   test ('testCreatingCourseWithCourseNumberOfHoursHavingDecimal ', async()=>{
     try{
       testCourse.courseNumHoursPerWeek=20.5;
       course= await Course.create(testCourse);
     }catch(error){
       err= error.message;
     }
     expect (err).toBe('Validation error: Enter a whole number between 1 and 168 as a valid number of hours.');
     expect(course).toBeFalsy();

   });

   test ('testCreatingCourseWithCourseNumberOfHoursUpperLimit ', async()=>{
     try{
       testCourse.courseNumHoursPerWeek=168;
       course= await Course.create(testCourse);
     }catch(error){
       err= error.message;
     }
     expect (err.length).toBe(0);
     expect(course).toBeTruthy();

   });

   test ('testCreatingCourseWithCourseNumberOfHoursLowerLimit', async()=>{
     try{
       testCourse.courseNumHoursPerWeek=1;
       course= await Course.create(testCourse);
     }catch(error){
       err= error.message;
     }
     expect (err.length).toBe(0);
     expect(course).toBeTruthy();

   });
   test ('testCreatingCourseWithCourseNumberOfHoursOverLimit', async()=>{
     try{
       testCourse.courseNumHoursPerWeek=169;
       course= await Course.create(testCourse);
     }catch(error){
       err= error.message;
     }
     expect (err).toBe('Validation error: Enter a whole number between 1 and 168 as a valid number of hours.');
     expect(course).toBeTruthy();

   });

   test ('testCreatingCourseWithCourseNumberOfHoursBelowLimit ', async()=>{
     try{
       testCourse.courseNumHoursPerWeek=0;
       course= await Course.create(testCourse);
     }catch(error){
       err= error.message;
     }
     expect (err).toBe('Validation error: Enter a whole number between 1 and 168 as a valid number of hours.');
     expect(course).toBeTruthy();

   });

 });
