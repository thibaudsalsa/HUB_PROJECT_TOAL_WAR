/*global game:true create_tab_nation add_fct*/
var id_cartes = ["plagiat",
			"soin",
			"Prêt a la banque", 
			"appuie aérien",
			"incendie","bluff", 
			"séismes",
			"allié inattendu",
			"forcer le jeu", 
			"d'une pierre de carte",
			"retentez votre chance",
			"espion2"];

var image_cartes = ["", "", "", "", "", "", "", "", "", "", "", "", ""];

var text_cartes = ["a utilisé un atout.", 
				"a utilisé un atout.", 
				"a utilisé un atout.",
				"a utilisé un Appuie aérien.",
				"a declanché un incendie.",
				"a utilisé un atout.",
				"a fait tremblé le sol.",
				"a utilisé un atout.",
				"vous a forcé à utiliser une carte.",
				"a utilisé un atout.",
				"a utilisé un atout.",
				"a une information à vous donner."];

var fonction_cartes = [plagiat,
						soin,
						pret_a_la_banque,
						appuie_aerien,
						incendie,
						bluff,
						seisme,
						allie_inattendu,
						forcer_le_jeu, 
						d_une_pierre_de_carte,
						retentez_votre_chance,
						espion2];

var proba_cartes = [4, 2, 6, 1, 4, 5, 1, 6, 4, 2, 2, 4];


/* creation des cartes bonus */
function create_carte_template()
{
	var tab_card = [];
	var id = id_cartes;
	var img = image_cartes;
	var text = text_cartes;
	var tab_fct_bonus = fonction_cartes;
	var prob = proba_cartes;
	for (let i = 0; i < id.length; i++)
	{
		var card = new Object();
		card.id = id[i];
		card.img = img[i];
		card.text = text[i];
		card.prob = prob[i];
		card.use = tab_fct_bonus[i];
		tab_card[i] = card;
	}
	return (tab_card);
}

function init_deck()
{
	var Template_carte = create_carte_template();
	var tab_proba_carte = [];
	for ( let i = 0; i < Template_carte.length; i++)
	{
		for (let j = 0; j < Template_carte[i].prob; j++)
			tab_proba_carte.push(Template_carte[i]);
	}
	return (tab_proba_carte);
}


function use_card(num_card)
{
	var color = ["bleu", "orange" , "rouge"];
	if (this.carte.length - 1 < num_card || num_card < 0 || num_card > 5)
		return ;
	game.info += "La team " + color[this.id - 1] + " " + this.carte[num_card].text + "\n"  ;
	this.carte[num_card].use(this);
	var tab_divise = [];
	for (let i = 0; i < this.carte.length; i++)
	{
		if (i != num_card)
			tab_divise.push(this.carte[i]);
	}
	this.carte = tab_divise;
}
function buy_card()
{
	var price = 20;
	if (this.carte.length > 5 || this.money < price)
		return;
	this.money -= price;
	this.carte.push(game.carte.tab_proba_carte[(Math.floor(Math.random() * (game.deck.tab_proba_carte.length + 0)))]);
}





















/* functions des cartes bonus */
function plagiat(team)
{
	var tab_team = [game.team1, game.team2, game.team3];
	var num = team.id;

	num += 1;
	if (num == 4)
		num = 1;
	var aleatoire = Math.floor(Math.random() * (2));
	if (aleatoire == 1)
	{
		if (tab_team[num - 1].carte.length != 0)
			team.carte.push(tab_team[num - 1].carte[tab_team[num - 1].carte.length - 1]);
	}
	else 
	{
		num += 1;
		if (num == 4)
			num = 1;
		if (tab_team[num - 1].carte.length != 0)
			team.carte.push(tab_team[num - 1].carte[tab_team[num - 1].carte.length - 1]);
	}
}

function bluff(team)
{
}

function soin(team)
{
		team.city += 25;
	if (team.city > 600)
		team.city = 600;
}

function pret_a_la_banque(team)
{
	team.money += (Math.floor(Math.random() * (30 + 0))+30);
}

