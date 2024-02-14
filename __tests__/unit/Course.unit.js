const {sequelize} = require('../../datasource');
const Course = require('../../private/javascript/Course');
const course1 = require('../../fixtures/Course.fix').course1;

/**
 *These are tests for the courseCode attribute of Course
 */
describe('courseCode', () => {
  let course;
  let testCourse;
  let err = '';
  let errCount;
  beforeEach(async function(){
    await Course.sync({force: true}); // wipes course table if it exists
    testCourse = course1; // test Course is created with the course properties defined in the constant.js file
    err=''; //empty error message (if any)
  });

/**
 * test creating course with valid information. we are using the constant.js file for the valid information
  */
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

  /**
   * test creating course with valid courseCode having upper limit of alphabetical characters and upper limits of numeric characters.
   * we are using the constant.js file for other valid information
   */
  test ('testCreatingCourseWithCourseCodeHaving4CharactersFollowedBy4Digits', async()=>{
   testCourse.courseCode= 'AAAA1111';

    try{
      course = await Course.create(testCourse);

    }catch (error){
      err=error.message;

    }
    expect (course).toBeTruthy(); //check the course object is created.
    expect (err).toBe(''); //check no error is thrown

  });

  /**
   * test creating course with valid courseCode having lower limit of alphabetical characters and lower limits of numeric characters.
   * we are using the constant.js file for other valid information
   */

  test('testCreatingCourseWithCourseCodeHaving3CharactersFollowedBy3Digits', async()=>{
    testCourse.courseCode= 'AAA111';

    try{
      course = await Course.create(testCourse);

    }catch (error){
      err=error.message;
      errCount=error.errors.length;

    }
    expect (course).toBeTruthy(); //check the course object is created.
    expect (err).toBe(''); //check no error is thrown


  });

  /**
   * test creating course with invalid courseCode having excess alphabetical characters.
   * we are using the constant.js file for other valid information
   */

  test('testCreatingCourseWithCourseCodeHaving5CharactersFollowedBy3Digits', async ()=>{

    try{
      testCourse.courseCode='AAAAA111';
      course= await Course.create(testCourse);
    }catch (error){
      err=error.message;
      errCount= error.errors.length;
    }
    expect (course).toBeFalsy; //No course will be created
    expect (errCount).toBe (1);
    expect (err).toBe('Validation error: Course Code can have 3-4 characters and 3-4 digits only');

  });

  /**
   * test creating course with invalid courseCode having excess numeric characters.
   * we are using the constant.js file for other valid information
   */
  test('testCreatingCourseWithCourseCodeHaving3CharacterFollowedBy5Digits ', async ()=>{

    try{
      testCourse.courseCode='AAA11111';
      course= await Course.create(testCourse);
    }catch (error){
      err=error.message;
      errCount= error.errors.length;
    }
    expect (course).toBeFalsy; //No course will be created
    expect (errCount).toBe(1);
    expect (err).toBe('Validation error: Course Code can have 3-4 characters and 3-4 digits only');

  });



});

/**
 *These are tests for the courseName attribute of Course
 */

describe ('courseName', ()=>{
 let course;
  let err='';
  let testCourse;
  let errCount =0;
  beforeEach(async()=>{
    await Course.sync({force: true}); // wipes course table if it exists
    testCourse= course1; //test Course is created with the course properties defined in the constant.js file
    err='';  //empty the error message (if any)
  });

  /**
   * test creating course with valid courseName having upper limit of characters.
   * we are using the constant.js file for other valid information
   */
  test('testCreatingCourseWithCourseNameUpperLimit', async()=>{
    let course=undefined;
    testCourse.courseCode='CSEC280';
       try {
      testCourse.courseName ='A'.repeat(50)
      course = await Course.create(testCourse);

    }catch(error){
      err =error.message;
    }
    expect (err).toBe('');
    expect (course).toBeTruthy(); //check the course object is created.
  });

  /**
   * test creating course with invalid courseName having excess chacters than the upper limit.
   * we are using the constant.js file for other valid information
   */
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

  /**
   * test creating course with invalid courseName having empty string.
   * we are using the constant.js file for other valid information
   */
  test('testCreatingCourseWithEmptyCourseName', async()=>{

    try {
      testCourse.courseName ='';
      course = await Course.create(testCourse);
      course.courseName='';
    }catch(error){
      err =error.message;
    }
    expect (err).toBe('Validation error: Course Name must have 1 to 50 characters.');
    expect (course).toBeFalsy(); //No course will be created
  });

});

