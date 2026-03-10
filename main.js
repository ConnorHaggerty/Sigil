const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

let win

function createWindow() {
  win = new BrowserWindow({
    width: 1100, height: 720,
    frame: false,
    transparent: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  })
  win.loadFile('src/index.html')
  if (process.argv.includes('--dev')) win.webContents.openDevTools({ mode: 'detach' })
}

app.whenReady().then(createWindow)
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit() })

ipcMain.handle('window-close',    () => win.close())
ipcMain.handle('window-minimize', () => win.minimize())
ipcMain.handle('window-maximize', () => win.isMaximized() ? win.unmaximize() : win.maximize())
