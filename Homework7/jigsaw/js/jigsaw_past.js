var frag = [];
var null_init = "3,3";
var null_block = 15;
var _button = document.getElementById("bt");

for (var i = 0; i < 16; ++i) {
    var x = Math.floor(i / 4);
    var y = i % 4;
    frag[i] = document.getElementById("pic_" + i);
    frag[i].value = x + "," + y;
    frag[i].onclick = function() {
        var forward = judge(this.value);
        move(this, forward);
    }
}

_button.onclick = function() {
    reset = [];
    var i = 0;
    while (i < 50) {
        var j = random_num(0, 15);
        var forward = judge(frag[j].value);
        if (forward != "c") {
            move(frag[j], forward);
            ++i;
        }
    } 
}



function random_num(min, max) {
    var range = max - min;
    var rand = Math.random();
    return(min + Math.round(rand * range));
}


function move(fra, forward) {
    var x_y = fra.value.split(",");
    var x = parseInt(x_y[0]);
    var y = parseInt(x_y[1]);
    var t_id = fra.id;
    var n_id = 4 * x + y;
    if (forward == "c")
        return;
    null_init = fra.value;
    frag[null_block].id = t_id;
    fra.id = "pic_" + 15;
    null_block = n_id;
}

function judge(this_value) {
    var x_y = this_value.split(",");
    var n_x_y = null_init.split(",");
    var x = parseInt(x_y[0]);
    var y = parseInt(x_y[1]);
    var n_x = parseInt(n_x_y[0]);
    var n_y = parseInt(n_x_y[1]);
    if (x == n_x) {
        if (n_y == y + 1)
            return "r";
        else if (n_y == y - 1)
            return "l";
        else
            return "c";
    }
    else if (y == n_y) {
        if (n_x == x + 1)
            return "d";
        else if (n_x == x - 1)
            return "u"
        else
            return "c"
    }
    else
        return "c";
}