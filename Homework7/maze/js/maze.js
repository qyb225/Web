start = false;
finish = true;
cheat = false;
count = 1;

window.onload = function() {
    count = 0;
    start = false;
    finish = true;
    cheat = true;
    $("#dic").html("");
}

$("#start").mouseover(function() {
    count = 0;
    start = true;
    finish = true;
    cheat = false;
    $("#dic").html("");
});

$("#rec").mouseover(function() {
    if (0 == count && start) {
        ++count;
        $(this).attr("id", "rectangle");
    }
    else
        $(this).attr("id", "rec");
    if (1 == count) {
        if (start) {
            finish = false;
            start = false;
            $("#dic").html("You lose...");
        }
    }
});

$("#cheat").mouseover(function() {cheat = true;});

$("#end").mouseover(function() {
    if (finish) {
        if (cheat)
            $("#dic").html("Don't cheat! You should move to E inside the maze!");
        else
            $("#dic").html("You win!");
        $("#rectangle").attr("id", "rec");
        start = false;
    }
}); 