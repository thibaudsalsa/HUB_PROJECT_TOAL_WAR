var fs = require("fs");
var vm = require("vm");
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({port: 40510});
wss.broadcast = broadcast;

vm.runInThisContext(fs.readFileSync(__dirname + "/fight.js"));
vm.runInThisContext(fs.readFileSync(__dirname + "/initGame.js"));
vm.runInThisContext(fs.readFileSync(__dirname + "/card.js"));
vm.runInThisContext(fs.readFileSync(__dirname + "/communication.js"));

/*global connect do_msg game:true respond init_game start:true player_in:true player_wait:true players*/
var player_wait_error = false;
var timer = [];
start = false;
game = init_game();
server(wss);
setInterval(() => check_server(), 14);
console.log("toal_war is active\n");




function interpret_msg(me, message)
{
  if (me === 1)
    do_msg(game.team1, message);
  else if (me === 2)
    do_msg(game.team2, message);
  else if (me === 3)
    do_msg(game.team3, message);
}

function broadcast(msg)
{
  for (let i = 0; i < player_in.length; i++)
  {
    if (player_in[i].ws != null)
    try{player_in[i].ws.send(msg);}
    catch(err){}
  }
}

function check_connection(name, ws)
{
  ws.name = name;
  var me = connect(name);
  if (me != 0)
  {
    var player_in_obj = new Object();
    player_in_obj.ws = ws;
    timer.push(setInterval((ws) => function()
    {
      try {ws.send("wait");}
      catch(err) {
        player_wait_error = true;
      }
    }, 14));
    player_in.push(player_in_obj);
  }
  else
    ws.send("full");
  return (me);
}

function server(wss)
{
  timer.push(setInterval(() => refresh_game(), 13));
  wss.on('connection', function (ws)
  {
    ws.me = 0;
    ws.on('message', function (message)
    {
      message = JSON.parse(message);
      console.log("team" + ws.me + " send: ");
      console.log(message);
      if (message.order === "connect")
        ws.me = check_connection(message.msg, ws);
      else if (start === true)
        interpret_msg(ws.me, message);
    });
    timer.push(setInterval(() => respond(ws.me, ws, wss), 40));
  });
}

function check_server()
{
  if (players[0] === true && players[1] === true && players[2] === true && start === false)
  {
    try
    {
      console.log("the game start")
      wss.broadcast("start");
      start = true;
    }
    catch(err)
    {
      for (let  i = 0; i < players.length; i++)
        players[i] = false;
      try {wss.broadcast("reset");}
      catch(err){}
    }
  }
  if ((players[0] === false && players[1] === false && players[2] === false && start === true) || (player_wait_error === true))
  {
    console.log("toal war is re-starting\n");
    for (let i = 0; i < players.length; i++)
      players[i] = false;
    player_wait_error = false;
    for (let i = 0; i < timer.length; i++)
      clearInterval(timer[i]);
    wss.broadcast("reset");
    player_in = [];
    wss.close();
    wss = new WebSocketServer({port: 40510});
    wss.broadcast = broadcast;
    game = init_game();
    start = false;
    server(wss);
    console.log("toal_war is active\n");
    return;
  }
}

function refresh_game()
{
  if (start === false)
    return;
  game.attack();
  game.attack_city();
  game.move();
  if (game.team1.city > 0)
    game.team1.money += 0.015 + game.team1.money_bonus;
  if (game.team2.city > 0)
    game.team2.money += 0.015 + game.team2.money_bonus;
  if (game.team3.city > 0)
    game.team3.money += 0.015 + game.team3.money_bonus;
}