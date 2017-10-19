# Fun-with-Node-js --> to be renamed and pushed to a new project

Spring 2018 Capstone Design Project


Project developed on Windows.

This project runs on SQLite and Node js. These require installing before running the project. 
In addition, Node may require performing the command "npm install <node_module_name>" in command prompt before running the server.
These modules are the "require" statements at the top of the "internet.js" file. Some may come installed by default with Node.


To run website:
1. Run "start_execution.cmd" batch script. This will run the server on your machine.
2. Right click "website.html" and open with chrome. This is the client which is also run on your machine.


To setup database (Only if running code for the first time with a freshly-created database. Not required if using existing database from github repository):

run "db probe.cmd"

then execute commands:
.open myDatabase.db
CREATE TABLE visitors (visitorNum STRING);
CREATE TABLE comments (visitorNum STRING, comment STRING);