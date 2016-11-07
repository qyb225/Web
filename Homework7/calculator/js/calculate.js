express = ""; //Save expression
solution = 0; //Save solution
finish = 0;   //To judge if calculation is completed.

function my_click(i) {  
    if (i == "←") { //Click "Back" Button
        __back__(); //Clear one letter or symbol.
        $("#screen_u").html(express_hidden(express));
    }
    else if (i == "CE") { //Click "CE" Button
        __init__(); //Initialize expression and solution.
        $("#screen_u").html(express);
        $("#screen_d").html(solution);
    }
    else if (i == "=") { //Click "Calculate" Button
        var output = __calculate__(); //Calculate expression, analysing solution, exception handling.
        $("#screen_d").html(output);
    }
    else { //Click other Button.
        __addstr__(i);
        $("#screen_u").html(express_hidden(express)); //Control the expression on the screen.
    }    
}

function __init__() { //Initialize the expression and solution.
    express = "";
    solution = 0;
    finish = 0;
}

function __back__() { //Clear one letter or symbol.
    finish = 0;
    if (0 < express.length)
        express = express.substring(0, express.length - 1);
    return;
}

function __addstr__(i) { //If a peroid of calculation is over, judge if we want to use the solution.
    if (1 == finish) {
        if (i == "+" || i == "-" || i == "*" || i == "/") { //When next symbol is "+-/*" of "Back"
            express =  "" + solution;                       //We need to reuse the solution.
        }
        else {
            express = "";
        }
        solution = 0;
        finish = 0;
    }
    express += i;
}

function scientific_notation() {
    var magnitude = 1; //The magnitude of the number, E.g. 3214, its magnitude is 1000;
    var count = 0; //The level of a number.
    //Calculate the level and magnitude.Then judge if we need "Scientific Notation"
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
    if (count <= 9 && count >= -5) //1. Don't need to transform to "Scientific Notation"
        output = no_sci_show(count);
    else if (count < 0)
        output = small_sci_show(count, magnitude); //2. Too small that we need to transform to "Scientific Notation"
    else
        output = large_sci_show(count, magnitude); //3. Too large that we need to transform to "Scientific Notation"
    if (Math.abs(count) >= 50)
        output = m_err(); //If the level is lager than 50 or less than -50, We don't need to calculate.
    return output;
}


function large_sci_show(count, magnitude) {
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
    return bottom_num + "e" + level;
}

function small_sci_show(count, magnitude) {
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
    return bottom_num + "e" + level;
}

function no_sci_show(count) {
    output = solution;
    if (Math.abs(output) < 1)
        output = output.toFixed(11);
    else
        output = output.toFixed(11 - Math.abs(count));
    output = num_tackle(output);
    return output + "";
}

function m_err() {
    solution = 0;
    finish = 0;
    return "Math Error!";
}

function __calculate__() { //Calculating function.
    try { //Judge if the expression is legal.
        solution = eval(express);

        for(var k = 0; k < express.length - 1; ++k) {
            if (express[k] == "/" && (express[k] == express[k + 1] || express[k + 1] == "*")) {
                throw SyntaxError; //When express has // and /* , a syntax error will be thrown.
                break;
            }
        }
    }
    catch(err) {
        if(err.name == "SyntaxError" || err.name == "EvalError" || err.name == "ReferenceError")
            solution = NaN;
    }
    output = scientific_notation();
    if (solution + "" == "NaN" || output + "" == "NaN")
        output = "Input Error!";
    finish = 1;
    return output;
}

function express_hidden(str) { //To let screen not overflow and move to the left.
    if (str.length > 25)
        return str.substring(str.length - 25);
    else
        return str;
}

function num_tackle(n) { //Tackle the accuracy of the number. Turn 0.3000000000001 to 0.3 etc.
    var num = n + "";
    var sit = num.indexOf(".");
    var sit0 = num.indexOf("e");
    var del = 0;
    var output = "";
    if (sit0 != -1)
        return n;
    else if (sit != -1) {
        for (var j = num.length - 1; j > sit; j--) {
            if (num[j] == "0")
                del += 1;
            else
                break;
        }
        num = num.substring(0, num.length - del);
        return parseFloat(num);
    }
    else
        return n;
}

$(".num_symbol").click(function() {my_click($(this).text());});