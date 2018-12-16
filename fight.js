function do_dmg(unit, target, attack_type, defense_type)
{
	var malus = 1;
	if ((unit.x >= target.x - 0.1 && unit.x <= target.x + 0.1)
	&& (unit.y >= target.y - 0.1 && unit.y <= target.y + 0.1)
	&& unit.hit <= 0
	&& target.pv > 0.001)
	{
		if (attack_type == "char" && defense_type == "avion"
		|| attack_type == "soldat" && defense_type == "char"
		|| attack_type == "avion" && defense_type == "soldat")
			unit.hit -= 1;
		if (attack_type == "avion" && defense_type == "char"
		|| attack_type == "char" && defense_type == "soldat"
		|| attack_type == "soldat" && defense_type == "avion")
			malus = 2;
		target.pv -= (unit.dmg / malus) / 100;
		unit.hit += 2;
	}
}

function die(tab)
{
	var tmp = [];
	
	for (let i = 0; i < tab.length; i++)
	{
		if (tab[i].pv > 0.001)
			tmp.push(tab[i]);
	}
	return (tmp);
}

function unit_attack(my_unit, ennemies, type)
{
    //attaquent les chars
	for (let i = 0; i < my_unit.length; i++)
	{
		for (let j = 0; j < ennemies.char.length; j++)
			do_dmg(my_unit[i], ennemies.char[j], type, "char");
	}
	//attaquent les soldats
	for (let i = 0; i < my_unit.length; i++)
	{
		for (let j = 0; j < ennemies.soldat.length; j++)
			do_dmg(my_unit[i], ennemies.soldat[j], type, "soldat");
	}
	//attaquent les avions
	for (let i = 0; i < my_unit.length; i++)
	{
		for (let j = 0; j < ennemies.avion.length; j++)
			do_dmg(my_unit[i], ennemies.avion[j], type, "avion");
	}
}

function fight(my_units, ennemies)
{
	//les avions attaquent
	unit_attack(my_units.avion, ennemies, "avion");
	unit_attack(ennemies.avion, my_units, "avion");
	//les soldats attaquents
	unit_attack(my_units.soldat, ennemies, "soldat");
	unit_attack(ennemies.soldat, my_units, "soldat");
	//les chars attaquent
	unit_attack(my_units.char, ennemies, "char");
	unit_attack(ennemies.char, my_units, "char");

	ennemies.char = die(ennemies.char);
	ennemies.soldat = die(ennemies.soldat);
	ennemies.avion = die(ennemies.avion);
	my_units.char = die(my_units.char);
	my_units.soldat = die(my_units.soldat);
	my_units.avion = die(my_units.avion);
}

function attack()
{
	fight(this.team1.unit.unit_left, this.team2.unit.unit_right);
	fight(this.team2.unit.unit_left, this.team3.unit.unit_right);
	fight(this.team3.unit.unit_left, this.team1.unit.unit_right);
}

function dmg_city(unit, city_pv, posx, posy)
{
    for (let i = 0; i < unit.avion.length; i++)
    {
        if ((unit.avion[i].x >= posx - 0.1 && unit.avion[i].x <= posx + 0.1)
        && (unit.avion[i].y >= posy - 0.1 && unit.avion[i].y <= posy + 0.1)
        && unit.avion[i].hit == -1)
        {
        	if (city_pv < 0)
        		unit.avion[i].pv = 0;
            city_pv -= unit.avion[i].dmg / 100;
            unit.avion[i].pv -= 1 / 100;
            unit.avion[i].hit += 2;
        }
    }
    for (let i = 0; i < unit.soldat.length; i++)
    {
        if ((unit.soldat[i].x >= posx - 0.1 && unit.soldat[i].x <= posx + 0.1)
        && (unit.soldat[i].y >= posy - 0.1 && unit.soldat[i].y <= posy + 0.1)
        && unit.soldat[i].hit == -1)
        {
        	if (city_pv < 0)
        		unit.soldat[i].pv = 0;
            city_pv -= (unit.soldat[i].dmg / 100) * 6;
            unit.soldat[i].pv -= 1 / 100;
            unit.soldat[i].hit = 1;
        }
    }
    for (let i = 0; i < unit.char.length; i++)
    {
        if ((unit.char[i].x >= posx - 0.1 && unit.char[i].x <= posx + 0.1)
        && (unit.char[i].y >= posy - 0.1 && unit.char[i].y <= posy + 0.1)
        && unit.char[i].hit == -1)
        {
        	if (city_pv < 0)
        		unit.char[i].pv = 0;
            city_pv -= unit.char[i].dmg / 100;
            unit.char[i].pv -= (1 / 100) / 6;
            unit.char[i].hit = 1;
        }
    }
    unit.char = die(unit.char);
	unit.soldat = die(unit.soldat);
	unit.avion = die(unit.avion);
    return (city_pv);
}

