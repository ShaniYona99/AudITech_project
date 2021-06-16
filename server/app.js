
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const app = express();

const mysql = require('mysql');

app.use(cors());
try {
    //create db connection
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'events_db'
    });
    //check if table exists
    connection.query(`SELECT * 
    FROM information_schema.tables
    WHERE table_schema = 'events_db' 
        AND table_name = 'repo_events'
    LIMIT 1;`, (error, results) => {
        if (error) return console.log(error);
        if (results.length < 0) {

            //create table if none exist
            connection.query('CREATE TABLE REPO_EVENTS (event_id INT PRIMARY KEY, event_title VARCHAR(200), user VARCHAR(100), head_branch VARCHAR(100), base_branch VARCHAR(100));');
        }
    });
    if (connection && connection.end) {
        connection.end();

    }
} catch (e) {
    console.log(`error: ${e}`);
}



//listen for requests
app.listen(444, '0.0.0.0');

app.get('/', (req, res) => {
    res.send('<p>home</p>');
});
var jsonParser = bodyParser.json();



//endpoint for github events
app.post('/payload', jsonParser, (req, res) => {
    data = JSON.stringify(req.body);
    //create db connection
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'events_db'
    });

    if (JSON.parse(data).pull_request != undefined) {
        const request = JSON.parse(data).pull_request
        connection.query(`SELECT count(*) AS namesCount FROM repo_events WHERE event_id = ${request.id}`, (error, results) => {

            if (results[0].namesCount == 0) {
                connection.query('INSERT INTO REPO_EVENTS (event_id, event_title, user, head_branch, base_branch) ' +
                    `VALUES ('${request.id}', '${request.title}', '${request.user.login}', '${request.head.ref}', '${request.base.ref}');`);
            }
        });
    }
    if (connection && connection.end) {
        connection.end();
    }
    res.send('s');
});

// connection.query('SELECT * FROM repo_events', (err, rows) => {

//     console.log(JSON.stringify(rows));
// });
// close connection to db



//endpoint for client data retrieval 
app.get('/getEvents', async function (req, res) {
    var context = {};
            const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'password',
            database: 'events_db'
        })
  connection.query('SELECT * FROM repo_events', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = rows;
    res.send(context);
  });
    
    // try {
    //     // Connect to db
    //     const connection = mysql.createConnection({
    //         host: 'localhost',
    //         user: 'root',
    //         password: 'password',
    //         database: 'events_db'
    //     })
    //     let query = 'SELECT * FROM repo_events '
    //     const rows = await connection.query(query);
    //     console.log(rows);
    //     res.send('{"table" : '+ ', "status" : 200}');
    // } catch (e) {
    //     console.log(e);
    //     res.status(400).send(e);
    // } finally {
    //     if (connection && connection.end) {
    //         connection.end();
    //     }
    // }






    // let query = 'SELECT * FROM repo_events ';

    // const [rows] = await connection.query(query);
    // res.send('{"table" : ' + JSON.stringify(rows) + ', "status" : 200}');


    // res.send(payload);
});

// if (connection && connection.end) {
//     connection.end()
// }

