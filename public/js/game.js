var orange_city = 1;
var blue_city = 1;
var red_city = 1;

var unit_to_draw = [];
var me = new Object();
me.soldat = [-1];
me.char = [-1];
me.avion = [-1];
me.my_money = 200;
me.my_city = 200;
me.my_teams = "bleu";
me.info = "";

/*global set_pos set_size make_battleground create_castel draw_unit*/


function write_data()
{
    document.getElementById("argent").innerHTML = "Argent: " + me.my_money;
    document.getElementById("cité").innerHTML = "Cité: " + me.my_city;
    document.getElementById("soldat").innerHTML = me.soldat;
    document.getElementById("char").innerHTML = me.char;
    document.getElementById("avion").innerHTML = me.avion;
    document.getElementById("information").innerHTML = me.info;
}

function make_game()
{
    /*global Isomer*/
    var iso = new Isomer(document.getElementById("art"));
    var color = Isomer.Color;
    var Point = Isomer.Point;
    var Path = Isomer.Path;
    var Shape = Isomer.Shape;

    //               couleur
    var Color = new Object();
    Color.green = new color(76, 187, 23);
    Color.blue = new color(0, 0, 200);
    Color.red = new color(200, 0, 0);
    Color.orange = new color(253, 106, 2);
    Color.water = new color(0, 0, 0, 0.4);
    

    // init objet
    // objet position
    var pos = new Object();
    pos.x = 0;
    pos.y = 0;
    pos.z = 0;
    // objet taille
    var size = new Object();
    size.x = 0;
    size.y = 0;
    size.z = 0;
    //objet item
    var form = new Object();
    form.iso = iso;
    form.Point = Point;
    form.color = null;
    form.pos = pos;
    form.size = size;
    form.path = Path;
    form.shape = Shape;
    form = set_pos(form, 0, 0, 0);
    form = set_size(form, 8, 8, 0.2);
    make_battleground(form, Color);
    create_castel(form, Color);
    for (let i = 0; i < unit_to_draw.length; i++)
        draw_unit(form, unit_to_draw[i]);
    requestAnimationFrame(make_game)
}

make_game();