const tab = ["Russie", "France", "Vatican", "Portugal", "Monaco", "USA", "Coree du nord", "Japon", "Bresil", "Italie", "Grece", "Quatar", "Suisse"];
for (let i = 0; i < tab.length; i++)
    document.getElementById("choose_nation").innerHTML += "<option>" + tab[i] + "</option>";
    
function nation_explain(select)
{
    const nation_explain_txt = ["La Russie supprime tous les soldats, chars, avions et cartes atout dans le jeux. <br> L'argent de tous les joueurs est aussi a 0. La Russie est affectee par sa competence.",
    "La France fait greve ... Voila ! <br>Vos unites ne bougent plus et constituent un solide rempart. <br> Vos soldats, chars et avions ont : vitesse = 0 et pv * 2",
    "Le Vatican motive ses troupes, les unites deviennent plus rapides et plus fortes. <br> Vos soldats, avions et chars ont : vitesse * 1.5, pv * 1.5 et degat * 1.5",
    "Le Portugal se permet de reparer sa ville. <br> La ville se soigne de 100pv",
    "Monaco puise dans ses reserves afin de gagner un peu plus d'argent, ils ne sont pas a ca pres... <br> Gagne (prix de la competence / 2) d'argent",
    "Les USA Detruisent la planete pour l'argent, mais en periode de guerre on s'en fiche non ? <br> Gagne 150 d'argent mais la ville perd 150 pv",
    "Les menaces de la Coree du nord sont-elles a prendre au serieux ? <br> Le prochain avion mis sur le terrain aura 250 pv et 0 degat",
    "Le Japon et ses radiations ...<br> Toutes les villes perdent 50 pv et les soldats, chars et avions dans toutes les casernes ont une vitesse de 0.08",
    "Le Bresil detruit la foret amazonienne pour l'argent... il y a un avantage a ca, oui ! <br> Le prix des capacites de nation des joueurs ennemies revient a 10 d'argent et vous gagnez en argent le prix que vos ennemie aurait du payer divisé par deux",
    "L'Italie appelle le big boss de la mafia<br>Creer un soldat avec 10 pv, 2 de degat et 0.1 de vitesse",
    "La Grece touche les aides de l'Europe<br> Vole 20 d'argent aux autres joueurs. Ne depense pas l'argent requise pour la capacite.",
    "Le Quatar possede du petrole et du gaz a revendre<br>Le joueur gagne plus d'argent au fil du temps chaque fois qu'il utilise sa competence",
    "Tous les sportifs vont mettre leurs argents dans les banques suisse, cependant il faut faire attention lorsqu'on fait un pret...<br> Le joueur gagne (160 + prix de la competence) d'argents mais il perd l'argent au bout de 1 minute. <br> Son argent peut passer dans le negatif, et il ne peut pas cumuler les prets"];
    for (let i = 0; i < tab.length; i++)
    {
        if (select.value == tab[i])
            document.getElementById("nation_explain").innerHTML = nation_explain_txt[i];
    }
}

function rename_button_nation(nation)
{
    var nation_name = tab;
    const txt_nation = ["Demander a Poutine de tout detruire", "Greve !", "Battez vous pour moi, mais battez vous mieux !", "Mon mur a besoin d'etre repare", "Bling Bling !", "Mon empire pour du petrol", "Armee fantome", "Radiation", "Deforestation", "Mafia", "Aides de l'UE", "Puits de petrole", "Pret a la banque de losane"];
    for (let i = 0; i < nation_name.length; i++)
    {
        if (nation === nation_name[i])
            document.getElementById("nation_power").innerHTML = nation + " " + txt_nation[i];
    }
}