/*global init_game game:true*/

var start = false;
var player_in = [];
var player_wait = [];
var players = [false, false, false];

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
        /*game = init_game();
        start = false;*/
    }
}


/*function add_connection_wait(name, ws)
{
    ws.name = name;
    var me = connect(name);
    player_in.push(ws);
    if (start === true && me != 0 && ws.readyState != 2)
        ws.send("start");
    ws.me = me;
}*/

function respond(team, ws, wss)
{
    /*if (ws.readyState == 2 && start == true && ws.qquit == 1 && ws.me != 0)
    {
        var tab = [];
        for (let i = 0; i < player_in.length; i++)
        {
            if (ws != player_in[i])
                tab.push(player_in[i]);
        }
        player_in = tab;
        if (ws.me === 1)
            game.team1.name = "";
        else if (ws.me === 2)
            game.team2.name = "";
        else if (ws.me === 3)
            game.team3.name = "";
        console.log("someone quite the game");
        if (player_wait.length >= 1)
        {
            add_connection_wait(player_wait.name, player_wait[0]);
            player_in.push(player_wait[0]);
            var tmp_player_wait = [];
            for (let i = 1; i < player_wait.length; i++)
                tmp_player_wait.push(player_wait[i]);
            player_wait = tmp_player_wait;
        }
        if (player_in.length <= 1)
        {
            player_in = [];
            ws.qquit = 0;
            start = false;
            game = init_game();
            wss.broadcast("reset");
        }
    }*/
    if (start != false && team != 0/* && ws.readyState == 1*/)
    {
        var msg = new Object();
        var msg_json;
        /*game.attack();
        game.attack_city();
        game.move();*/
        msg.team1 = game.team1;
        msg.team2 = game.team2;
        msg.team3 = game.team3;
        msg.soldat = 0;
        msg.char = 0;
        msg.avion = 0;
        msg.city = 0;
        msg.money = 0;
        msg.info = game.info;
        /*if (game.team1.city > 0)
            game.team1.money += 0.015 + game.team1.money_bonus;
        if (game.team2.city > 0)
            game.team2.money += 0.015 + game.team2.money_bonus;
        if (game.team3.city > 0)
            game.team3.money += 0.015 + game.team3.money_bonus;*/
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
}
