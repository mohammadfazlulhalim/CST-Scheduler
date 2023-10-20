// Importing the ORM object
const Term = require('../../private/javascript/Term.js');
const {sequelize}= require('../../datasource');
// const {DATE, DATEONLY} = require('sequelize');
// const {Sequelize} = require('sequelize');

// Term.sequelize = new Sequelize('sqlite:memory');

describe('startDate', () => {
  let term1;

  beforeAll(async () => {
    try {
      await sequelize.sync();
      // console.log('Terms table created successfully');
    } catch (error) {
      console.error('Error creating Term table: ', error);
    }
  });

  beforeEach(async () => {
    term1 = await Term.create({termNumber: 1, startDate: '2023-08-01', endDate: '2023-12-01'});
  });

  // Term 1 Tests
  test('testThatTerm1StartDateInAugustPass', async () => {
    // For a pass, it will be easy
    //  1. Call constructor with arguments
    term1.startDate='2023-08-01';
    await Term.create(term1);
    //  2. Check that object is created and has valid info
    expect(term1).toBeTruthy();
    expect(term1.startDate).toBe('2023-08-01');

    // Check for no errors
  });

  test('testThatTerm1StartDateInSeptemberPass', async () => {
    term1.startDate='2023-09-01';
    await Term.create(term1);
    expect(term1).toBeTruthy();
    expect(term1.startDate).toBe('2023-09-01');
  });

  test('testThatTerm1StartDateInJulyFail', async () => {
    // For a fail, we need to catch the error message
    let bCaughtErr = false;
    try {
      await Term.create({termNumber: 1, startDate: '2023-07-01', endDate: '2023-12-01'});
      console.log('no thrown error');
    } catch (err) {
      console.log('thrown error: ' + err);
      bCaughtErr = true;
      expect(err.errors.length).toBe(1);
      expect(err.errors[0].message).toBe('Term 1 must start in August or September');
    }

    if (!bCaughtErr) {
      expect(1).toBe(2);
    }
  });

// // Term 4 Tests
//     test('testThatTerm4StartDateInAugustPass', () => {
//
//     });
//
//     test('testThatTerm4StartDateInSeptemberPass', () => {
//
//     });
//
//     test('testThatTerm4StartDateInJulyFail', () => {
//
//     });
//
// // Term 2 Tests
//     test('testThatTerm2StartDateInJanuaryPass', () => {
//
//     });
//
//     test('testThatTerm2StartDateInDecemberFail', () => {
//
//     });
//
// // Term 5 Tests
//     test('testThatTerm5StartDateInJanuaryPass', () => {
//
//     });
//
//     test('testThatTerm5StartDateInDecemberFail', () => {
//
//     });
//
// // Term 3
//     test('testThatTerm3StartDateInMayPass', () => {
//
//     });
//
//     test('testThatTerm3StartDateInAprilFail', () => {
//
//     });
//
// // Term 6
//     test('testThatTerm6StartDateInMayPass', () => {
//
//     });
//
//     test('testThatTerm6StartDateInAprilFail', () => {
//
//     });
});

describe('termNumber', () => {
  let term1;

  beforeAll(async () => {
    try {
      await sequelize.sync();
      // console.log('Terms table created successfully');
    } catch (error) {
      console.error('Error creating Term table: ', error);
    }
  });

  beforeEach(async () => {
    term1 = await new Term({termNumber: 1, startDate: '2023-09-01', endDate: '2023-12-01'});
  });


  test('testThatTermLowNumberPass', async () => {
    // For an accept, it will be easy
    //  1. Call constructor with arguments
    term1.termNumber =1;
    await Term.create(term1);
    //  2. Check that object is created and has valid info
    expect(term1).toBeDefined();
    expect(term1.termNumber).toBe(1);

    // Check for no errors
    // expect(term1.validate()).resolves.toBe(undefined);
  });

  test('testThatTermBelowOneFail', async () => {
    // For a reject, we need to catch the error message
    term1.termNumber = 0;
    let bCaughtErr = false;
    try {
      // If I just pass in term1, after changing termNumber, it fails weirdly
      await Term.create({termNumber: term1.termNumber, startDate: '2023-09-01', endDate: '2023-12-01'});
    } catch (err) {
      bCaughtErr = true;
      expect(err.errors.length).toBe(1);
      expect(err.errors[0].message).toBe('Term number must be between 1 and 6');
    }

    if (!bCaughtErr) {
      expect(1).toBe(2);
    }
  });

  test('testThatTermHighNumberPass', async () => {
    term1.termNumber =6;
    await Term.create(term1);
    //  2. Check that object is created and has valid info
    expect(term1).toBeDefined();
    expect(term1.termNumber).toBe(6);
  });

  test('testThatTermAboveSixFail', async () => {
    term1.termNumber =7;
    let bCaughtErr = false;
    try {
      await Term.create({termNumber: term1.termNumber, startDate: '2023-09-01', endDate: '2023-12-01'});
    } catch (err) {
      bCaughtErr = true;
      // console.log('error 1 is : ' + err.errors[0].message);
      // console.log('error 2 is : ' + err.errors[1].message);
      expect(err.errors.length).toBe(1);
      expect(err.errors[0].message).toBe('Term number must be between 1 and 6');
    }

    if (!bCaughtErr) {
      expect(1).toBe(2);
    }
  });
});

