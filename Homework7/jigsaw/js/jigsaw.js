n_x = 3;
n_y = 3;
step_count = 0;
finish = true;

window.onload = function() {
    for (var i = 0; i < 16; ++i) {
        if (i < 10) {
            $("#pic_0" + i).attr("value", i + "");
        }
        else {
            $("#pic_" + i).attr("value", i + "");
        }
    }
    finish = true;
}

$("#bt").click(function() {finish = false; $("h2").html(""); mess();$("#situ").html("Playing...");});

function mess() {
    var i = 0;
    while (i < 0) {
        if (a_mess())
            ++i;
    }
}

function a_mess() {
    var forw = random_num(0, 15);
    //alert(forw);
    if (forw < 10)
        return judge_move($("#pic_0" + forw));
    else
        return judge_move($("#pic_" + forw));
}


$(".pic_frag").click(function() {judge_move(this);});

function judge_move(t) {
    if (finish)
        return finish;
    var size_before = 24;
    var can_move;
    var num = $(t).attr("value");
    num = parseInt(num);
    var x = Math.floor(num / 4);
    var y = num % 4;
    var forward = judge(x, y);
    can_move = move(t, forward, x, y);
    if (judge_win() && !finish && step_count != 0) {
        $("h2").html("You win! You have used " + step_count + " Steps");
        $("#situ").html("Game Over");
        var size_now = 1.25 * size_before;
        $("h2").css("font-size", size_now); 
        step_count = 0;
        finish = true;
    }
    else if(step_count == 1 || step_count == 0) {
        $("h2").html(step_count + " Step!");
        $("h2").css("font-size", size_before); 
    }
    else {
        $("h2").html(step_count + " Steps!");
        $("h2").css("font-size", size_before); 
    }
    return can_move;
}

function judge_win() {
    for (var i = 0; i <= 15; ++i) {
        if (i < 10) {
            if ($("#pic_0" + i).attr("value") != i + "")
                return false;
        }
        else {
            if ($("#pic_" + i).attr("value") != i + "")
                return false;
        }
    }
    return true;
}

function move(block, forward, x, y) {
    if (forward == "c")
        return false;
    $(block).attr("value", (4 * n_x + n_y) + "");
    n_x = x;
    n_y = y;
    if ("r" == forward)
        $(block).css({"left": $(block).position().left + 102, "transition": "all 0.2s ease-in-out 0s"});
    else if ("l" == forward)
        $(block).css({"left": $(block).position().left - 102, "transition": "all 0.2s ease-in-out 0s"});
    else if ("u" == forward)
        $(block).css({"top": $(block).position().top - 102, "transition": "all 0.2s ease-in-out 0s"});
    else if ("d" == forward)
        $(block).css({"top": $(block).position().top + 102, "transition": "all 0.2s ease-in-out 0s"});
    ++step_count;
    return true;
}

function judge(x, y) {
    if (x == n_x) {
        if (n_y == y + 1)
            return "r";
        else if (n_y == y - 1)
            return "l";
    }
    else if (y == n_y) {
        if (n_x == x + 1)
            return "d";
        else if (n_x == x - 1)
            return "u"
    }
    return "c";
}

function random_num(min, max) {
    var range = max - min;
    var rand = Math.random();
    return(min + Math.round(rand * range));
}