/**
 * This file starts up the electron app with DB location being in memory, and Cypress in parallel
 */
const exec = require('await-exec');

process.env.TESTING_MODE = 'cypress';

// Potentially call a loaddb or loadDevDB

exec('electron .', {stdio: 'inherit'});
exec('cypress open', {stdio: 'inherit'});
