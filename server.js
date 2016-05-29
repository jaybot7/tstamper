//functions
function convertStuff(incoming){
	var awesomeHash = {"unix": 0, "natural": ""};
	var d = new Date(incoming); nFull = d.toDateString(); 
	nFull = nFull.replace(/..../, ''); //parse out leading day
	awesomeHash["natural"] = nFull; 
	if (typeof(incoming) != "string"){
		var nUnix = incoming / 1000; 
	} else {
		var j = Date.parse(incoming); k = Number(j); 
		nUnix = k/1000;
	}
	awesomeHash["unix"] = nUnix; 
	if (awesomeHash["natural"] != "lid Date"){
		return awesomeHash;
	} else {
		return {"unix": null, "natural": null};
	}
}

function parseThat(htmlString){
	if (htmlString.search(/\%/) != -1){ //then it might be natural, deifnitely not unix
	  console.log(htmlString);
		htmlString = htmlString.replace(/\%20/g, ' ');
		var awesomeHash = convertStuff(htmlString);
		return awesomeHash;
	}
		
	else {// (htmlString.length == 10){
	  	htmlString = htmlString.replace(/\//g, '')
	  	console.log("is a string and is 10 things long...");
		var toNumb = htmlString * 1000;
		var awesomeHash = convertStuff(toNumb);
		return awesomeHash;
	}
	return {"unix": null, "natural": null};
}

// Require what we need
var http = require("http");
var express = require("express");
var app = express();

// Set the view directory to /views
app.set("views", __dirname + "/views");

// Let's use the Jade templating language
app.set("view engine", "jade");

app.use(express.static(__dirname + "/public"));

// Add some middleware
app.all("*", function(request, response, next) {
  var pathname = request.url;
  // if (pathname.search(/[a-zA-Z]+/) == -1){ 
  //     pathname = Number(pathname);
  //     }
  var temp = parseThat(pathname);
  temp = JSON.stringify(temp,0,1);
  
  // Build the answer
  var answer = temp;
  
  response.render("index", { message: answer });
  next();
});


// Start it up!
http.createServer(app).listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0");

var addr = process.env.IP;
console.log("Server running at ", addr + ":" + process.env.PORT );

