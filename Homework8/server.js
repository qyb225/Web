var http = require("http");
var qs = require("querystring");
var url = require("url");
var fs = require("fs");

function start(route) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        route(pathname);
        console.log("Request for "  + pathname +  " received.");
        var ext = pathname.match(/(\.[^.]+|)$/)[0];
        console.log("Server has started!");
        if (pathname != "/postlogin") {
            var may_user = qs.parse(url.parse(request.url).query)["username"];
            if (may_user != undefined) {
                fs.readFile("./user.dat", "utf-8", function(err, data) {
                    if (err) throw err;
                    else {
                        var len = may_user.length;
                        var handle_data = "";
                        for (var i = 0; i < data.length; ++i) {
                            if (data[i] == "#" && data.substr(i + 1, len) == may_user) {
                                for (var j = i + 1; j < data.length; ++j) {
                                    if (data[j] == "#")
                                        break;
                                }
                                handle_data = data.substring(i + 1, j);
                                break;
                            }
                        }
                        if (handle_data != "") {
                            handle_data = handle_data.split(" ");
                            response.writeHead(200, {"Content-Type":"text/html"});
                            response.write("<DOCTYPE html>");
                            response.write("<html>");
                            response.write("<head>");
                            response.write("<meta charset = 'utf-8'>");
                            response.write("<title>Register Solution</title>");
                            response.write("<style>");
                            response.write("body {font-family: 'Microsoft YAHEI', sans-serif;font-size: medium;color: white;background-color: rgba(20, 40, 40, 0.9);}");
                            response.write("#info_show {font-size: 150%; width: 45%;padding: 3%; margin-left: auto; margin-right: auto; margin-top: 2%; border: 3px solid gray;border-radius: 15px;}");
                            response.write("h1 {font-size: 200%; text-align: center; padding-top: 10px;}")
                            response.write("</style>");
                            response.write("</head>");
                            response.write("<body>");
                            response.write("<h1>User Information</h1>");
                            response.write("<div id = 'info_show'>");
                            response.write("<p>");
                            response.write("username: " + handle_data[0]);
                            response.write("</p>");
                            response.write("<p>");
                            response.write("Student ID: " + handle_data[1]);
                            response.write("</p>");
                            response.write("<p>");
                            response.write("Tel: " + handle_data[2]);
                            response.write("</p>");
                            response.write("<p>");
                            response.write("E-mail: " + handle_data[3]);
                            response.write("</p>");
                            response.write("</div>");
                            response.write("</body>");
                            response.write("</html>");
                            response.end();
                        }
                        else {
                            fs.readFile("./index.html", "utf-8", function(err, data) {
                                if (err) throw err;
                                response.writeHead(200, {"Content-Type":"text/html"});
                                response.write(data);
                                response.end();
                            });
                        }                     
                    }
                });
            }

            else if (ext == ".js" || ext == ".css") {
                fs.readFile("." + request.url, "utf-8", function(err, data) {
                    if (err) throw err;
                    response.writeHead(200, {
                        "Content-Type": {".css":"text/css", ".js":"application/javascript"}[ext]
                    });
                    response.write(data);
                    response.end();
                });
            }
            else {
                fs.readFile("./index.html", "utf-8", function(err, data) {
                    if (err) throw err;
                    response.writeHead(200, {"Content-Type":"text/html"});
                    response.write(data);
                    response.end();
                });
            }
        }
        else if (pathname == "/postlogin") {
            var all_post_data = "";
            var _repeat = "0000";
            var _valid = "0000";
            var info;
            var username;
            var student_id;
            var phone_num;
            var email_address;

            request.addListener("data", function(postdata) {
                all_post_data += postdata; //username=&studentid=&phone_num=&
                var split_it = qs.parse(all_post_data);
                var decode = decodeURIComponent(all_post_data);
                username = split_it.username;
                student_id = split_it.student_id;
                phone_num = split_it.phone_num;
                email_address = split_it.email_address;
                //Check
                _valid = is_valid(username, student_id, phone_num, email_address); //0000 means all right
                _repeat = is_repeat(username, student_id, phone_num, email_address);
                if (_valid == "0000" && _repeat == "0000") {
                    info = "#" + username + " " + student_id + " " + phone_num + " " + email_address + " ";
                    fs.appendFileSync("user.dat", info);                    
                }
                all_post_data = decode;
            });
            request.addListener("end", function() {
                response.writeHead(200, {"Content-Type":"text/html"});
                response.write("<DOCTYPE html>");
                response.write("<html>");
                response.write("<head>");
                response.write("<meta charset = 'utf-8'>");
                response.write("<title>Register Solution</title>");
                response.write("<style>");
                response.write("body {font-family: 'Microsoft YAHEI', sans-serif;font-size: medium;color: white;background-color: rgba(20, 40, 40, 0.9);}");
                response.write("#info_show {font-size: 150%; width: 45%;padding: 3%; margin-left: auto; margin-right: auto; margin-top: 2%; border: 3px solid gray;border-radius: 15px;}");
                response.write("h1 {font-size: 200%; text-align: center; padding-top: 10px;}")
                response.write("#err {color: red;}");
                response.write("</style>");
                response.write("</head>");
                response.write("<body>");
                if (_valid == "0000" && _repeat == "0000")
                    response.write("<h1>Success!</h2>");
                else
                    response.write("<h1>Fail!</h1>");
                response.write("<div id = 'info_show'>");
                response.write("<p>");
                if (_valid[0] == "1")
                    response.write("username: " + "<span id = 'err'> 用户名非法.</span>");
                else if (_repeat[0] == "1")
                    response.write("username: " + username + "<span id = 'err'> 该用户名已存在.</span>");
                else
                    response.write("username: " + username);
                response.write("</p>");
                response.write("<p>");
                if (_valid[1] == "1")
                    response.write("Student ID: " + "<span id = 'err'> 学号非法.</span>");
                else if (_repeat[1] == "1")
                    response.write("Student ID: " + student_id + "<span id = 'err'> 该学号已存在.</span>");
                else
                    response.write("Student ID: " + student_id);
                response.write("</p>");
                response.write("<p>");
                if (_valid[2] == "1")
                    response.write("Tel: " + "<span id = 'err'> 电话号码非法.</span>");
                else if (_repeat[2] == "1")
                    response.write("Tel: " + phone_num + "<span id = 'err'> 该电话已存在.</span>");
                else
                    response.write("Tel: " + phone_num);
                response.write("</p>");
                response.write("<p>");
                if (_valid[3] == "1")
                    response.write("E-mail: " + "<span id = 'err'> 邮箱地址非法.</span>");
                else if (_repeat[3] == "1")
                    response.write("E-mail: " + email_address + "<span id = 'err'> 该邮箱已存在.</span>");
                else
                    response.write("E-mail: " + email_address);
                response.write("</p>");
                response.write("</div>");
                response.write("</body>");
                response.write("</html>");
                response.end();
            });
        }
    }
    http.createServer(onRequest).listen(8000);
    console.log("http://localhost:8000/");
}

