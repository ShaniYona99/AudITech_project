
const bodyParser = require('body-parser');

const express = require('express');
const app = express();

const mysql = require('mysql');
//create db connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'events_db'
});

try {
    //check if table exists
    connection.query(`SELECT * 
    FROM information_schema.tables
    WHERE table_schema = 'events_db' 
        AND table_name = 'repo_events'
    LIMIT 1;`, (error, results) => {
        if (error) return console.log(error);
        if (results.length < 0) {

            //create table if none exist
            connection.query('CREATE TABLE REPO_EVENTS (event_id INT PRIMARY KEY, event_title VARCHAR(200), action VARCHAR(20), user VARCHAR(100), number_reviewers INT, head_branch VARCHAR(100), base_branch VARCHAR(100));');
        }
    });
} catch (e) {
    console.log(`error: ${e}`);
};

connection.query('DESCRIBE REPO_EVENTS;', ( error, results)=>{
    console.log(results);
});


//listen for requests
app.listen(444, '0.0.0.0');

app.get('/', (req, res) => {
    res.send('<p>home</p>');
});
var jsonParser = bodyParser.json()

//endpoint for github events
app.post('/payload', jsonParser, (req, res) => {
    data = JSON.stringify(req.body);
    console.log(JSON.parse(data).ref);
    res.send('s');
})