/**
 *These are tests for the courseNumCredits attribute of Course
 */
describe('courseNumCredits', ()=>{
  let course;
  let err ='';
  let testCourse;
  let errCount;
  beforeEach(async()=>{
    await Course.sync({force: true}); // wipes course table if it exists
    testCourse= course1; //test Course is created with the course properties defined in the constant.js file
    err='';  //empty the error message (if any)
  });

  /**
   * test creating course with invalid courseCredits which is null.
   * we are using the constant.js file for other valid information
   */
  test('testCreatingCourseWithCreditUnitsHavingEmptyFields ', async ()=>{

    testCourse.courseName='Security';
    try {
      testCourse.courseNumCredits=null;
      course = await Course.create(testCourse);
    }catch (error){
      err= error.message;
      errCount= error.errors.length;

    }
    expect (err).toBe('notNull Violation: Course.courseNumCredits cannot be null');
    expect (errCount).toBe(1);
    expect (course).toBeFalsy(); //No course will be created
  });

  /**
   * test creating course with invalid courseCredit having string instead of Integer.
   * we are using the constant.js file for other valid information
   */
  test('testCreatingCourseWithCreditUnitsHavingString', async ()=>{

    try {
      testCourse.courseNumCredits='six';
      course = await Course.create(testCourse);
    }catch (error){
      err= error.message;
      errCount = error.errors.length;
    }

    expect (err).toBe('Validation error: Enter a whole number between 0 and 6 as a valid number of credits.');
    expect (errCount).toBe(1); //Number of error to be 1
    expect (course).toBeFalsy(); //No course will be created
  });

  /**
   * test creating course with invalid courseCredit having Decimal value instead of Integer.
   * we are using the constant.js file for other valid information
   */
  test('testCreatingCourseWithCreditUnitsHavingDecimalNumber', async ()=>{

    try {
      testCourse.courseNumCredits=2.5;
      course = await Course.create(testCourse);
    }catch (error){
      err= error.message;
      errCount = error.errors.length;
    }

    expect (err).toBe('Validation error: Enter a whole number between 0 and 6 as a valid number of credits.');
    expect (errCount).toBe(1); //Number of error to be 1
    expect (course).toBeFalsy(); //No course will be created
  });

  /**
   * test creating course with invalid courseCredit over the upper limit.
   * we are using the constant.js file for other valid information
   */
  test('testCreatingCourseWithCreditUnitOverLimit', async ()=>{
    try{
     testCourse.courseNumCredits=7;
      course= await Course.create(testCourse);
      }catch(error){
         err= error.message;
          errCount = error.errors.length;
        }
        expect (err).toBe('Validation error: Enter a whole number between 0 and 6 as a valid number of credits.');
        expect(errCount).toBe(1);
        expect(course).toBeFalsy();

  });

  /**
   * test creating course with valid courseCredit upper limit.
   * we are using the constant.js file for other valid information
   */
  test('testCreatingCourseWithCreditUnitUpperLimit', async ()=>{
    try{
      testCourse.courseNumCredits=6;
      course= await Course.create(testCourse);
    }catch(error){
      err= error.message;
      }
    expect (err).toBe('');
    expect(course).toBeTruthy();

  });

  /**
   * test creating course with valid courseCredit lower limit.
   * we are using the constant.js file for other valid information
   */
  test('testCreatingCourseWithCreditUnitWithLowerLimit', async ()=>{
    try{
      testCourse.courseNumCredits=0;
      course= await Course.create(testCourse);
    }catch(error){
      err= error.message;
    }
    expect (err).toBe('');
    expect(course).toBeTruthy();

  });
});