exports.start = start;

function is_valid(username, student_id, phone_num, email_address) {
    var valid = "";
    if (username.match(/^[a-zA-Z]\w{5,17}$/) == null)
        valid += "1";
    else
        valid += "0";
    if (student_id.match(/[^0]{1}\d{7}/) == null || student_id.length != 8)
        valid += "1";
    else
        valid += "0";
    if (phone_num.match(/[^0]{1}\d{10}/) == null || phone_num.length != 11)
        valid += "1";
    else
        valid += "0";
    if (email_address.match(/^[a-zA-Z_0-9\-]+@(([a-zA-Z_\-])+\.)+[a-zA-Z0-9]{2,4}$/) == null)
        valid += "1";
    else
        valid += "0";
    return valid; //0000 means all right
}

function is_repeat(username, student_id, phone_num, email_address) {
    var repeat = ["0", "0", "0", "0"];
    var split_it;
    var info = ("#" + username + " " + student_id + " " + phone_num + " " + email_address).split(" ");
    var data = fs.readFileSync("user.dat","utf-8");
    split_it = data.split(" ");
    for (var i = 0; i < split_it.length; ++i) {
         if (repeat[i % 4] == "0" && info[i % 4] == split_it[i])
            repeat[i % 4] = "1";
    }
    return repeat[0] + repeat[1] + repeat[2] + repeat[3];   
}
