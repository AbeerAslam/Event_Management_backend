// app.js
'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

const db = require('./config/database');
var jsonParser = bodyParser.json();
var urlencoderParser = bodyParser.urlencoded({ extended: false });

// Include your routes

app.use(jsonParser); // Use JSON parser for all requests

const pRoute = require('./routes/pwdRoute');
app.use('/api', pRoute); // Use '/api' as a prefix for your API routes

const lRoute = require('./routes/logRoute'); // Import your new activity route
app.use('/api', lRoute); // Add the new route

const eRoute = require('./routes/CRUD_empRoute');
app.use('/api', eRoute);

const crud_lRoute = require('./routes/CRUD_logRoute'); // Add the new route for logs
app.use('/api', crud_lRoute);

var port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
