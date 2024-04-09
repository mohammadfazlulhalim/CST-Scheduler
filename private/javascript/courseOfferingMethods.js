const CourseOffering = require('./CourseOffering');

/**
 * Creates a course offering in the database, returns course offering
 * @param createCO
 */
async function createCourseOffering(createCO) {
    try {
        return await CourseOffering.create(createCO);
    } catch (e) {
        return mapErrors(e);
    }
}

/**
 * Updates an entry in course offering table, return updates course offering
 * @param updateCO
 */
async function updateCourseOffering(updateCO) {
    try {
        const updated = await CourseOffering.findByPk(updateCO.id);

        return await updated.update(updateCO);
    } catch (e) {
        return mapErrors(e);
    }
}

/**
 * deletes a course offering from the database, void return
 * @param deleteCO
 */
async function deleteCourseOffering(deleteCO) {
    try {
        return await CourseOffering.destroy({
            where: {
                id: deleteCO.id,
            },
        });
    } catch (e) {
        return 0;
    }
}

/**
 * Given an error object, this function maps it to a more presentable format for the hbs template.
 * @param {Object} err  - An object representing errors
 * @return {{}}         - Formatted error object
 */
const mapErrors = (err) => {
    const violations = {error: {}};

    if (err.errors && err.errors.length > 0) {
        for (const error of err.errors) {
            violations.error[error.path] = error.message;
        }
    } else {
        // If the expected errors structure is not found, handle it accordingly
        violations.error.general = 'An unexpected error occurred.';
    }

    return violations;
};

module.exports={createCourseOffering, updateCourseOffering, deleteCourseOffering}