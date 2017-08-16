

const express = require('express'),
    bodyParser = require('body-parser'),
    CWD = require('./../index'),
    app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/webhook', CWD());

app.listen(5566, function () {
    console.log('Express server listening on port http://localhost:6666');
});