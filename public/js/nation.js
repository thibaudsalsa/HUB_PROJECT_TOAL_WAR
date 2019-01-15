var tab = ["Russie", "France", "Vatican", "Portugal", "Monaco", "USA", "Coree du nord", "Japon", "Bresil", "Italie"];
for (let i = 0; i < tab.length; i++)
    document.getElementById("choose_nation").innerHTML += "<option>" + tab[i] + "</option>";
    
function nation_explain(select)
{
    var nation_explain_txt = ["La Russie supprime tous les soldats, chars, avions et cartes dans le jeux. L'argent de tous les joueurs est aussi a 0. La Russi est affectee par sa competence.",
    "La France fait greve ... Voila vos unites ne bougent plus et constitue un solide rempart. <br> Vos soldat, char et avions ont: vitesse = 0 et pv * 2",
    "Le Vatican motive ses troupes, les unites deviennent plus rapides et plus fortes. <br> Vos soldat, avion et char ont: vitesse * 2, pv * 2 et degat * 2",
    "Le Portugal ce permet de reparer sa ville. Moins le Portugale a de point de vie, plus le Portugal ce soigne. <br> La ville ce soigne de (400 - pv de la ville) / 2",
    "Monaco puise dans ses reserves afin de gagner un peu plus d'argent, ils ne sont pas a ca pres... <br> Gagne (prix de la competence / 2) d'argent",
    "Les USA Detruisent la planete pour l'argent mais en periode de guerre on s'en fiche non ? <br> Gagne 150 d'argent mais la ville perd 150 pv",
    "Les menaces de la Coree du nord sont elles a prendre au serieux ? <br> Le prochain avion mis sur le terrain aura 100 pv et 0 de degat",
    "Le Japon et ses radiations ...<br> Toutes les villes perdent 50 pv et les soldat, char et avion dans toutes les casernes ont une vitesse de 0.01",
    "Le Bresil detruit la foret amazionienne pour l'argent... il y a un avantage a ce oui ! <br> Le prix des capacite de nation des joueurs ennemie est a nouveau a 10 et vous gagner la difference entre le prix que vos ennemie aurait du payer divisé par deux",
    "L'Italie appel le big boss de la mafia<br>Creer un soldat avec 10 pv, 2 de degat et 0.1 de vitesse"];
    for (let i = 0; i < tab.length; i++)
    {
        if (select.value == tab[i])
            document.getElementById("nation_explain").innerHTML = nation_explain_txt[i];
    }
}

function rename_button_nation(nation)
{
    var nation_name = tab;
    var txt_nation = ["Demander à Poutine de tout détruire", "Gréve !", "Battez vous pour moi, mais battez vous mieux !", "Mon mur a besoin d'être reparé", "Bling Bling !", "Mon empire pour du pétrol", "Armée fantome", "Radiation", "Déforestation", "Mafia"];
    for (let i = 0; i < nation_name.length; i++)
    {
        if (nation === nation_name[i])
            document.getElementById("nation_power").innerHTML = nation + " " + txt_nation[i];
    }
}