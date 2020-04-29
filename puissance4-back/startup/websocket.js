class Websocket {
  constructor(server) {
    if (!Websocket.instance) {
      Websocket.instance = require('socket.io')(server);
    }
  }

  static getInstance() {
    return Websocket.instance
  }
}

module.exports = Websocket;
