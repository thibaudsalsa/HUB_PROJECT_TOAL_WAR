/*global game:true create_tab_nation add_fct*/
const PRICE_TEAM_POWER = 5;
const id_cartes = ["plagiat",
			"soin",
			"Pret a la banque", 
			"appuie aerien",
			"incendie",
			"bluff", 
			"seismes",
			"allie inattendu",
			"forcer le jeu", 
			"d'une pierre deux cartes",
			"retentez votre chance",
			"espion 2",
			"boost de degat",
			"boost de vie",
			"boost de vitesse",
			"attentat",
			"maitre des cartes",
			"inflation"];
			
const description_cartes = ["Copie une carte d'un joueur adverse",
				"Soigne votre Ville de 15 pv",
				"Gagne entre 30 et 60 d'argent",
				"Une ville ennemie perd 15 pv",
				"Une ville perd entre 0 et 25 soldats, chars et avions",
				"Fait croire aux adversaires que vous avez utilisé une carte nation USA",
				"Détruit toutes les unités sur un trajet entre deux villes aléatoires",
				"Gagne entre 0 et 15 soldats, chars et avions",
				"Force un ennemi au hasard a utiliser une carte",
				"Remplace votre carte et gagne 40 d'argent",
				"Gagne 20 argents",
				"Donne au public le nombre d'unités dans la caserne d'un joueur ennemie au hasard",
				"Multiplie par 2 les dégâts du prochain soldat, char et avion",
				"Multiplie par 2 les pv du prochain soldat, char et avion",
				"Multiplie par 2 la vitesse du prochain soldat, char et avion",
				"Inflige 30 dégâts sur une ville ennemie, mais vous perdez 30 dégâts sur votre ville",
				"Diminue le prix d'achat de vos cartes de 5",
				"Augmente le prix des unités d'un ennemie de 1"];
				
const text_cartes = ["a utilise un atout.", 
				"a utilise un atout.", 
				"a utilise un atout.",
				"a utilise un Appuie aerien.",
				"a declanche un incendie.",
				"La/Le USA a utilise sa capacite",
				"a fait tremble le sol.",
				"a utilise un atout.",
				"vous a force a utiliser une carte.",
				"a utilise un atout.",
				"a utilise un atout.",
				"a une information a vous donner.",
				"a utilise un atout.",
				"a utilise un atout.",
				"a utilise un atout.",
				"a tous fait peter, BOOM 3 morts",
				"a utilise un atout.",
				"a utilise un atout."];
				
const fonction_cartes = [plagiat,
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
						espion2,
						boost_dmg,
						boost_pv,
						boost_speed,
						attentat,
						maitre_des_cartes,
						inflation];

const proba_cartes = [4, 2, 4, 4, 6, 5, 2, 8, 8, 3, 4, 9, 7, 7, 7, 4, 1, 2];

