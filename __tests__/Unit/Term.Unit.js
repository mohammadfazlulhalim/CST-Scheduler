// Importing the ORM object
const Term = require('../../private/javascript/Term.js');
const {sequelize}= require('../../datasource');
// const {DATE, DATEONLY} = require('sequelize');
// const {Sequelize} = require('sequelize');

// Term.sequelize = new Sequelize('sqlite:memory');

describe('startDate', () => {
  let term1;
  let term4;
  let term2;
  let term5;
  let term3;
  let term6;

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
    term4 = await Term.create({termNumber: 4, startDate: '2023-08-01', endDate: '2023-12-01'});
    term2 = await Term.create({termNumber: 2, startDate: '2023-01-01', endDate: '2023-04-01'});
    term5 = await Term.create({termNumber: 5, startDate: '2023-01-01', endDate: '2023-04-01'});
    term3 = await Term.create({termNumber: 3, startDate: '2023-05-01', endDate: '2023-05-31'});
    term6 = await Term.create({termNumber: 6, startDate: '2023-05-01', endDate: '2023-05-31'});
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

  test('testThatTerm4StartDateInAugustPass', async () => {
    // For a pass, it will be easy
    //  1. Call constructor with arguments
    term4.startDate='2023-08-01';
    await Term.create(term4);
    //  2. Check that object is created and has valid info
    expect(term4).toBeTruthy();
    expect(term4.startDate).toBe('2023-08-01');

    // Check for no errors
  });

  test('testThatTerm4StartDateInSeptemberPass', async () => {
    term4.startDate='2023-09-01';
    await Term.create(term4);
    expect(term4).toBeTruthy();
    expect(term4.startDate).toBe('2023-09-01');
  });

  test('testThatTerm4StartDateInJulyFail', async () => {
    // For a fail, we need to catch the error message
    let bCaughtErr = false;
    try {
      await Term.create({termNumber: 4, startDate: '2023-07-01', endDate: '2023-12-01'});
      console.log('no thrown error');
    } catch (err) {
      console.log('thrown error: ' + err);
      bCaughtErr = true;
      expect(err.errors.length).toBe(1);
      expect(err.errors[0].message).toBe('Term 4 must start in August or September');
    }

    if (!bCaughtErr) {
      expect(1).toBe(2);
    }
  });



  //Term 2 Tests
    test('testThatTerm2StartDateInJanuaryPass', async () => {
      term2.startDate='2023-01-01';
      await Term.create(term2);
      expect(term2).toBeTruthy();
      expect(term2.startDate).toBe('2023-01-01');

    });

    test('testThatTerm2StartDateInDecemberFail', async() => {
      // For a fail, we need to catch the error message
      let bCaughtErr = false;
      try {
        await Term.create({termNumber: 2, startDate: '2023-12-01', endDate: '2023-04-01'});
        console.log('no thrown error');
      } catch (err) {
        console.log('thrown error: ' + err);
        bCaughtErr = true;
        expect(err.errors.length).toBe(1);
        expect(err.errors[0].message).toBe('Term 2 must start in January');
      }

      if (!bCaughtErr) {
        expect(1).toBe(2);
      }

    });

  //Term 5 Tests
  test('testThatTerm5StartDateInJanuaryPass', async () => {
    term5.startDate='2023-01-01';
    await Term.create(term5);
    expect(term5).toBeTruthy();
    expect(term5.startDate).toBe('2023-01-01');

  });

  test('testThatTerm5StartDateInDecemberFail', async() => {
    // For a fail, we need to catch the error message
    let bCaughtErr = false;
    try {
      await Term.create({termNumber: 5, startDate: '2023-12-01', endDate: '2023-04-01'});
      console.log('no thrown error');
    } catch (err) {
      console.log('thrown error: ' + err);
      bCaughtErr = true;
      expect(err.errors.length).toBe(1);
      expect(err.errors[0].message).toBe('Term 5 must start in January');
    }

    if (!bCaughtErr) {
      expect(1).toBe(2);
    }

  });


// Term 3
    test('testThatTerm3StartDateInMayPass', async() => {
      term3.startDate='2023-05-01';
      await Term.create(term3);
      expect(term3).toBeTruthy();
      expect(term3.startDate).toBe('2023-05-01');
    });

    test('testThatTerm3StartDateInAprilFail', async () => {
      let bCaughtErr = false;
      try {
        await Term.create({termNumber: 3, startDate: '2023-04-01', endDate: '2023-05-31'});
        console.log('no thrown error');
      } catch (err) {
        console.log('thrown error: ' + err);
        bCaughtErr = true;
        expect(err.errors.length).toBe(1);
        expect(err.errors[0].message).toBe('Term 3 must start in May');
      }

      if (!bCaughtErr) {
        expect(1).toBe(2);
      }
    });

  // Term 6
  test('testThatTerm6StartDateInMayPass', async() => {
    term6.startDate='2023-05-01';
    await Term.create(term6);
    expect(term6).toBeTruthy();
    expect(term6.startDate).toBe('2023-05-01');
  });

  test('testThatTerm6StartDateInAprilFail', async () => {
    let bCaughtErr = false;
    try {
      await Term.create({termNumber: 6, startDate: '2023-04-01', endDate: '2023-05-31'});
      console.log('no thrown error');
    } catch (err) {
      console.log('thrown error: ' + err);
      bCaughtErr = true;
      expect(err.errors.length).toBe(1);
      expect(err.errors[0].message).toBe('Term 6 must start in May');
    }

    if (!bCaughtErr) {
      expect(1).toBe(2);
    }
  });

});

