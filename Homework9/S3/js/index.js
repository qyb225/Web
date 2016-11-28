window.onload = function() {
    $(".unread").hide();
    $("li").attr("condition", "can_click");
    //$("li").click(function() {get_rand_num(this);});
    $("#at-plus-container").mouseleave(function() {reset();});
    //$(".finished").click(function() {show_sum(add_num());});

    $("li").each(function() {
        if ($(this).attr("condition") === "can_click")
            $(this).attr("class", "button abled");
        else
            $(this).attr("class", "button disabled");
    });
    var circles = $("li");
    $(".icon").click(function() {robot_all(show_sum(add_num()));});
}

function robot_all(callback) {
    circles = $("li");
    for (var i = 0; i < 5; i++) {
        (function(i) {
            get_rand_num(circles[i], callback);
        })(i);
    }
}

function get_rand_num(obj, callback) {
    var all_finished = true;
    if ($(obj).attr("condition") === "can_click") {
        var all_button = $("li");
        var num = $(obj).children("span.unread"); 
        $(num).show();
        $(num).html("...");
        $.post("number.txt", function(data) {
            $(num).html(data); 
            $(obj).attr("condition", "got_num");
            $(obj).attr("class", "button got_num");
            $("li").each(function() {
                if ($(this).attr("condition") != "got_num") {
                    $(this).attr("condition", "can_click");
                    $(this).attr("class", "button abled");
                    all_finished = false;
                }
                else
                    $(this).attr("class", "button disabled");
            });
            if (all_finished) {
                $(".info").attr("class", "info finished");
                show_sum(add_num());
            }
            callback();
        });
    }
}

function add_num() {
    var sum = 0;
    $(".unread").each(function() {
        sum += parseInt($(this).html());
    });
    return sum;
}

function show_sum(sum) {
    $("#add").html(sum);
}

function reset() {
    $(".unread").hide();
    $(".unread").each(function() {
        $(this).html("");
    });
    $("li").each(function() {
        $(this).attr("condition", "can_click");
        $(this).attr("class", "button abled");
    });
    $("#add").html("");
    $(".info").attr("class", "info");
}