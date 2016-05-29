var express = require('express');
var app = express();
var fs = require('fs');
var incomingFile = process.argv[3];

app.get('/books', function(req, res){    
    var bookie = fs.readFileSync(incomingFile);  
    var objectie = JSON.parse(bookie)
     res.end(JSON.stringify(objectie));  
    });

app.listen(process.argv[2]);


