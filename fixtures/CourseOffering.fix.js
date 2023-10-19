const CourseOffering = require('private/javascript/CourseOffering');

/**
 * Creates a bunch of course offerings to add to the database.
 *
 * @param {number} amount - The amount of offerings to create
 */
async function createCourseOfferings(amount) {
  // list of viable groups
  const viableGroups = 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z 1 2 3 4 5 6 7 8 9 0'.split(' ');
  const viableCourseCodes = ['COSA280', 'COOS190', 'COSC286', 'CWEB180', 'TCOM102', 'COAP173'];

  // create valid entries
  for (let i = 0; i < amount; i++) {
    // randomize the group number
    const randomGroup = Math.floor(Math.random() * viableGroups.length);
    const randomCourse = Math.floor(Math.random() * viableCourseCodes.length);
    await CourseOffering.create({
      courseCode: viableCourseCodes[randomCourse],
      termNumber: Math.floor(Math.random() * 6) + 1,
      group: viableGroups[randomGroup],
    });
  }
}
