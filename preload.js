const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('sigil', {
  saveUrl: (url) => ipcRenderer.invoke('save-url', url),
  resetApp: () => ipcRenderer.invoke('reset-app')
});
