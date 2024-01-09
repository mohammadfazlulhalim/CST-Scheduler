/**
 * This file starts up the electron app with DB location being in memory
 */
const {execSync} = require('child_process');

process.env.TESTING_MODE = 'testing';

execSync('electron .', {stdio: 'inherit'});
