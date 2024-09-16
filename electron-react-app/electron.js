const { app, BrowserWindow, ipcMain, contextBridge } = require('electron');
const path = require('path');
const { startBroadcasting, stopBroadcasting, startWebSocketServer, stopWebSocketServer } = require('../PCServerScript'); // Adjust the path as needed

(async () => {
  const isDev = (await import('electron-is-dev')).default;

  function createWindow() {
    const mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'), // Use preload script
        contextIsolation: true, // Enable context isolation
        enableRemoteModule: false, // Disable remote module
      },
    });

    mainWindow.loadURL(
      isDev
        ? 'http://localhost:3000'
        : `file://${path.join(__dirname, '../build/index.html')}`
    );

    if (isDev) {
      mainWindow.webContents.openDevTools();
    }
  }

  app.on('ready', createWindow);

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

  ipcMain.handle('start-broadcasting', async () => {
    return new Promise((resolve, reject) => {
      try {
        startBroadcasting(() => {
          resolve('connected');
        });
      } catch (error) {
        reject(error);
      }
    });
  });

  ipcMain.handle('stop-broadcasting', async () => {
    return new Promise((resolve, reject) => {
      try {
        stopBroadcasting();
        resolve('disconnected');
      } catch (error) {
        reject(error);
      }
    });
  });

  ipcMain.handle('start-websocket-server', async () => {
    return new Promise((resolve, reject) => {
      try {
        startWebSocketServer();
        resolve('websocket-started');
      } catch (error) {
        reject(error);
      }
    });
  });

  ipcMain.handle('stop-websocket-server', async () => {
    return new Promise((resolve, reject) => {
      try {
        stopWebSocketServer();
        resolve('websocket-stopped');
      } catch (error) {
        reject(error);
      }
    });
  });
})();