function attack_city()
{
    var unit;
    //les unités de la team 1 attaquent les villes
    unit = this.team1.unit.unit_left;
    this.team2.city = dmg_city(unit, this.team2.city, this.team2.pos_unit[0], this.team2.pos_unit[1]);
    unit = this.team1.unit.unit_right;
    this.team3.city = dmg_city(unit, this.team3.city, this.team3.pos_unit[0], this.team3.pos_unit[1]);
    //les unités de la team 2 attaquent les villes
    unit = this.team2.unit.unit_left;
    this.team3.city = dmg_city(unit, this.team3.city, this.team3.pos_unit[0], this.team3.pos_unit[1]);
    unit = this.team2.unit.unit_right;
    this.team1.city = dmg_city(unit, this.team1.city, this.team1.pos_unit[0], this.team1.pos_unit[1]);
    //les unités de la team 3 attaquent les villes
    unit = this.team3.unit.unit_left;
    this.team1.city = dmg_city(unit, this.team1.city, this.team1.pos_unit[0], this.team1.pos_unit[1]);
    unit = this.team3.unit.unit_right;
    this.team2.city = dmg_city(unit, this.team2.city, this.team2.pos_unit[0], this.team2.pos_unit[1]);
}

function back_hit(unit)
{
	for (let i = 0; i < unit.avion.length; i++)
		unit.avion[i].hit = -1;
	for (let i = 0; i < unit.soldat.length; i++)
		unit.soldat[i].hit = -1;
	for (let i = 0; i < unit.char.length; i++)
		unit.char[i].hit = -1;
}

function move_type(unit, x_operator, y_operator)
{
	for (let i = 0; i < unit.avion.length; i++)
	{
		if (unit.avion[i].hit === -1)
			move(unit.avion[i], x_operator, y_operator);
	}
	for (let i = 0; i < unit.soldat.length; i++)
	{
		if (unit.soldat[i].hit === -1)
			move(unit.soldat[i], x_operator, y_operator);
	}
	for (let i = 0; i < unit.char.length; i++)
	{
		if (unit.char[i].hit === -1)
			move(unit.char[i], x_operator, y_operator);
	}
	back_hit(unit);
}

function move(unit, x_operator, y_operator)
{
	if (x_operator === '+')
		unit.x += unit.speed / 100;
	else if (x_operator === '-')
		unit.x -= unit.speed / 100;
	if (y_operator === '+')
		unit.y += unit.speed / 100;
	else if (y_operator === '-')
		unit.y -= unit.speed / 100;
}

function move_unit()
{
	//move unit team1
	move_type(this.team1.unit.unit_left, 'o', '+');
	move_type(this.team1.unit.unit_right, '+', 'o');
	//move unit team2
	move_type(this.team2.unit.unit_left, '+', '-');
	move_type(this.team2.unit.unit_right, 'o', '-');
	//move unit team3
	move_type(this.team3.unit.unit_left, '-', 'o');
	move_type(this.team3.unit.unit_right, '-', '+');
}

function launch_left(type, nb)
{
	if (nb > 100)
		nb = 100;
	if (type === "char" && this.unit.char.length >= nb)
	{
		for (let i = 0; i < nb; i++)
		{
			this.unit.unit_left.char.push(this.unit.char[this.unit.char.length - 1]);
			this.unit.char.pop();
		}
	}
	else if (type === "avion" && this.unit.avion.length >= nb)
	{
		for (let i = 0; i < nb; i++)
		{
			this.unit.unit_left.avion.push(this.unit.avion[this.unit.avion.length - 1]);
			this.unit.avion.pop();
		}
	}
	else if (type === "soldat" && this.unit.soldat.length >= nb)
	{
		for (let i = 0; i < nb; i++)
		{
			this.unit.unit_left.soldat.push(this.unit.soldat[this.unit.soldat.length - 1]);
			this.unit.soldat.pop();
		}
	}
}

function launch_right(type, nb)
{
	if (nb > 100)
		nb = 100;
	if (type === "char" && this.unit.char.length >= nb)
	{
		for (let i = 0; i < nb; i++)
		{
			this.unit.unit_right.char.push(this.unit.char[this.unit.char.length - 1]);
			this.unit.char.pop();
		}
	}
	else if (type === "avion" && this.unit.avion.length >= nb)
	{
		for (let i = 0; i < nb; i++)
		{
			this.unit.unit_right.avion.push(this.unit.avion[this.unit.avion.length - 1]);
			this.unit.avion.pop();
		}
	}
	else if (type === "soldat" && this.unit.soldat.length >= nb)
	{
		for (let i = 0; i < nb; i++)
		{
			this.unit.unit_right.soldat.push(this.unit.soldat[this.unit.soldat.length - 1]);
			this.unit.soldat.pop();
		}
	}
}