describe('endDate', () => {
  let term1;
  let term4;

  beforeAll(async () => {
    try {
      await sequelize.sync();
      // console.log('Terms table created successfully');
    } catch (error) {
      console.error('Error creating Term table: ', error);
    }
  });

  beforeEach(async () => {
    term1 = await new Term({termNumber: 1, startDate: '2023-09-01', endDate: '2023-12-01'});
    term4 = await new Term({termNumber: 4, startDate: '2023-09-01', endDate: '2023-12-01'});
  });

  // Term 1 Tests

  test('testThatTerm1EndDateInDecemberPass', async ()=>{
    term1.endDate= '2023-12-01';
    await Term.create(term1);
    expect(term1).toBeTruthy();
    expect(term1.endDate).toBe('2023-12-01');
  });

  test('testThatTerm1EndDateInJanuaryFail', async ()=>{
    let bCaughtErr=false;
    try {
      await Term.create({termNumber: 1, startDate: '2023-09-01', endDate: '2023-01-01'});
    } catch (err) {
      console.log('thrown error: ' + err);
      bCaughtErr = true;
      expect(err.errors.length).toBe(1);
      expect(err.errors[0].message).toBe('Term 1 must end in December');
    }

    if (!bCaughtErr) {
      expect(1).toBe(2);
    }
  });

  // Term 4 Tests
  test('testThatTerm4EndDateInDecemberPass', async ()=>{
    term4.endDate= '2023-12-01';
    await Term.create(term4);
    expect(term1).toBeTruthy();
    expect(term1.endDate).toBe('2023-12-01');
  });

  test('testThatTerm4EndDateInJanuaryFail', async ()=>{
    let bCaughtErr=false;
    try {
      await Term.create({termNumber: 4, startDate: '2023-09-01', endDate: '2023-01-01'});
    } catch (err) {
      console.log('thrown error: ' + err);
      bCaughtErr = true;
      expect(err.errors.length).toBe(1);
      expect(err.errors[0].message).toBe('Term 4 must end in December');
    }

    if (!bCaughtErr) {
      expect(1).toBe(2);
    }
  });
  //
  // // Term 2 Tests
  // test('testThatTerm2EndDateInAprilPass', ()=>{
  //
  // });
  //
  // test('testThatTerm2EndDateInMayFail', ()=>{
  //
  // });
  //
  // // Term 5 Tests
  // test('testThatTerm5EndDateInAprilPass', ()=>{
  //
  // });
  //
  // test('testThatTerm5EndDateInMayFail', ()=>{
  //
  // });
  //
  // // Term 3 Tests
  // test('testThatTerm3EndDateInMayPass', ()=>{
  //
  // });
  //
  // test('testThatTerm3EndDateInJunePass', ()=>{
  //
  // });
  //
  // test('testThatTerm3EndDateInJulyFail', ()=>{
  //
  // });
  //
  // // Term 6 Tests
  // test('testThatTerm6EndDateInMayPass', ()=>{
  //
  // });
  //
  // test('testThatTerm6EndDateInJunePass', ()=>{
  //
  // });
  //
  // test('testThatTerm6EndDateInJulyFail', ()=>{
  //
  // });
});
