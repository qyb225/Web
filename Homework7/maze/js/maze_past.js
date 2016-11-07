start = false;
finish = true;
cheat = false;
count = 1;
var _start = document.getElementById("start");
var _end = document.getElementById("end");
var _wall = document.getElementById("rec");
var a_wall = _wall.getElementsByTagName("div");
var _dic = document.getElementById("dic");
var _cheat = document.getElementById("cheat");

window.onload = function() {
    count = 0;
    start = false;
    finish = true;
    cheat = true;
    _wall.id = "rectangle";
    _dic.innerHTML = "";
}

_start.onmouseover = function() {
    count = 0;
    start = true;
    finish = true;
    cheat = false;
    _wall.id = "rectangle";
    _dic.innerHTML = "";
}

_cheat.onmouseover = function() {
    cheat = true;
}

_end.onmouseover = function() {
    if (finish) {
        if (cheat)
            _dic.innerHTML = "Don't cheat! You should move to E inside the maze!";
        else
            _dic.innerHTML = "You win!";
        _wall.id = "rec";
        start = false;
    }
}

_wall.onmouseover = function() {
    for (var i = 0; i < 5; ++i) {
        a_wall[i].onmouseover = function() {
            count++;
        }
    }
    if (0 == count && start) {
        count += 1;
    }
    if (1 == count) {
        if (start) {
            finish = false;
            start = false;
            _dic.innerHTML = "You lose...";
        }
    }
    else {
        count = 0;
        _wall.id = "rec";
    }
}