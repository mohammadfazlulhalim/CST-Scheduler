const {execSync} = require('child_process');

process.env.TESTING_MODE = 'testing';
callCypress();
callElectron();
// Running in sequence, need to get it in parallel
/**
 *
 */
async function callCypress() {
  execSync('cypress open', {stdio: 'inherit'});
  // execSync('electron .', {stdio: 'inherit'});
}

/**
 *
 */
async function callElectron() {
  // execSync('cypress open', {stdio: 'inherit'});
  execSync('electron .', {stdio: 'inherit'});
}


