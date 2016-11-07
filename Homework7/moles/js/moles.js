var a_cell, if_begin, score, time, time_interval, position;

window.onload = function() {
    __init__();
}

function __init__() {
    a_cell = $(".cell");
    if_begin = false;
    position = 0;
    $("#second").html((time = 30) + "");
    $("#sc").html((score = 0) + "");
    $("#condition").html("Game Over");
    $("#condition").css({"color": "black"});
    clearInterval(time_interval);
    for (var i = 0; i < 60; ++i) {
        a_cell.eq(i).attr("value", i + "");
        a_cell.eq(i).attr("id", "");
    }
}

$(".cell").click(function() {judge($(this).attr("value"))});
$("#start").click(function() {
    if (if_begin == false) {
        if_begin = true;
        $("#condition").css({"color": "red"});
        creat_mouse();
        time_interval = setInterval("change_time()", 1000);
        $("#condition").html("Playing...");
    }
    else {
        alert("Your Score: " + score);
        __init__();
    }
});

function judge(val) {
    if (if_begin == false)
        return;
    if (position + "" == val) {
        score += 1
        a_cell.eq(position).attr("id", "");
        creat_mouse();
    }
    else {
        if (score > 0)
            score -= 1;
    }
    $("#sc").html(score + "");
}

function creat_mouse() {
    if (if_begin == false)
        return;
    position = random_num(0, 59);
    a_cell.eq(position).attr("id", "select_show");
}

function random_num(min, max) {
    var range = max - min;
    var rand = Math.random();
    return(min + Math.round(rand * range));
}

function change_time() {
    if (if_begin == false)
        return;
    if (time > 0) {
        time--;
        $("#second").html(time + "");
    }
    else {
        alert("Your Score: " + score);
        clearInterval(time_interval);
        __init__();
    }
}