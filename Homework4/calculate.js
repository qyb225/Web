express = "";
solution = 0;
finish = 0;
function click(i) {
    var show_ex = document.getElementById("screen_u");
    var show_sl = document.getElementById("screen_d");
    function express_hidden(str) {
        if (str.length > 25)
            return str.substring(str.length - 25);
        else
            return str;
    }
    if (i == "<") {
        if (finish == 1) {
            finish = 0;
        }
        if (0 < express.length) {
            express = express.substring(0, express.length - 1);
        }
        show_ex.innerHTML = express_hidden(express);
    }
    else if (i == "ce") {
        express = "";
        show_ex.innerHTML = express;
        solution = 0;
        show_sl.innerHTML = solution;
        finish = 0;
    }
    else if (i == "=") {
        function num_tackle(n) {
            var num = n + "";
            var sit = num.indexOf(".");
            var del = 0;
            var output = "";
            if (sit != -1) {
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
            else {
                return n;
            }
        }
        var magnitude = 1;
        var count = 0;
        try {
            solution = eval(express);
        }
        catch(err) {
            if(err.name == "SyntaxError") {
                solution = NaN;
            }
        }
     
        //solution = eval(express);
        if (Math.abs(solution) > 1) {
            while (Math.abs(solution) / magnitude >= 10) {
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
        if (count <= 9 && count >= -5) {
            solution = solution.toFixed(11 - Math.abs(count));
            solution = num_tackle(solution);
            output = solution + "";
        }
        else if (count < 0) {
            var bottom_num = solution * magnitude;
            var level = count;
            bottom_num = bottom_num.toFixed(7);
            bottom_num = num_tackle(bottom_num);
            solution = num_tackle(solution);
            output = bottom_num + "e" + level;
        }
        else {
            var bottom_num = solution / magnitude;
            var level = count;
            bottom_num = bottom_num.toFixed(8);
            bottom_num = num_tackle(bottom_num);
            solution = num_tackle(solution);
            output = bottom_num + "e" + level;
        }

        if (Math.abs(count) >= 50) {
            output = "Math Error!";
            solution = 0;
            finish = 0;
        }
        if (solution == "NaN")
            output = "Input Error!";
        show_sl.innerHTML = output;     
        finish = 1;
    }
    else {
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
        show_ex.innerHTML = express_hidden(express);
    }    
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