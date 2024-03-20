
const {BrowserWindow, app} = require('electron');
require('./bin/www');

let mainWindow = null;


/**


 This function starts the Electron application*/
function main() {
  mainWindow = new BrowserWindow({
    show: false, // Add this line to initially hide the window
  });
  mainWindow.maximize();

  mainWindow.loadURL('http://localhost:3000/').catch((err) => {
    console.error('Failed to load URL:', err);
  });


  // Listen for navigation events
  mainWindow.webContents.on('will-navigate', (event, url) => {
  // Check if the navigation URL is the one intended to trigger the app exit
    if (url === 'app://exit') {
      event.preventDefault(); // Prevent the navigation
      mainWindow.close(); // Close the main window, which will quit the app if it's the only window
    }
  });

  // Use the ready-to-show event to show the window
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', main);
