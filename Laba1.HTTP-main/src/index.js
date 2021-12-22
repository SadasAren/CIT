var http = require("http");

let params = new URL("https://codesandbox.io?name=Charles-D7625").searchParams;
let name = params.get("name");
var data = new Date();
let dayweek = data.getDay();

switch (dayweek) {
  case 0:
    dayweek = "Sunday";
    break;
  case 1:
    dayweek = "Monday";
    break;
  case 2:
    dayweek = "Tuesday";
    break;
  case 3:
    dayweek = "Wednesday";
    break;
  case 4:
    dayweek = "Thursday";
    break;
  case 5:
    dayweek = "Friday";
    break;
  default:
    dayweek = "Saturday";
    break;
}

http
  .createServer(function (req, res) {
    res.end("Hello " + name + ", today is " + dayweek); //end the response
  })
  .listen(8080); //the server object listens on port 8080
