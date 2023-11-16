/**
 * These are tests to enforce constraint and security of the course object- Christeen Shlimoon
 * @type {NonConstructor<Model> | {new(): Model<any, TModelAttributes>} | {}}
 */
const Program = require('../../private/javascript/Program');

// The pre test setup
describe('Program Model Validation', () => {
  beforeAll(async () => {
    await Program.sync({force: true});
  });

  beforeEach(() => {
    validProgram = {programAbbreviation: 'CST', programName: 'Computer Systems Technology'};
  });

  // Passing tests
  test('programCodeAbbreviationIs2-10AlphabeticalCharactersInLengthAndAllUppercase', async () => {
    const program = await Program.create(validProgram);
    expect(program.programAbbreviation).toBe('CST');
    expect(program.programName).toBe('Computer Systems Technology');
  });
  //
  // test('programNameIs2-50AlphabeticalCharactersInLength', async () => {
  //   const program = await Program.create(validProgram);
  //   expect(program.programName).toBe('Computer Systems Technology');
  // });


  // Failure tests


  test('programAbbreviationIsNull', async () => {
    validProgram.programAbbreviation = null;
    validProgram.programName= 'Computer Systems Technology';
    try {
      await Program.create(validProgram);
    } catch (err) {
      expect(err.errors[0].message).toBe('The programs abbreviation is required');
    }
  });

  test('programAbbreviationLengthIsLessThan2ButNotNull', async () => {
    validProgram.programAbbreviation = 'A';
    validProgram.programName= 'Computer Systems Technology';
    try {
      await Program.create(validProgram);
    } catch (err) {
      expect(err.errors[0].message).toBe('The programs abbreviation length ranges from 2-10');
    }
  });

  test('programAbbreviationLengthIsMoreThan10Characters', async () => {
    validProgram.programAbbreviation = 'CSSSSSTTTTTTT';
    validProgram.programName= 'Computer Systems Technology';
    try {
      await Program.create(validProgram);
    } catch (err) {
      expect(err.errors[0].message).toBe('The programs abbreviation length ranges from 2-10');
    }
  });

  test('programAbbreviationIsWrittenWithAMixOfLowerCaseAndUpperCase', async () => {
    validProgram.programAbbreviation = 'csT';
    validProgram.programName= 'Computer Systems Technology';
    try {
      await Program.create(validProgram);
    } catch (err) {
      expect(err.errors[0].message).toBe('The programs abbreviation must be uppercase');
    }
  });

  test('programAbbreviationIsWrittenWithANon-AlphabeticaCharacters', async () => {
    validProgram.programAbbreviation = 'CST2023';
    validProgram.programName= 'Computer Systems Technology';
    try {
      await Program.create(validProgram);
    } catch (err) {
      expect(err.errors[0].message).toBe('The programs abbreviation must be alphabetical');
    }
  });

  test('programNameLengthIsLessThan2', async () => {
    validProgram.programAbbreviation = 'CST';
    validProgram.programName= 'C';
    try {
      await Program.create(validProgram);
    } catch (err) {
      expect(err.errors[0].message).toBe('The programs name length ranges from 2-50');
    }
  });

  test('programNameLengthIsMoreThan50', async () => {
    validProgram.programAbbreviation = 'CST';
    validProgram.programName= 'Computer Systems Technology Plus More To Be Learned On The Way';
    try {
      await Program.create(validProgram);
    } catch (err) {
      expect(err.errors[0].message).toBe('The programs name length ranges from 2-50');
    }
  });

  test('programNameIsNull', async () => {
    validProgram.programAbbreviation = 'CST';
    validProgram.programName= null;
    try {
      await Program.create(validProgram);
    } catch (err) {
      expect(err.errors[0].message).toBe('The programs name is required');
    }
  });

  test('programNameContainsNon-AlphabticalCharacters', async () => {
    validProgram.programAbbreviation = 'CST';
    validProgram.programName= 'Comput3r Systems Technology! ';
    try {
      await Program.create(validProgram);
    } catch (err) {
      expect(err.errors[0].message).toBe('The programs name must be alphabetical');
    }
  });

  test('programNameContainsNon-AlphabticalCharacters', async () => {
    validProgram.programAbbreviation = 'CST';
    validProgram.programName= 'Comput3r Systems Technology! ';
    try {
      await Program.create(validProgram);
    } catch (err) {
      expect(err.errors[0].message).toBe('The programs name must be alphabetical');
    }
  });
});
