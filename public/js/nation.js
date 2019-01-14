var tab = ["Russie", "France", "Vatican", "Portugal", "Monaco"];
for (let i = 0; i < tab.length; i++)
    document.getElementById("choose_nation").innerHTML += "<option>" + tab[i] + "</option>";