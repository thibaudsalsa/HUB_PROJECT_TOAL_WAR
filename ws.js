var fs = require("fs");
var vm = require("vm");
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({port: 40510});

start = false;
game = init_game();
//quand quelqu'un ce connect
wss.on('connection', function (ws)
{
});
