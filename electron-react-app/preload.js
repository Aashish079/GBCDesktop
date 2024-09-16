const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  startBroadcasting: () => ipcRenderer.invoke('start-broadcasting'),
  stopBroadcasting: () => ipcRenderer.invoke('stop-broadcasting'),
  startWebSocketServer: () => ipcRenderer.invoke('start-websocket-server'),
  stopWebSocketServer: () => ipcRenderer.invoke('stop-websocket-server'),
});