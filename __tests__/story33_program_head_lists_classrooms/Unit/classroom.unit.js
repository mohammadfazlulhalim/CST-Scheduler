

describe('ClassroomUnitTests', () => {
  test('IsValidWhenLessThan10Characters', () => {
    const classroom = new Classroom('123@45$78');
    expect(classroom.roomNumberIsValid()).toBe(true);
  });

  test('IsValidWithSpecialCharacters', () => {
    const classroom = new Classroom('!');
    expect(classroom.roomNumberIsValid()).toBe(true);
  });

  test('IsValidWithSingleCharacter', () => {
    const classroom = new Classroom('AB#12');
    expect(classroom.roomNumberIsValid()).toBe(true);
  });

  test('IsInvalidWhenExactly10Characters', () => {
    const classroom = new Classroom('1234567890');
    expect(classroom.roomNumberIsValid()).toBe(false);
  });

  test('IsInvalidWhenEmpty', () => {
    const classroom = new Classroom('');
    expect(classroom.roomNumberIsValid()).toBe(false);
  });

  test('IsValidWithWhitespace', () => {
    const classroom = new Classroom('123A B');
    expect(classroom.roomNumberIsValid()).toBe(true);
  });
});
