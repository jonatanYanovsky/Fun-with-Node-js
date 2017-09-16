// Written by Jonatan Yanovsky
// This code is uses sqlite3 and Node.js to create a views ticker for a website, which
// gets updated each time the website gets a new connection.

var http = require('http');
var sqlite3 = require('sqlite3');

var db = new sqlite3.Database('myDatabase.db');

var welcomeText = 'Welcome Visitor #';

http.createServer(function (req, res) { // async

    // eliminate double connections
    if (req.url === '/favicon.ico') {
        res.writeHead(200, { 'Content-Type': 'image/x-icon' });
        res.end();
        console.log('favicon requested');
        return;
    }

    // create a text element in the website
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    // async
    getCurrentVisitor(function (visitorNum) { // display current visitor number
        res.end(welcomeText + visitorNum + '!');
    });

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