/*global init_game game:true*/

var start = false;
var player_in = [];

var players = [false, false, false];

function connect(name)
{
    var team = 0;
    if (players[0] === false)
    {
        game.team1.name = name;
        team = 1;
        players[0] = true;
    }
    else if (players[1] === false)
    {
        game.team2.name = name;
        team = 2;
        players[1] = true;
    }
    else if (players[2] === false)
    {
        game.team3.name = name;
        team = 3;
        players[2] = true;
    }
    else
        console.log("not enought place for a new player");
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
            if (ws.me - 1 === 0)
                game.team1.city = -1;
            else if (ws.me - 1 === 1)
                game.team2.city = -1;
            else if (ws.me - 1 === 2)
                game.team3.city = -1;
        }
    }
}
