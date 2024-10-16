// app.js
'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

const db = require('./config/database');
var jsonParser = bodyParser.json();
var urlencoderParser = bodyParser.urlencoded({ extended: false });

// Include your routes
const pRoute = require('./routes/pwdRoute');
app.use(jsonParser); // Use JSON parser for all requests
app.use('/api', pRoute); // Use '/api' as a prefix for your API routes

var port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
