
const bodyParser = require('body-parser');

const express = require('express');
const app = express();

const mysql = require('mysql');
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
            connection.query('CREATE TABLE REPO_EVENTS (event_id INT, event_title VARCHAR(20), action VARCHAR(20));');
        }
    });
} catch (e) {
    console.log(`error: ${e}`);
};

connection.query('DESCRIBE REPO_EVENTS;', ( error, results)=>{
    console.log(results);
});



app.listen(444, '0.0.0.0');
app.get('/', (req, res) => {
    res.send('<p>home</p>');
});
var jsonParser = bodyParser.json()

app.post('/payload', jsonParser, (req, res) => {
    data = JSON.stringify(req.body);
    console.log(JSON.parse(data).ref);
    res.send('s');
})




