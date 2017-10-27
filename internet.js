// Written by Jonatan Yanovsky
// This code is uses sqlite3 and Node.js to create a views ticker for a website, which
// gets updated each time the website gets a new connection.

var http = require('http');
var sqlite3 = require('sqlite3');
var fs = require('fs');
var url = require('url');
var parseBody = require('parse-body');

var db = new sqlite3.Database('myDatabase.db');

var welcomeText = 'Welcome Visitor #';

var lastVisitorNumber;

http.createServer(function (request, response) {
	// https://stackoverflow.com/questions/6011984/basic-ajax-send-receive-with-node-js
	// https://www.w3schools.com/xml/ajax_xmlhttprequest_send.asp
	// https://github.com/mapbox/node-sqlite3/wiki/API
	
	var path = url.parse(request.url).pathname;
	
	// https://stackoverflow.com/questions/46966725/node-js-url-search-query-portion-is-empty
	//const { headers, method, url } = request;
	
  
	if (path == "/getTicker") {
		console.log("recieved request")
		getCurrentVisitor(function (visitorNum) { // display current visitor number

			response.writeHead(200, {
				'Content-Type': 'text/plain', 
				'Access-Control-Allow-Origin' : '*',
				'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
				}); // enable cors
				
			response.end("" + visitorNum);
			
			console.log("sent visitorNum for ticker");
		});
	}
	else if (path == "/getComments") {
		console.log("comments reqested")
		getComments(function (commentsText) { // get most recent comments

			response.writeHead(200, {
				'Content-Type': 'text/plain', 
				'Access-Control-Allow-Origin' : '*',
				'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
				}); // enable cors
				
			// https://stackoverflow.com/questions/34149101/how-to-pass-an-object-to-client-javascript-nodejs-express
			
			var reply = JSON.stringify(commentsText); 
			// convert our object to a string. Then parse on client side
			response.end("" + reply);
			
			console.log("sent comments");

		});
	}
	else if (path == "/newComment") {
		// https://www.w3schools.com/nodejs/nodejs_http.asp
		
		
		/*let body = [];
		request.on('error', (err) => { console.error(err); 
			}).on('data', (chunk) => { 
			body.push(chunk);
			}).on('end', () => { 
			body = Buffer.concat(body).toString(); 
			console.log(body);
			

			//var comment = 
			//if (body != null) setNewComment(comment);
		});*/
		
		// https://www.npmjs.com/package/parse-body
		parseBody(request, 1e6, function(err, comment) {
			if (err) return console.log(err);
			if (comment.val != null) 
				setNewComment(comment.val);
			//console.log(comment.val);
		});
		
		// send a response to calm down the client https://stackoverflow.com/questions/16285035/simple-ajax-get-request-is-pending
		response.writeHead(200, {
			'Content-Type': 'text/plain', 
			'Access-Control-Allow-Origin' : '*',
			'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
			}); // enable cors
		response.write("Recieved request");
		response.end();
		
	}
	
}).listen(8080);


function getCurrentVisitor(callback) {
    // async
    db.get("SELECT visitorNum FROM visitors ORDER BY visitorNum DESC LIMIT (1)", function (err, row) {
        if (err) throw err;

        // THIS user is the (lastVisitorNumber+1) viewer of the website
        lastVisitorNumber = row.visitorNum; 
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


function getComments(callback) { // return comments
    // async
    db.all("SELECT * FROM comments ORDER BY visitorNum DESC LIMIT (5)", function (err, data) {
        if (err) throw err;

		// TABLE format: comments (visitorNum STRING, comment STRING);
		// data[0].visitorNum 
		// data[0].comment

        // async
        callback(data); // return through a callback
    });
}


function setNewComment(comment) {

	// prep sql
	if (lastVisitorNumber != null && lastVisitorNumber != undefined) {
		
		// https://stackoverflow.com/questions/39805003/sqlite-error-no-such-column
		var sql = 'INSERT INTO comments VALUES (\'' + lastVisitorNumber + '\', \'' + comment + '\')';

		// async
		db.run(sql, function (err) { // insert the new user's number into the database
			if (err) throw err;
			
			console.log('Added entry into db: ' + lastVisitorNumber + ' ,' + comment);
		}); 
	}
}