/**
 *These are tests for the courseNumHoursPerWeek attribute of Course
 */
 describe('courseNumHoursPerWeek', ()=>{
   let course;
   let err ='';
   let testCourse;
   let errCount;

   beforeEach(async()=>{
     // await Course.sync({force: true}); // wipes course table if it exists
     testCourse= course1; //test Course is created with the course properties defined in the constant.js file
     err='';  //empty the error message (if any)
   });



   /**
    * test creating course with invalid courseNumHoursPerWeek which is null.
    * we are using the constant.js file for other valid information
    */
   test ('testCreatingCourseWithEmptyCourseNumHoursPerWeek', async()=>{
     try{
       testCourse.courseNumHoursPerWeek=null;
       course= await Course.create(testCourse);
     }catch(error){
       err= error.message;
       errCount = error.errors.length;
     }
     expect (errCount).toBe(1);
     expect (err).toBe('notNull Violation: Course.courseNumHoursPerWeek cannot be null');
     expect(course).toBeFalsy();

   });

   /**
    * test creating course with invalid courseNumHoursPerWeek having string instead of Integer.
    * we are using the constant.js file for other valid information
    */
   test ('testCreatingCourseWithCourseNumberOfHoursHavingString ', async()=>{
     try{
       testCourse.courseNumHoursPerWeek="Twenty";
       course= await Course.create(testCourse);
     }catch(error){
       err= error.message;
       errCount= error.errors.length;
     }
     expect (errCount).toBe(1);
     expect (err).toBe('Validation error: Enter a whole number between 1 and 40 as a valid number of hours.');
     expect(course).toBeFalsy();

   });

   /**
    * test creating course with invalid courseNumHoursPerWeek having Decimal value instead of Integer.
    * we are using the constant.js file for other valid information
    */
   test ('testCreatingCourseWithCourseNumberOfHoursHavingDecimal ', async()=>{
     try{
       testCourse.courseNumHoursPerWeek=20.5;
       course= await Course.create(testCourse);
     }catch(error){
       err= error.message;
       errCount= error.errors.length;
     }
     expect (errCount).toBe(1);
     expect (err).toBe('Validation error: Enter a whole number between 1 and 40 as a valid number of hours.');
     expect(course).toBeFalsy();

   });




   /**
    * test creating course with invalid courseNumHoursPerWeek over the upper limit.
    * we are using the constant.js file for other valid information
    */
   test ('testCreatingCourseWithCourseNumberOfHoursOverLimit', async()=>{
     await Course.sync({force: true}); // wipes course table if it exists
     try{
       testCourse.courseNumHoursPerWeek=41;
       course= await Course.create(testCourse);


     }catch(error){
       err= error.message;
       errCount= error.errors.length;
     }
     expect (errCount).toBe(1);
     expect (err).toBe('Validation error: Enter a whole number between 1 and 40 as a valid number of hours.');
     expect(course).toBeFalsy();

   });

   /**
    * test creating course with invalid courseNumHoursPerWeek below the Lower limit.
    * we are using the constant.js file for other valid information
    */
   test ('testCreatingCourseWithCourseNumberOfHoursBelowLimit ', async()=>{
     await Course.sync({force: true}); // wipes course table if it exists

     try{
       testCourse.courseNumHoursPerWeek=0;
       course= await Course.create(testCourse);


     }catch(error){
       err= error.message;
       errCount =error.errors.length;
     }
     expect(errCount).toBe(1);
     expect (err).toBe('Validation error: Enter a whole number between 1 and 40 as a valid number of hours.');
     expect(course).toBeFalsy();

   });


   /**
    * test creating course with invalid courseNumHoursPerWeek over the upper limit.
    * we are using the constant.js file for other valid information
    */
   test ('testCreatingCourseWithCourseNumberOfHoursUpperLimit ', async()=>{
      await Course.sync({force: true}); // wipes course table if it exists
     try{
       testCourse.courseNumHoursPerWeek=40;
       course= await Course.create(testCourse);
     }catch(error){
       err= error.message;
     }
     expect (err).toBe('');   //No errors should be thrown
     expect(course).toBeTruthy();   //valid course created

   });

   /**
    * test creating course with valid courseNumHours lower limit.
    * we are using the constant.js file for other valid information
    */
   test ('testCreatingCourseWithCourseNumberOfHoursLowerLimit', async()=>{
     await Course.sync({force: true}); // wipes course table if it exists
     try{
       testCourse.courseNumHoursPerWeek=1;
       course= await Course.create(testCourse);
     }catch(error){
       err= error.message;
     }
     expect (err).toBe('');
     expect(course).toBeTruthy();

   });

 });
