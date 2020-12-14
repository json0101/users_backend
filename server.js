const express = require('express');
const app  = express();
const bodyParser = require('body-parser');
require('./server/config/config.js');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('./server/routes/index'));

app.get('/', function(req, res) {
    res.send('Users Rest Api');
});

const port = process.env.PORT;

app.listen(port, function() {
    console.log("Escuchando el puerto "+ port);
});