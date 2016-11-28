window.onload = function() {
    $(".unread").hide();
    $("li").attr("condition", "can_click");
    //$("li").click(function() {get_rand_num(this);});
    $("#at-plus-container").mouseleave(function() {reset();});

    $("li").each(function() {
        if ($(this).attr("condition") === "can_click")
            $(this).attr("class", "button abled");
        else
            $(this).attr("class", "button disabled");
    });
    var circles = $("li");
    $(".icon").click(function() {robot_flow(circles, function() {show_sum(add_num());});});
}

function robot_flow(circles, getSum) {
    var callbacks = [];
    var ran_num = [0, 1, 2, 3, 4];
    var letter = ["A", "B", "C", "D", "E"];
    var show_t = "";
    ran_num.sort(function(){ return 0.5 - Math.random();});
    for (var i = 0; i < 4; ++i)
    	show_t += (letter[ran_num[i]] + " ->");
    show_t += letter[ran_num[4]];
    $("#show_turn").html(show_t);
    for (var i = 0; i < 4; i++) {
        (function(i, j) {
            callbacks[i] = function() {
                get_rand_num(circles[j], callbacks[j]);
            }
        })(ran_num[i], ran_num[i + 1]);
    }
    callbacks[ran_num[4]] = getSum;
    get_rand_num(circles[ran_num[0]], callbacks[ran_num[0]]);
}

function get_rand_num(obj, callback) {
    var all_finished = true;
    if ($(obj).attr("condition") === "can_click") {
        var all_button = $("li");
        for (var i = 0; i < all_button.length; i++) {
            if (all_button[i] != obj && $(all_button[i]).attr("condition") != "got_num") {
                $(all_button[i]).attr("condition", "cant_click");
                $(all_button[i]).attr("class", "button disabled");
            }
        }
        var num = $(obj).children("span.unread"); 
        $(num).show();
        $(num).html("...");
        $.get("number.txt", function(data) {
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
    $("#show_turn").html("");
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
    $("#show_turn").html("");
}