function appuie_aerien(team)
{
	var tab = return_enemie_team(team);
	var aleatoire = Math.floor(Math.random() * (2));
	if (aleatoire == 1)
		tab[0].city -= 60;
	else 
	{
		tab[tab.length - 1].city -= 60;
	}
}

function incendie(team)
{
	/*team unesed*/
	var target = Math.floor(Math.random() * (3));
	var moins_char = Math.floor(Math.random() * (26));
	var moins_avion = Math.floor(Math.random() * (26 - moins_char));
	var moins_soldat = Math.floor(Math.random() * (26 - moins_avion - moins_soldat));
	if (target === 0)
	{
		kill_unit(game.team1.unit.char, moins_char);
		kill_unit(game.team1.unit.avion, moins_avion);
		kill_unit(game.team1.unit.soldat, moins_soldat);
	}
	else if (target === 1)
	{
		kill_unit(game.team2.unit.char, moins_char);
		kill_unit(game.team2.unit.avion, moins_avion);
		kill_unit(game.team2.unit.soldat, moins_soldat);
	}
	else
	{
		kill_unit(game.team3.unit.char, moins_char);
		kill_unit(game.team3.unit.avion, moins_avion);
		kill_unit(game.team3.unit.soldat, moins_soldat);
	}
}

function kill_unit(unit, nb)
{
	for (let i = 0; i < nb && unit.length; i++)
		unit.pop();
}

function seisme(team)
{
	var target = Math.floor(Math.random() * (3));
	switch (target)
	{
		case (0):
			delete_unit(game.team1.unit.unit_left, game.team2.unit.unit_right)
			break;
		case (1):
			delete_unit(game.team2.unit.unit_left, game.team3.unit.unit_right)
			break;
		case (2):
			delete_unit(game.team3.unit.unit_left, game.team1.unit.unit_right)
			break;
	}
}	

function allie_inattendu(team)
{
	team.add("char",Math.floor(Math.random() * (6)) + 1);
	team.add("avion",Math.floor(Math.random() * (6)) + 1);
	team.add("soldat",Math.floor(Math.random() * (6)) + 1);
}

function forcer_le_jeu(team)
{
	var tab = return_enemie_team(team);
	var target = Math.floor(Math.random() * (2));
	if (target == 0 && tab[0].carte.length > 0)
		tab[0].use_card(Math.floor(Math.random() * (tab[0].carte.length)));
	else if (target == 1 && tab[tab.length - 1].carte.length > 0)
		tab[tab.length - 1].use_card(Math.floor(Math.random() * (tab[tab.length - 1].carte.length)));
}

function d_une_pierre_de_carte(team)
{
	if (team.carte.length <= 4 )
	{	
		team.money += 40;
		team.get_card();
	}
}

function retentez_votre_chance(team)
{
	team.money += 20;
}
/* modification */
function espion2(team)
{
	var tab = return_enemie_team(team);
	var color = ["bleu", "orange" , "rouge"];
	var target = Math.floor(Math.random() * (2));
	if (target == 0)
		game.info += "La team " + color[tab[0].id - 1] + " posséde : " + 
						tab[0].unit.char.length + " char, " + 
						tab[0].unit.avion.length + " avion, " +
						tab[0].unit.soldat.length + " soldat." ;
	else
		game.info += "La team " + color[tab[tab.length - 1].id - 1] + " posséde : " + 
						tab[tab.length - 1].unit.char.length + " char, " + 
						tab[tab.length - 1].unit.avion.length + " avion, " +
						tab[tab.length - 1].unit.soldat.length + " soldat." ;
}

function delete_unit(unit1, unit2)
{
	unit1.char = [];
	unit1.avion = [];
	unit1.soldat = [];
	unit2.char = [];
	unit2.avion = [];
	unit2.soldat = [];
}

function return_enemie_team(team)
{
	var tab_team = [game.team1, game.team2, game.team3];
	var tab = [];
	for (let i = 0; i < 3; i++)
	{
		if (tab_team[i].id != team.id && tab_team[i].city > 0)
			tab.push(tab_team[i]);
	}
	return (tab);
}