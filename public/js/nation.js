var tab = ["Russie", "France", "Vatican", "Portugal", "Monaco"];
for (let i = 0; i < tab.length; i++)
    document.getElementById("choose_nation").innerHTML += "<option>" + tab[i] + "</option>";
    
function nation_explain(select)
{
    var nation_explain_txt = ["La Russie supprime tous les soldats, chars, avions et cartes dans le jeux. L'argent de tous les joueurs est aussi a 0. La Russi est affectee par sa competence.",
    "La France fait greve ... Voila vos unites ne bougent plus et constitue un solide rempart. <br> vitesse 0 - pv * 2",
    "Le Vatican motive ses troupes, les unites deviennent plus rapides et plus fortes. <br> vitesse * 1.5 - pv * 1.5 - degat * 1.5",
    "Le Portugal ce permet de reparer sa ville. Moins le Portugale a de point de vie, plus le Portugal ce soigne. <br> pv = (600 - pv actuel) / 2",
    "Monaco puise dans ses reserves afin de gagner un peu plus d'argent, ils ne sont pas a ca pres... <br> argent + 50"];
    for (let i = 0; i < tab.length; i++)
    {
        if (select.value == tab[i])
            document.getElementById("nation_explain").innerHTML = nation_explain_txt[i];
    }
}