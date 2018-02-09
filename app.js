var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 3000;

app.get('/', function (req, res) {
    res.send('Welcome to my API');
});

app.listen(port, function () {
    console.log('Running on port: ' + port);
});

module.exports = app;