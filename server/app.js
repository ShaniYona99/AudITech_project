
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
// listen for req


app.listen(444, '0.0.0.0');
app.get('/', (req, res) =>{
    res.send('<p>home</p>');
});
var jsonParser = bodyParser.json()

app.post('/payload',jsonParser, (req, res) => {
    console.log(req.body);
    res.send('<p>here</p>')
})


