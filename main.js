const {BrowserWindow, app} = require('electron');
require('./bin/www');

let mainWindow = null;

/**
 * This function starts the Electron application
 */
function main() {
  mainWindow = new BrowserWindow();
  mainWindow.maximize();
  mainWindow.loadURL(`http://localhost:3000/`);
  mainWindow.on('close', (event) => {
    mainWindow = null;
  });
}

app.on('ready', main);
