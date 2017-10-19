# Fun-with-Node-js --> to be renamed and pushed to a new project




To run website:
1. Run "start_execution.cmd" batch script.

2. Right click "website.html" and open with chrome


To setup database (first time running code):
run "db probe.cmd"

then execute commands:
.open myDatabase.db
CREATE TABLE IF NOT EXISTS visitors (visitorNum);
INSERT INTO visitors VALUES (1);
INSERT INTO visitors VALUES (2);
SELECT * FROM visitors ORDER BY visitorNum DESC LIMIT (1);