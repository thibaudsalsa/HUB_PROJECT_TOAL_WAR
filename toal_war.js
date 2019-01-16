var fs = require("fs");
var vm = require("vm");
var WebSocketServer = require('ws').Server;

var start = false;
var player_in = [];
var players = [false, false, false];
var wss;
var game;
start_server();
setInterval(() => refresh_game(), 13);

vm.runInThisContext(fs.readFileSync(__dirname + "/fight.js"));
vm.runInThisContext(fs.readFileSync(__dirname + "/initGame.js"));
vm.runInThisContext(fs.readFileSync(__dirname + "/card.js"));
//vm.runInThisContext(fs.readFileSync(__dirname + "/game_server.js"));

/*global init_game init_game*/



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
    try
    {
      wss.broadcast("start");
      start = true;
    }
    catch(err){}
  }
  else if (start === true && me != 0)
    ws.send("start");
  return (me);
}

function start_server()
{
  wss = new WebSocketServer({port: 40510});
  wss.broadcast = broadcast;
  game = init_game();
  start = false;
  start_server(wss);
  console.log("toal_war is active\n");
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
      setInterval(() => respond(ws.me, ws, wss), 40);
  });
}

function refresh_game()
{
  if (start === false)
    return;
  if (players[0] === false && players[1] === false && players[2] === false)
  {
    console.log("toal war is re-starting\n");
    wss.close();
    start_server();
    return;
  }
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















function connect(name)
{
    var team = 0;
    if (game.team1.name === "")
    {
        game.team1.name = name;
        team = 1;
        players[0] = true;
    }
    else if (game.team2.name === "")
    {
        game.team2.name = name;
        team = 2;
        players[1] = true;
    }
    else if (game.team3.name === "")
    {
        game.team3.name = name;
        team = 3;
        players[2] = true;
    }
    return (team);
}

function do_msg(team, message_get)
{
    var type;
    var nb;
    if (team.city <= 0)
        return;
    if (message_get.order === "buy" && message_get.type != "carte")
    {
        type = message_get.type;
        nb = message_get.nb;
        team.add(type, nb);
    }
    else if (message_get.order === "attack")
    {
        type = message_get.type;
        nb = message_get.nb;
        if (message_get.direction === "left")
            team.launch_left(type, nb);
        else if (message_get.direction === "right")
            team.launch_right(type, nb);
    }
    else if (message_get.order === "use" && message_get.type === "nation")
    {
        team.use_nation();
    }
    else if (message_get.type === "carte")
    {
        if (message_get.order === "buy")
            team.get_card();
        else if (message_get.order === "use")
        {
            nb = message_get.nb;
            team.use_card(nb);
        }
    }
}

function fill_msg(msg, team, game)
{
    if (team === 1)
    {
        msg.couleur_ville = "BLEU";
        team = game.team1;
    }
    else if (team === 2)
    {
        msg.couleur_ville = "ORANGE";
        team = game.team2;
    }
    else if (team === 3)
    {
        msg.couleur_ville = "ROUGE";
        team = game.team3;
    }
    msg.soldat = team.unit.soldat.length;
    msg.avion = team.unit.avion.length;
    msg.char = team.unit.char.length;
    msg.city = team.city;
    msg.carte = team.carte;
    msg.argent = team.money;
    msg.price_card = team.price_card;
    msg.price_unit = team.price_unit;
    msg.nation_price = team.nation_price;
    msg.bool = team.bool;
}

function check_win(game, ws, msg, start)
{
    msg.winner = "";
    msg.win = false;
    if (game.team1.city > 0 && game.team3.city <= 0 && game.team2.city <= 0)
        msg.winner = "L'equipe bleu gagne la partie";
    else if (game.team2.city > 0 && game.team3.city <= 0 && game.team1.city <= 0)
        msg.winner = "L'equipe orange gagne la partie";
    else if (game.team3.city > 0 && game.team1.city <= 0 && game.team2.city <= 0)
        msg.winner = "L'equipe rouge gagne la partie";
    if (msg.winner != "")
    {
        msg.win = true;
        player_in = [];
    }
}

function respond(team, ws, wss)
{
    if (start === false || team === 0)
        return;
    var msg = new Object();
    var msg_json;
    msg.team1 = game.team1;
    msg.team2 = game.team2;
    msg.team3 = game.team3;
    msg.soldat = 0;
    msg.char = 0;
    msg.avion = 0;
    msg.city = 0;
    msg.money = 0;
    msg.info = game.info;
    fill_msg(msg, team, game);
    check_win(game, ws, msg, start);
    msg_json = JSON.stringify(msg);
    if (players[ws.me - 1] === true)
    {
        try {ws.send(msg_json);}
        catch(err)
        {
            console.log("player " + ws.me + " left the game.");
            players[ws.me - 1] = false;
        }
    }
}
