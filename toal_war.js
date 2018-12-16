var fs = require("fs");
var vm = require("vm");
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({port: 40510});

vm.runInThisContext(fs.readFileSync(__dirname + "/fight.js"));
vm.runInThisContext(fs.readFileSync(__dirname + "/initGame.js"));
vm.runInThisContext(fs.readFileSync(__dirname + "/cartenation.js"));
vm.runInThisContext(fs.readFileSync(__dirname + "/creation_cartes.js"));
vm.runInThisContext(fs.readFileSync(__dirname + "/game_server.js"));

/*global connect do_msg game:true respond init_game start:true player_in:true player_wait:true check_connection*/
start = false;
game = init_game();
//quand quelqu'un ce connect
wss.on('connection', function (ws)
{
  ws.me = 0;
  ws.qquit = 1;
  //quand le server recoit un message
  ws.on('message', function (message)
  {
    message = JSON.parse(message);
    console.log("team" + ws.me + " send: ");
    console.log(message);
    if (message.order === "connect"/* && ws.me === 0*/)
      ws.me = check_connection(message.msg, ws);
    else if (start === true)
      interpret_msg(ws.me, message);
  });
  // 10 fois par secondes le serveur actualise et envoit les infos aux clients
    setInterval(() => respond(ws.me, ws, wss), 40);
});

function interpret_msg(me, message)
{
  if (me === 1)
    do_msg(game.team1, message);
  else if (me === 2)
    do_msg(game.team2, message);
  else if (me === 3)
    do_msg(game.team3, message);
}

wss.broadcast = function broadcast(msg)
{
  for (let i = 0; i < player_in.length; i++)
    player_in[i].send(msg);
};

function check_connection(name, ws)
{
  ws.name = name;
  var me = connect(name);
  if (me != 0)
    player_in.push(ws);
  else
    player_wait.push(ws);
  if (me === 3 && start === false)
  {
    wss.broadcast("start");
    start = true;
  }
  else if (start === true && me != 0)
    ws.send("start");
  return (me);
}