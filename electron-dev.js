/**
 * This file starts up the electron app with DB location being in memory, and Cypress in parallel
 */
const exec = require('await-exec');
const {execSync} = require('child_process');

// sets the database to use dev.db
process.env.TESTING_MODE = 'cypress';

// Loads the fixtures synchronously
execSync('node fixtures/loadAll.fix.js', {stdio: 'inherit'});

// launches electron with dev.db and cypress asynchronously
exec('electron .', {stdio: 'inherit'});
exec('cypress open', {stdio: 'inherit'});
