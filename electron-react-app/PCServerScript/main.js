const BroadcastService = require('./services/BroadcastService');
const WebSocketService = require('./services/WebSocketService');

const BROADCASTING_PORT = 9732;
const BROADCASTING_DELAY = 3000;
const WEB_SOCKET_PORT = 9648;

const broadcastService = new BroadcastService(
  BROADCASTING_PORT,
  BROADCASTING_DELAY,
  WEB_SOCKET_PORT,
);
const webSocketService = new WebSocketService(WEB_SOCKET_PORT);

function startBroadcasting(callback){
    broadcastService.start();
    if(callback)callback();
}

function stopBroadcasting(callback){
    broadcastService.stop();
}

function startWebSocketServer(){
  webSocketService.start();
}

function stopWebSocketServer(){
  webSocketService.stop();
}

console.log("Server is running")

module.exports = {
  startBroadcasting,
  stopBroadcasting,
  startWebSocketServer,
  stopWebSocketServer,
};
