window.onload = function() {
    $(".unread").hide();
    $("li").attr("condition", "can_click");
    $("li").click(function() {get_rand_num(this);});
    $("#at-plus-container").mouseleave(function() {reset();});

    $("li").each(function() {
        if ($(this).attr("condition") === "can_click")
            $(this).attr("class", "button abled");
        else
            $(this).attr("class", "button disabled");
    });
}

function get_rand_num(obj) {
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
                $(".info").attr("class", "info finished abled");
                var sum = add_num();
                $(".finished").click(function() {show_sum(sum);});
            }
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
    $(".info").attr("class", "info finished disabled");
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