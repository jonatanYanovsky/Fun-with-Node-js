// Written by Jonatan Yanovsky
// This code is uses sqlite3 and Node.js to create a views ticker for a website, which
// gets updated each time the website gets a new connection.

var http = require('http');
var sqlite3 = require('sqlite3');
var fs = require('fs');
var url = require('url');

var db = new sqlite3.Database('myDatabase.db');

var welcomeText = 'Welcome Visitor #';

/*http.createServer(function (req, res) { // async

    // eliminate double connections
    if (req.url === '/favicon.ico') {
        res.writeHead(200, { 'Content-Type': 'image/x-icon' });
        res.end();
        //console.log('favicon requested');
        return;
    }

	// send our html to client
	// FOR DEVELOPMENT ONLY
	fs.readFile('website.html', function(err, data) {
		
		res.writeHead(200, { 'Content-Type': 'text/html' });
		res.write(data);
		
		// async
		/*getCurrentVisitor(function (visitorNum) { // display current visitor number
			// create a text element in the website
			
			//res.write('<br><p>----------------------------</p>');
			//res.write('<p><b>' + welcomeText + visitorNum + '!</b></p>');
			res.end();
		});*/
		/*
    });
}).listen(8080);*/



http.createServer(function (request, response) {
	// https://stackoverflow.com/questions/6011984/basic-ajax-send-receive-with-node-js
	// https://www.w3schools.com/xml/ajax_xmlhttprequest_send.asp
	
	var path = url.parse(request.url).pathname;
	if (path == "/getTicker") {
		console.log("recieved request")
		getCurrentVisitor(function (visitorNum) { // display current visitor number

			response.writeHead(200, {
				'Content-Type': 'text/plain', 
				'Access-Control-Allow-Origin' : '*',
				'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
				}); // enable cors
				
			response.end("" + visitorNum);
			
			console.log("sent response " + visitorNum);
		});
	}
	
}).listen(8080);


function getCurrentVisitor(callback) {
    // async
    db.get("SELECT visitorNum FROM visitors ORDER BY visitorNum DESC LIMIT (1)", function (err, row) {
        if (err) throw err;

        // THIS user is the (lastVisitorNumber+1) viewer of the website
        var lastVisitorNumber = row.visitorNum; 
        lastVisitorNumber++;

        // prep sql
        var sql = "INSERT INTO visitors VALUES (" + lastVisitorNumber + ")";

        // async
        db.run(sql, function () { // insert the new user's number into the database
            console.log('Added entry into db: ' + lastVisitorNumber);
        }); 

        // async
        callback(lastVisitorNumber); // return through a callback
    });
}