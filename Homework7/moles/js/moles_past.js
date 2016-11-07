var all_boxes = [];
var boxes_cell = [];
var _start = document.getElementById("start");
var _time = document.getElementById("second");
var _score = document.getElementById("sc");
var _con = document.getElementById("condition");
var if_begin = false;
var score = 0;
var time = 30;
var row = 0;
var col = 0;
var time_interval;

for (var i = 1; i <= 6; ++i) {
    var id = "row" + i;
    all_boxes[i - 1] = document.getElementById(id);
    boxes_cell[i - 1] = all_boxes[i - 1].getElementsByTagName("div");
}


function __init__() {
    if_begin = false;
    score = 0;
    row = 0;
    col = 0;
    time = 30;
    _time.innerHTML = "30";
    _score.innerHTML = score + "";
    _con.innerHTML = "Game Over";
    clearInterval(time_interval);


    for (var i = 0; i < 6; ++i) {
        for (var j = 0; j < 10; ++j) {
            boxes_cell[i][j].value = i + "_" + j;
            boxes_cell[i][j].id = "";
        }
    }

    for (var i = 0; i < 6; ++i) {
        for (var j = 0; j < 10; ++j) {
            boxes_cell[i][j].onclick = function() {
                judge(this.value);
            }
        }
    }

}

window.onload = function() {
    __init__();
}


function random_num(min, max) {
    var range = max - min;
    var rand = Math.random();
    return(min + Math.round(rand * range));
}

_start.onclick = function() {
    if (if_begin == false) { //开始啦
        if_begin = true;
        creat_mouse();
        time_interval = setInterval("change_time()", 1000);
        _con.innerHTML = "Playing...";
    }
    else {
        __init__();
    }
}

function creat_mouse() {
    if (if_begin == false)
        return;
    row = random_num(0, 5);
    col = random_num(0, 9);
    boxes_cell[row][col].id = "select_show";
}

function judge(val) {
    if (if_begin == false)
        return;
    var sim = val.split("_");//以逗号作为分隔字符串
    if (row + "_" + col == val) {
        score += 1
        boxes_cell[row][col].id = "";
        creat_mouse();
    }
    else {
        score -= 1;
    }
    _score.innerHTML = score + "";
}

function change_time() {
    if (if_begin == false)
        return;
    if (time > 0) {
        time--;
        _time.innerHTML = time + "";
    }
    else {
        alert("Your Score: " + score);
        clearInterval(time_interval);
        __init__();
    }
}