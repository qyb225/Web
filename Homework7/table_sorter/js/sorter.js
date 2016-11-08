var what_to_sort;
var need_to_sort_1;
var need_to_sort_2;
<<<<<<< HEAD
var less_more;
var last_i;
=======
>>>>>>> c55cb3032b77f4fc383b8e7a755e1436631e7934

window.onload = function() {
	what_to_sort = $("th");
	need_to_sort_1 = $("#todo td");
	need_to_sort_2 = $("#staff td");
<<<<<<< HEAD
    less_more = 0;
    last_i= 6;
	for (var i = 0; i < 6; ++i) {
		what_to_sort.eq(i).attr("class", i + "");
		what_to_sort.eq(i).click(function() {judge($(this));});
=======
	for (var i = 0; i < 6; ++i) {
		what_to_sort.eq(i).attr("class", i + "");
		what_to_sort.eq(i).click(function() {judge(i)});
>>>>>>> c55cb3032b77f4fc383b8e7a755e1436631e7934
	}
	for (var i = 0; i < 9; ++i) {
		need_to_sort_1.eq(i).attr("class", (i % 3) + "");
		need_to_sort_2.eq(i).attr("class", (i % 3 + 3) + "");
	}
}

<<<<<<< HEAD
function judge(sort_head) {
    var s, s1, s2;
    var i = parseInt(sort_head.attr("class"));
    if (i == last_i) {
        if (sort_head.attr("id") == "up")
            sort_head.attr("id", "down");
        else
            sort_head.attr("id", "up");
        less_more == 0? (less_more = 1): (less_more = 0);
    }
    else {
        sort_head.attr("id", "up");
        what_to_sort.eq(last_i).attr("id", "");
        less_more = 0;
    }
    last_i = i;
    s = $("td." + i);
    if (0 == i) {
        s1 = $("td.1");
        s2 = $("td.2");
    }
    else if (1 == i) {
        s1 = $("td.0");
        s2 = $("td.2");
    }
    else if (2 == i) {
        s1 = $("td.0");
        s2 = $("td.1");
    }
    else if (3 == i) {
        s1 = $("td.4");
        s2 = $("td.5");
    }
    else if (4 == i) {
        s1 = $("td.3");
        s2 = $("td.5");
    }
    else if (5 == i) {
        s1 = $("td.3");
        s2 = $("td.4");
    }
    if (0 == less_more)
        my_sort_l(s, s1, s2);
    else
        my_sort_m(s, s1, s2);
}


function my_sort_l(s, s1, s2) {
    var swap;
    for (var j = 0; j < 2; ++j) {
        for (var i = 0; i < 2 - j; ++i) {
            if(s.eq(i).html() > s.eq(i + 1).html()) {
                swap = s.eq(i).html();
                s.eq(i).html(s.eq(i + 1).html());
                s.eq(i + 1).html(swap);
                swap = s1.eq(i).html();
                s1.eq(i).html(s1.eq(i + 1).html());
                s1.eq(i + 1).html(swap);
                swap = s2.eq(i).html();
                s2.eq(i).html(s2.eq(i + 1).html());
                s2.eq(i + 1).html(swap);
            }
        }
    }
}

function my_sort_m(s, s1, s2) {
    var swap;
    for (var j = 0; j < 2; ++j) {
        for (var i = 0; i < 2 - j; ++i) {
            if(s.eq(i).html() < s.eq(i + 1).html()) {
                swap = s.eq(i).html();
                s.eq(i).html(s.eq(i + 1).html());
                s.eq(i + 1).html(swap);
                swap = s1.eq(i).html();
                s1.eq(i).html(s1.eq(i + 1).html());
                s1.eq(i + 1).html(swap);
                swap = s2.eq(i).html();
                s2.eq(i).html(s2.eq(i + 1).html());
                s2.eq(i + 1).html(swap);
            }
        }
    }
}
=======
function judge(i) {
	var s = $("." + i + " td");
}
>>>>>>> c55cb3032b77f4fc383b8e7a755e1436631e7934
