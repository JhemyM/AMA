const { app, BrowserWindow } = require('electron');
const path = require('node:path');
const { fork } = require('node:child_process');

let apiProcess;

function startApi() {
  const apiPath = path.join(__dirname, '..', 'dist', 'server.js');
  apiProcess = fork(apiPath, [], { silent: true, env: { ...process.env, PORT: '8787' } });
}

function createWindow() {
  const window = new BrowserWindow({
    width: 1440,
    height: 920,
    minWidth: 1024,
    minHeight: 700,
    backgroundColor: '#f5f7f4',
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  window.loadFile(path.join(__dirname, '..', 'dist', 'web', 'index.html'));
}

app.whenReady().then(() => {
  startApi();
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (apiProcess) apiProcess.kill();
  if (process.platform !== 'darwin') app.quit();
});
