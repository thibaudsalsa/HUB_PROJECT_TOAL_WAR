var fs = require("fs");
var vm = require("vm");
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({port: 40510});

wss.on('connection', function (ws)
{
  ws.on('message', function (message)
  {
  });
});