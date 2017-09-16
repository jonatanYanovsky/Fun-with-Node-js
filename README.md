# Fun-with-Node-js
Proof that I know Node.js and SQLite

notes:

sqlite3
npm: https://github.com/mapbox/node-sqlite3/tree/master
api: https://github.com/mapbox/node-sqlite3/wiki/API

async: https://stackoverflow.com/questions/13858909/synchronous-vs-asynchronous-code-with-node-js

To setup database:
run "db probe.cmd"

then execute commands:
.open myDatabase.db
CREATE TABLE IF NOT EXISTS visitors (visitorNum);
INSERT INTO visitors VALUES (1);
INSERT INTO visitors VALUES (2);
SELECT * FROM visitors ORDER BY visitorNum DESC LIMIT (1);

To run website:
1. Run "start_execution.cmd" batch script.

2. Go to website http://localhost:8080 in chrome