describe('termNumber', () => {
  let term;

  beforeAll(async () => {
    try {
      await sequelize.sync();
      // console.log('Terms table created successfully');
    } catch (error) {
      console.error('Error creating Term table: ', error);
    }
  });

  beforeEach(async () => {
    term = await new Term({termNumber: 1, startDate: '2023-09-01', endDate: '2023-12-01'});
  });


  test('testThatTermLowNumberPass', async () => {
    // For an accept, it will be easy
    //  1. Call constructor with arguments
    term.termNumber =1;
    await Term.create(term);
    //  2. Check that object is created and has valid info
    expect(term).toBeDefined();
    expect(term.termNumber).toBe(1);

    // Check for no errors
    // expect(term1.validate()).resolves.toBe(undefined);
  });

  test('testThatTermBelowOneFail', async () => {
    // For a reject, we need to catch the error message
    term.termNumber = 0;
    let bCaughtErr = false;
    try {
      // If I just pass in term1, after changing termNumber, it fails weirdly
      await Term.create({termNumber: term.termNumber, startDate: '2023-09-01', endDate: '2023-12-01'});
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
    term.termNumber =6;
    await Term.create(term);
    //  2. Check that object is created and has valid info
    expect(term).toBeDefined();
    expect(term.termNumber).toBe(6);
  });

  test('testThatTermAboveSixFail', async () => {
    term.termNumber =7;
    let bCaughtErr = false;
    try {
      await Term.create({termNumber: term.termNumber, startDate: '2023-09-01', endDate: '2023-12-01'});
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
  let term2;
  let term5;
  let term3;
  let term6;

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
    term2 = await new Term({termNumber: 2, startDate: '2023-01-01', endDate: '2023-04-01'});
    term5 = await new Term({termNumber: 5, startDate: '2023-01-01', endDate: '2023-04-01'});
    term3 = await new Term({termNumber: 3, startDate: '2023-05-01', endDate: '2023-05-31'});
    term6 = await new Term({termNumber: 6, startDate: '2023-05-01', endDate: '2023-05-31'});
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

  // Term 2 Tests
  test('testThatTerm2EndDateInAprilPass', async ()=>{
    term2.endDate= '2023-04-01';
    await Term.create(term2);
    expect(term2).toBeTruthy();
    expect(term2.endDate).toBe('2023-04-01');
  });

  test('testThatTerm2EndDateInMayFail', async ()=>{
    let bCaughtErr=false;
    try {
      await Term.create({termNumber: 2, startDate: '2023-01-01', endDate: '2023-05-01'});
    } catch (err) {
      console.log('thrown error: ' + err);
      bCaughtErr = true;
      expect(err.errors.length).toBe(1);
      expect(err.errors[0].message).toBe('Term 2 must end in April');
    }

    if (!bCaughtErr) {
      expect(1).toBe(2);
    }
  });

  // Term 5 Tests
  test('testThatTerm5EndDateInAprilPass', async ()=>{
    term5.endDate= '2023-04-01';
    await Term.create(term5);
    expect(term5).toBeTruthy();
    expect(term5.endDate).toBe('2023-04-01');
  });

  test('testThatTerm5EndDateInMayFail', async ()=>{
    let bCaughtErr=false;
    try {
      await Term.create({termNumber: 5, startDate: '2023-01-01', endDate: '2023-05-01'});
    } catch (err) {
      console.log('thrown error: ' + err);
      bCaughtErr = true;
      expect(err.errors.length).toBe(1);
      expect(err.errors[0].message).toBe('Term 5 must end in April');
    }

    if (!bCaughtErr) {
      expect(1).toBe(2);
    }
  });
  // Term 3 Tests
  test('testThatTerm3EndDateInMayPass', async()=>{
    term3.endDate= '2023-05-31';
    await Term.create(term3);
    expect(term3).toBeTruthy();
    expect(term3.endDate).toBe('2023-05-31');
  });

  test('testThatTerm3EndDateInJunePass', async()=>{
    term3.endDate= '2023-06-01';
    await Term.create(term3);
    expect(term3).toBeTruthy();
    expect(term3.endDate).toBe('2023-06-01');
  });

  test('testThatTerm3EndDateInJulyFail', async()=>{
    let bCaughtErr=false;
    try {
      await Term.create({termNumber: 3, startDate: '2023-05-01', endDate: '2023-07-01'});
    } catch (err) {
      console.log('thrown error: ' + err);
      bCaughtErr = true;
      expect(err.errors.length).toBe(1);
      expect(err.errors[0].message).toBe('Term 3 must end in May or June');
    }

    if (!bCaughtErr) {
      expect(1).toBe(2);
    }

  });
  // Term 6 Tests
  test('testThatTerm6EndDateInMayPass', async()=>{
    term6.endDate= '2023-05-31';
    await Term.create(term6);
    expect(term6).toBeTruthy();
    expect(term6.endDate).toBe('2023-05-31');
  });

  test('testThatTerm6EndDateInJunePass', async()=>{
    term6.endDate= '2023-06-01';
    await Term.create(term6);
    expect(term6).toBeTruthy();
    expect(term6.endDate).toBe('2023-06-01');
  });

  test('testThatTerm6EndDateInJulyFail', async()=>{
    let bCaughtErr=false;
    try {
      await Term.create({termNumber: 6, startDate: '2023-05-01', endDate: '2023-07-01'});
    } catch (err) {
      console.log('thrown error: ' + err);
      bCaughtErr = true;
      expect(err.errors.length).toBe(1);
      expect(err.errors[0].message).toBe('Term 6 must end in May or June');
    }

    if (!bCaughtErr) {
      expect(1).toBe(2);
    }

  });
});

describe('termStartEndDate', () => {
  let term;

  beforeAll(async () => {
    try {
      await sequelize.sync();
      // console.log('Terms table created successfully');
    } catch (error) {
      console.error('Error creating Term table: ', error);
    }
  });

  beforeEach(async () => {
    term = await new Term({termNumber: 1, startDate: '2023-09-01', endDate: '2023-12-01'});
  });

  test('testThatTermEndDateAfterStartDatePass', async ()=>{
    term.startDate= '2023-09-01';
    term.endDate= '2023-12-01';
    await Term.create(term);
    expect(term).toBeTruthy();
    expect(term.startDate).toBe('2023-09-01');
    expect(term.endDate).toBe('2023-12-01');
  });

  test('testThatTermEndDateBeforeStartDateFail', async ()=>{
    let bCaughtErr=false;
    try {
      await Term.create({termNumber: 1, startDate: '2023-09-01', endDate: '2022-12-01'});
    } catch (err) {
      console.log('thrown error: ' + err);
      bCaughtErr = true;
      expect(err.errors.length).toBe(1);
      expect(err.errors[0].message).toBe('End date must be after start date');
    }

    if (!bCaughtErr) {
      expect(1).toBe(2);
    }
  });

  test('testThatTerm3EndDateAfterStartDatePass', async ()=>{
    term.startDate= '2023-05-01';
    term.endDate= '2023-05-31';
    term.termNumber = 3;
    await Term.create(term);
    expect(term).toBeTruthy();
    expect(term.startDate).toBe('2023-05-01');
    expect(term.endDate).toBe('2023-05-31');
  });

  test('testThatTerm3EndDateBeforeStartDateFail', async ()=>{
    let bCaughtErr=false;
    try {
      await Term.create({termNumber: 3, startDate: '2023-05-31', endDate: '2023-05-01'});
    } catch (err) {
      console.log('thrown error: ' + err);
      bCaughtErr = true;
      expect(err.errors.length).toBe(1);
      expect(err.errors[0].message).toBe('End date must be after start date');
    }

    if (!bCaughtErr) {
      expect(1).toBe(2);
    }
  });

  test('testThatTerm6EndDateAfterStartDatePass', async ()=>{
    term.startDate= '2023-05-01';
    term.endDate= '2023-05-31';
    term.termNumber = 6;
    await Term.create(term);
    expect(term).toBeTruthy();
    expect(term.startDate).toBe('2023-05-01');
    expect(term.endDate).toBe('2023-05-31');
  });

  test('testThatTerm6EndDateBeforeStartDateFail', async ()=>{
    let bCaughtErr=false;
    try {
      await Term.create({termNumber: 6, startDate: '2023-05-31', endDate: '2023-05-01'});
    } catch (err) {
      console.log('thrown error: ' + err);
      bCaughtErr = true;
      expect(err.errors.length).toBe(1);
      expect(err.errors[0].message).toBe('End date must be after start date');
    }

    if (!bCaughtErr) {
      expect(1).toBe(2);
    }
  });





});
