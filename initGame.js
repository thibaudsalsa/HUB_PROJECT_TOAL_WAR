/*global attack attack_city move_unit launch_right launch_left use_card buy_card init_deck use_nation_power*/
function init_game()
{
	var game = new Object();
	//les trois equipe
	var rgb = [0, 0, 200];
	var pos_unit = [0.6, 0.6, 0];
	game.team1 = create_team(rgb, pos_unit, 1);
	rgb = [253, 106, 2];
	pos_unit = [0.6, 6, 0];
	game.team2 = create_team(rgb, pos_unit, 2);
	rgb = [200, 0, 0];
	pos_unit = [6, 0.6, 0];
	game.team3 = create_team(rgb, pos_unit, 3);
	game.attack = attack;
	game.attack_city = attack_city;
	game.move = move_unit;
	game.info = "";
	game.deck = init_deck();
	return (game);
}

function create_team(rgb, pos_unit, numero_team)
{
	var team = new Object();
	team.name = "";
	team.id = numero_team;
	team.player = "";
	team.color = "";
	team.money = 100;
	team.city = 600;
	team.carte = [];
	team.r = rgb[0];
	team.g = rgb[1];
	team.b = rgb[2];
	team.pos_unit = pos_unit;
	team.unit = create_team_unit();
	team.add = add_unit;
	team.launch_right = launch_right;
	team.launch_left = launch_left;
	team.use_card = use_card;
	team.get_card = buy_card;
	team.use_nation = use_nation_power;
	return (team);
}

function create_team_unit()
{
	var team_unit = new Object();
	//unité dans la caserne
	team_unit.char = [];
	team_unit.soldat = [];
	team_unit.avion = [];
	//unité qui attack a gauche
	team_unit.unit_left = new Object();
	team_unit.unit_left.char = [];
	team_unit.unit_left.soldat = [];
	team_unit.unit_left.avion = [];
	//unité qui attack a droite
	team_unit.unit_right = new Object();
	team_unit.unit_right.char = [];
	team_unit.unit_right.soldat = [];
	team_unit.unit_right.avion = [];
	return (team_unit);
}

function add_unit(type, nbr)
{
	if (this.unit.soldat.length + this.unit.char.length + this.unit.avion.length < 100 && this.money >= 5)
	{
		this.money -= 5;
		for (let i = 0; i < nbr && type == "char"; i++)
			this.unit.char.push(create_char(this.r, this.g, this.b, this.pos_unit));
		for (let i = 0; i < nbr && type == "avion"; i++)
			this.unit.avion.push(create_avion(this.r, this.g, this.b, this.pos_unit));	
		for (let i = 0; i < nbr && type == "soldat"; i++)
			this.unit.soldat.push(create_soldat(this.r, this.g, this.b, this.pos_unit));
	}
}

function create_char(r, g, b, pos_unit)
{
	var char = new Object();
	char.pv = 1;
	char.dmg = 1;
	char.speed = 1 / 3;
	char.color = [r, g, b];
	char.x = pos_unit[0];
	char.y = pos_unit[1];
	char.z = pos_unit[2];
	char.sizex = 0.2;
	char.sizey = 0.2;
	char.sizez = 0.2;
	char.hit = -1;
	return (char);
}

function create_soldat(r, g, b, pos_unit)
{
	var soldat = new Object();
	soldat.pv = 1;
	soldat.dmg = 1;
	soldat.speed = 1 / 3;
	soldat.color = [r, g, b];
	soldat.x = pos_unit[0];
	soldat.y = pos_unit[1];
	soldat.z = pos_unit[2];
	soldat.sizex = 0.1;
	soldat.sizey = 0.1;
	soldat.sizez = 0.4;
	soldat.hit = -1;
	return (soldat);
}

function create_avion(r, g, b, pos_unit)
{
	var avion = new Object();
	avion.pv = 1;
	avion.dmg = 1;
	avion.speed = 6 / 3;
	avion.color = [r, g, b];
	avion.x = pos_unit[0];
	avion.y = pos_unit[1];
	avion.z = pos_unit[2] + 1;
	avion.sizex = 0.3;
	avion.sizey = 0.1;
	avion.sizez = 0.01;
	avion.hit = -1;
	return (avion);
}
