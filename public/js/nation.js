var tab = ["Russie", "France", "Vatican", "Portugal", "Monaco", "USA", "Coree du nord"];
for (let i = 0; i < tab.length; i++)
    document.getElementById("choose_nation").innerHTML += "<option>" + tab[i] + "</option>";
    
function nation_explain(select)
{
    var nation_explain_txt = ["La Russie supprime tous les soldats, chars, avions et cartes dans le jeux. L'argent de tous les joueurs est aussi a 0. La Russi est affectee par sa competence.",
    "La France fait greve ... Voila vos unites ne bougent plus et constitue un solide rempart. <br> vitesse 0 - pv * 2",
    "Le Vatican motive ses troupes, les unites deviennent plus rapides et plus fortes. <br> vitesse * 1.5 - pv * 1.5 - degat * 1.5",
    "Le Portugal ce permet de reparer sa ville. Moins le Portugale a de point de vie, plus le Portugal ce soigne. <br> pv joueur = (400 - pv joueur actuel) / 2",
    "Monaco puise dans ses reserves afin de gagner un peu plus d'argent, ils ne sont pas a ca pres... <br> argent + (prix de la competence / 2)",
    "Les USA Detruisent la planete pour l'argent mais en periode de guerre on s'en fiche non ? <br> argent + 150 - pv joueur - 150",
    "Les menaces de la Coree du nord sont elles a prendre au serieux ? <br> prochain avion mis sur le terrain: pv 100 - degat 0"];
    for (let i = 0; i < tab.length; i++)
    {
        if (select.value == tab[i])
            document.getElementById("nation_explain").innerHTML = nation_explain_txt[i];
    }
}

function rename_button_nation(nation)
{
    var nation_name = tab;
    var txt_nation = ["Demander à Poutine de tout détruire", "Gréve !", "Battez vous pour moi, mais battez vous mieux !", "Mon mur a besoin d'être reparé", "Bling Bling !", "Mon empire pour du pétrol", "Armée fantome"];
    for (let i = 0; i < nation_name.length; i++)
    {
        if (nation === nation_name[i])
            document.getElementById("nation_power").innerHTML = nation + " " + txt_nation[i];
    }
}