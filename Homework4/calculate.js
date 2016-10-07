express = "";
solution = 0;
finish = 0;

function click(i) {
    var show_ex = document.getElementById("screen_u");
    var show_sl = document.getElementById("screen_d");    
    if (i == "<") {
        __back__();
        show_ex.innerHTML = express_hidden(express);
    }
    else if (i == "ce") {
        __init__();
        show_ex.innerHTML = express;
        show_sl.innerHTML = solution;
    }
    else if (i == "=") {
        var output = __calculate__();
        show_sl.innerHTML = output;
    }
    else {
        __addstr__(i);
        show_ex.innerHTML = express_hidden(express);
    }    
}

function __back__() {
    finish = 0;
    if (0 < express.length)
        express = express.substring(0, express.length - 1);
    return;
}

function express_hidden(str) {
    if (str.length > 25)
        return str.substring(str.length - 25);
    else
        return str;
}


function __init__() {
    express = "";
    solution = 0;
    finish = 0;
}

function num_tackle(n) {
    var num = n + "";
    var sit = num.indexOf(".");
    var sit0 = num.indexOf("e");
    var del = 0;
    var output = "";
    if (sit0 != -1)
        return n;
    else if (sit != -1) {
        for (var j = num.length - 1; j > sit; j--) {
            if (num[j] == "0") {
                del += 1;
            }
            else {
                break;
            }
        }
        num = num.substring(0, num.length - del);
        return parseFloat(num);
    }
    else
        return n;
}

function __addstr__(i) {
    if (1 == finish) {
        if (i == "+" || i == "-" || i == "*" || i == "/") {
            express =  "" + solution;
        }
        else {
            express = "";
        }
        solution = 0;
        finish = 0;
    }
    express += i;
}

function __calculate__() {
    var magnitude = 1;
    var count = 0;
    try {
        solution = eval(express);

        for(var k = 0; k < express.length - 1; ++k) {
            if (express[k] == express[k + 1] && express[k] == "/") {
                throw SyntaxError;
                break;
            }
        }
    }
    catch(err) {
        if(err.name == "SyntaxError") {
            solution = NaN;
        }
        else if (err.name == "EvalError") {
            solution = NaN;
        }
        else if (err.name == "ReferenceError") {
            solution = NaN;
        }
    }
     
    if (Math.abs(solution) > 1) {
        while (Math.abs(solution) / magnitude > 10) {
            count++;
            magnitude *= 10;
        }
    }
    else if (solution == 0) {
        count = 0;
        magnitude = 1;
    }
    else {
        while (Math.abs(solution) * magnitude < 1) {
            count--;
            magnitude *= 10;
        }
    }
    //begin
    if (count <= 9 && count >= -5) {
        solution = solution.toFixed(11 - Math.abs(count));
        solution = num_tackle(solution);
        output = solution + "";
    }
    else if (count < 0) {
        var bottom_num = solution * magnitude;
        var level = count;
        if (count <= -10) {
            var solution_bottom = bottom_num.toFixed(15);
            solution_bottom = num_tackle(solution_bottom);
            solution = "" + solution_bottom + "e" + level;
        }
        bottom_num = bottom_num.toFixed(7);
        bottom_num = num_tackle(bottom_num);
        solution = num_tackle(solution);
        output = bottom_num + "e" + level;
    }
    else {
        var bottom_num = solution / magnitude;
        var level = count;
        if (count >= 10) {
            var solution_bottom = bottom_num.toFixed(15);
            solution_bottom = num_tackle(solution_bottom);
            solution = "" + solution_bottom + "e" + level;
        }
        bottom_num = bottom_num.toFixed(8);
        bottom_num = num_tackle(bottom_num);
        solution = num_tackle(solution);
        output = bottom_num + "e" + level;
    }
    //end
    if (Math.abs(count) >= 50) {
        output = "Math Error!";
        solution = 0;
        finish = 0;
    }
    if (solution == "NaN")
        output = "Input Error!";    
    finish = 1;
    return output;
}


var press0 = document.getElementById("_0");
var press1 = document.getElementById("_1");
var press2 = document.getElementById("_2");
var press3 = document.getElementById("_3");
var press4 = document.getElementById("_4");
var press5 = document.getElementById("_5");
var press6 = document.getElementById("_6");
var press7 = document.getElementById("_7");
var press8 = document.getElementById("_8");
var press9 = document.getElementById("_9");
var division = document.getElementById("division");
var multiply = document.getElementById("multiply");
var subtract = document.getElementById("subtract");
var dot = document.getElementById("dot");
var plus = document.getElementById("plus");
var back = document.getElementById("back");
var bracket_l = document.getElementById("bracket_l");
var bracket_r = document.getElementById("bracket_r")
var ce = document.getElementById("ce");
var equal = document.getElementById("equal");


press0.onclick = function() {click("0");}
press1.onclick = function() {click("1");}
press2.onclick = function() {click("2");}
press3.onclick = function() {click("3");}
press4.onclick = function() {click("4");}
press5.onclick = function() {click("5");}
press6.onclick = function() {click("6");}
press7.onclick = function() {click("7");}
press8.onclick = function() {click("8");}
press9.onclick = function() {click("9");}
division.onclick = function() {click("/")}
multiply.onclick = function() {click("*")}
subtract.onclick = function() {click("-")}
plus.onclick = function() {click("+")}
bracket_l.onclick = function() {click("(")}
bracket_r.onclick = function() {click(")")}
dot.onclick = function() {click(".")}
equal.onclick = function() {click("=")}
ce.onclick = function() {click("ce")}
back.onclick = function() {click("<")}