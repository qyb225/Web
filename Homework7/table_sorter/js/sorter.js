var what_to_sort;
var need_to_sort_1;
var need_to_sort_2;

window.onload = function() {
	what_to_sort = $("th");
	need_to_sort_1 = $("#todo td");
	need_to_sort_2 = $("#staff td");
	for (var i = 0; i < 6; ++i) {
		what_to_sort.eq(i).attr("class", i + "");
		what_to_sort.eq(i).click(function() {judge(i)});
	}
	for (var i = 0; i < 9; ++i) {
		need_to_sort_1.eq(i).attr("class", (i % 3) + "");
		need_to_sort_2.eq(i).attr("class", (i % 3 + 3) + "");
	}
}

function judge(i) {
	var s = $("." + i + " td");
}