function create_carte_template()
{
	var tab_card = [];
	var id = id_cartes;
	var description = description_cartes;
	var text = text_cartes;
	var tab_fct_bonus = fonction_cartes;
	var prob = proba_cartes;
	for (let i = 0; i < id.length; i++)
	{
		var card = new Object();
		card.id = id[i];
		card.desc = description[i];
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
	var price = this.price_card;
	if (this.carte.length < 3 && this.money >= price)
	{
		this.money -= price;
		this.carte.push(game.deck[(Math.floor(Math.random() * (game.deck.length)))]);
	}
}

function maitre_des_cartes(team)
{
	if (team.price_card > 5)
		team.price_card -= 5;
}

function attentat(team)
{
	var tab = return_enemie_team(team);
	var target = Math.floor(Math.random() * (2));
	if (target === 1)
		tab[0].city -= 30;
	else
		tab[1].city -= 30;
	team.city -= 30;
}

function plagiat(team)
{
	var tab_team = [game.team1, game.team2, game.team3];
	var num = team.id;

	num += 1;
	if (num == 4)
		num = 1;
	var target = Math.floor(Math.random() * (2));
	if (target == 1)
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

function boost_dmg(team)
{
	if (team.unit.soldat.length >= 1)
		team.unit.soldat[team.unit.soldat.length - 1].dmg = team.unit.soldat[team.unit.soldat.length - 1].dmg * 2;
	if (team.unit.char.length >= 1)
		team.unit.char[team.unit.char.length - 1].dmg = team.unit.char[team.unit.char.length - 1].dmg * 2;
	if (team.unit.avion.length >= 1)
		team.unit.avion[team.unit.avion.length - 1].dmg = team.unit.avion[team.unit.avion.length - 1].dmg * 2;
}

function boost_pv(team)
{
	if (team.unit.soldat.length >= 1)
		team.unit.soldat[team.unit.soldat.length - 1].pv = team.unit.soldat[team.unit.soldat.length - 1].pv * 2;
	if (team.unit.char.length >= 1)
		team.unit.char[team.unit.char.length - 1].pv = team.unit.char[team.unit.char.length - 1].pv * 2;
	if (team.unit.avion.length >= 1)
		team.unit.avion[team.unit.avion.length - 1].pv = team.unit.avion[team.unit.avion.length - 1].pv * 2;
}

function boost_speed(team)
{
	if (team.unit.soldat.length >= 1)
		team.unit.soldat[team.unit.soldat.length - 1].speed = team.unit.soldat[team.unit.soldat.length - 1].speed * 2;
	if (team.unit.char.length >= 1)
		team.unit.char[team.unit.char.length - 1].speed = team.unit.char[team.unit.char.length - 1].speed * 2;
	if (team.unit.avion.length >= 1)
		team.unit.avion[team.unit.avion.length - 1].speed = team.unit.avion[team.unit.avion.length - 1].speed * 2;
}

function bluff(team)
{
}

function soin(team)
{
	team.city += 15;
	if (team.city > 400)
		team.city = 400;
}

function pret_a_la_banque(team)
{
	team.money += (Math.floor(Math.random() * (30))+30);
}

function inflation(team)
{
	var tab = return_enemie_team(team);
	var target = Math.floor(Math.random() * (2));
	if (target == 1)
		tab[0].price_unit += 1;
	else 
		tab[tab.length - 1].price_unit += 1;
}

function appuie_aerien(team)
{
	var tab = return_enemie_team(team);
	var target = Math.floor(Math.random() * (2));
	if (target == 1)
		tab[0].city -= 15;
	else 
	{
		tab[tab.length - 1].city -= 15;
	}
}

function incendie(team)
{
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
	team.add("char",Math.floor(Math.random() * (15)) + 1);
	team.add("avion",Math.floor(Math.random() * (15)) + 1);
	team.add("soldat",Math.floor(Math.random() * (15)) + 1);
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
		game.info += "La team " + color[tab[0].id - 1] + " possede : " + 
						tab[0].unit.char.length + " char, " + 
						tab[0].unit.avion.length + " avion, " +
						tab[0].unit.soldat.length + " soldat.\n" ;
	else
		game.info += "La team " + color[tab[tab.length - 1].id - 1] + " possede : " + 
						tab[tab.length - 1].unit.char.length + " char, " + 
						tab[tab.length - 1].unit.avion.length + " avion, " +
						tab[tab.length - 1].unit.soldat.length + " soldat.\n" ;
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

function use_nation_power()
{
    var nation_liste = ["Russie", "France", "Vatican", "Portugal", "Monaco", "USA", "Coree du nord", "Japon", "Bresil", "Italie", "Grece", "Quatar", "Suisse"];
    var nation_fcnt  = [Russie, France, Vatican, Portugal, Monaco, USA, Coree_du_nord, Japon, Bresil, Italie, Grece, Quatar, Suisse];
    var value = "KO";
    for (var i = 0; i < nation_liste.length; i++)
    {
        if (this.name === nation_liste[i] && this.money >= this.nation_price)
        {
            value = nation_fcnt[i](this);
            if (value === "OK")
            	this.nation_price = this.nation_price * PRICE_TEAM_POWER;
        }
    }
    if (value === "OK")
    	game.info += "La/Le " + this.name + " a utilise sa capacite\n"  ;
}

function Coree_du_nord(team)
{
    team.add("avion", 1);
    team.unit.avion[team.unit.avion.length - 1].pv = 250;
    team.unit.avion[team.unit.avion.length - 1].dmg = 0;
    team.money -= team.nation_price;
    return ("OK");
}

/* transforme des pv en argent */
function USA(team)
{
	team.city -= 150;
	team.money += 150;
	return ("OK");
}

//detruit les cartes et les unités de tous les joeurs
function Russie(team)
{
    reset_russia(game.team1);
    reset_russia(game.team2);
    reset_russia(game.team3);
    return ("OK");
}

function reset_russia(team)
{
    team.money = 0;
    team.carte = [];
    team.unit.unit_left.soldat = [];
    team.unit.unit_left.char = [];
    team.unit.unit_left.avion = [];
    team.unit.unit_right.soldat = [];
    team.unit.unit_right.char = [];
    team.unit.unit_right.avion = [];
    team.unit.soldat = [];
    team.unit.char = [];
    team.unit.avion = [];
}

// vos unité s'arretent 
function France(team)
{
    set_unit_France(team.unit.unit_left.soldat);
    set_unit_France(team.unit.unit_left.char);
    set_unit_France(team.unit.unit_left.avion);
    set_unit_France(team.unit.unit_right.soldat);
    set_unit_France(team.unit.unit_right.char);
    set_unit_France(team.unit.unit_right.avion);
    team.money -= team.nation_price;
    return ("OK");
}

function set_unit_France(unit)
{
    for (let i = 0; i < unit.length; i++)
    {
        unit[i].speed = 0;
        unit[i].pv = unit[i].pv * 2;
    }
}

function set_unit_vatican(unit)
{
    for (let i = 0; i < unit.length; i++)
    {
        unit[i].speed = unit[i].speed * 1.5;
        unit[i].pv = unit[i].pv * 1.5;
        unit[i].dmg = unit[i].dmg * 1.5;
    }
}

// boost vos unités sur le terrain
function Vatican(team)
{
    set_unit_vatican(team.unit.unit_left.soldat);
    set_unit_vatican(team.unit.unit_left.char);
    set_unit_vatican(team.unit.unit_left.avion);
    set_unit_vatican(team.unit.unit_right.soldat);
    set_unit_vatican(team.unit.unit_right.char);
    set_unit_vatican(team.unit.unit_right.avion);
    team.money -= team.nation_price;
    return ("OK");
}

// la cité recupere des pv
function Portugal(team)
{
    team.money -= team.nation_price;
    team.city += 100;
    return ("OK");
}

// recupere un peu d'argent
function Monaco(team)
{
    team.money += parseInt((team.nation_price / 2), 10);
    return ("OK");
}

function set_unit_japon(team)
{
	for (let i = 0; i < team.unit.soldat.length; i++)
		team.unit.soldat[i].speed = 0.08;
	for (let i = 0; i < team.unit.char.length; i++)
		team.unit.soldat[i].char = 0.08;
	for (let i = 0; i < team.unit.avion.length; i++)
		team.unit.soldat[i].char = 0.08;
}

//degat sur les villes et reduit la vittesse de toutes les unité dans les caserne
function Japon(team)
{
	game.team1.city -= 50;
	game.team2.city -= 50;
	game.team3.city -= 50;
	set_unit_japon(game.team1);
	set_unit_japon(game.team2);
	set_unit_japon(game.team3);
	team.money -= team.nation_price;
	return ("OK");
}

//reset le prix de competence de nation et gagne en argent ce que les autres joueur auraient du payer ur la prochaine utilisation des competence de nation
function Bresil(team)
{
	var other_team = return_enemie_team(team);
	var gain1 = other_team[0].nation_price / 2;
	var gain2 = other_team[1].nation_price / 2;
	other_team[0].nation_price = 10;
	other_team[1].nation_price = 10;
	team.money += gain1 + gain2;
	team.money -= team.nation_price;
	return ("OK");
}

//achete un soldat tres puissant
function Italie(team)
{
	team.add("soldat", 1);
	team.unit.soldat[team.unit.soldat.length - 1].pv = 10;
	team.unit.soldat[team.unit.soldat.length - 1].dmg = 2;
	team.unit.soldat[team.unit.soldat.length - 1].speed = 0.1;
	team.money -= team.nation_price;
	return ("OK");
}

//vole de l'argent
function Grece(team)
{
	var target = return_enemie_team(team);
	var gain1 = 20;
	var gain2 = 20;
	if (target[0].money >= 20)
		target[0].money -= 20;
	else
	{
		gain1 = target[0].money;
		target[0].money = 0;
	}
	if (target[1].money >= 20)
		target[1].money -= 20;
	else
	{
		gain2 = target[1].money;
		target[1].money = 0;
	}
	team.money += gain1 + gain2;
	return ("OK");
}

//gagne de l'argent moi doit absolument le rendre (peu entrer dans le negatif)
function Suisse(team)
{
	if (team.bool == false)
		return ("KO");
	team.money += 160 + team.nation_price;
	team.bool = false;
	setTimeout(function(){team.money -= 160 + team.nation_price; team.bool = true}, (60000 * 1));
	team.money -= team.nation_price;
	return("OK");
}

//Gagne plus d'argent par secondes
function Quatar(team)
{
	team.money_bonus += 0.008;
	team.money -= team.nation_price;
	return("OK");
}
