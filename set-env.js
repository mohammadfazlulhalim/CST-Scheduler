// set-env.js
const {execSync} = require('child_process');
process.env.TESTING_MODE = 'testing';

// Run the Jest test command
execSync('jest', {stdio: 'inherit'});
