const {BrowserWindow, app} = require('electron');
require('./bin/www');

let mainWindow = null;

/**
 * This function starts the Electron application
 */
function main() {
  mainWindow = new BrowserWindow({
    minWidth: 1280, // Minimum width of the window
    minHeight: 720, // Minimum height of the window
  });
  mainWindow.loadURL(`http://localhost:3000/`);
  mainWindow.on('close', (event) => {
    mainWindow = null;
  });
}

app.on('ready', main);
