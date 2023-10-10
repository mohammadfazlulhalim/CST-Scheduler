/**
 * This class stores objects that represent course offerings to be used in the CST Scheduler.
 */
class CourseOffering {
  courseCode;
  termNumber;
  group;
  primaryInstructorID;
  secondaryInstructorID;

  /**
   * Creates a new CourseOffering object.
   *
   * @param {string} courseCode            - The course this offering is for
   * @param {number} termNumber            - The term number this offering takes place during
   * @param {string} group                 - The group this offering is for
   * @param {string} primaryInstructorID   - The primary instructor who will be teaching this offering
   * @param {string} secondaryInstructorID - The secondary instructor who will be teaching this offering
   */
  constructor(courseCode, termNumber, group, primaryInstructorID, secondaryInstructorID) {
  }

  /**
   * Returns an array of all course offerings in the database.
   *
   * @return {CourseOffering[]} - An array of all course offerings in the database
   */
  static getAllOfferings() {
    return null;
  }
}
