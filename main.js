const { app, BrowserWindow, ipcMain, session } = require('electron');
const path = require('path');
const Store = require('electron-store');

const store = new Store();

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    title: 'Sigil',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  const savedUrl = store.get('owuiUrl');

  if (savedUrl) {
    // URL already saved — load Open WebUI directly
    mainWindow.loadURL(savedUrl);
  } else {
    // First launch — show setup page
    mainWindow.loadFile(path.join(__dirname, 'renderer', 'setup.html'));
  }
}

// Save the Open WebUI URL and navigate to it
ipcMain.handle('save-url', async (_event, url) => {
  store.set('owuiUrl', url);
  mainWindow.loadURL(url);
});

// Clear all saved data and session cookies, then reload setup
ipcMain.handle('reset-app', async () => {
  store.clear();
  await session.defaultSession.clearStorageData();
  mainWindow.loadFile(path.join(__dirname, 'renderer', 'setup.html'));
});

app.whenReady().then(createWindow);

// Quit when all windows are closed (except on macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
