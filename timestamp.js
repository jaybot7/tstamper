//init vars
var pathname = window.location.href;
var path = "December%2015,%202015"//fake

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
	return awesomeHash;
}

function parseThat(htmlString){
	if (htmlString.search(/\%/) != -1){ //then it might be natural, deifnitely not unix
		//do more checks while parsing, be sure to check lower/uppercase
		htmlString = htmlString.replace(/\%20/g, ' ');
		var awesomeHash = convertStuff(htmlString);
		return awesomeHash;
	}
		
	if (typeof(htmlString) == "string" && htmlString.length == 10){
		var toNumb = Number(htmlString) * 1000;
		var awesomeHash = convertStuff(toNumb);
		return awesomeHash;
	}
	return undefined;
}

$(document).ready(function() {
 var temp = parseThat(path);
  temp = JSON.stringify(temp,0,1);
  //$("#info").text(temp);
  $("#info").text(pathname);
});