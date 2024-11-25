// app.js
'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

const cors = require('cors');
app.use(cors()); // Enable CORS for all routes



const db = require('./config/database');
var jsonParser = bodyParser.json();
var urlencoderParser = bodyParser.urlencoded({ extended: false });

// Include your routes

app.use(jsonParser); // Use JSON parser for all requests

const pRoute = require('./routes/pwdRoute');
app.use('/api', pRoute); // Use '/api' as a prefix for your API routes

const lRoute = require('./routes/logRoute'); // Import your new activity route
app.use('/api', lRoute); // Add the new route

const CRUD_eRoute = require('./routes/CRUD_empRoute');
app.use('/api', CRUD_eRoute);

const crud_lRoute = require('./routes/CRUD_logRoute'); // Add the new route for logs
app.use('/api', crud_lRoute);

const r_aRoute = require('./routes/showEvents_attRoute'); // Add the new route for showing events
app.use('/api', r_aRoute);

const i_aRoute = require('./routes/insertID_attRoute');
app.use('/api', i_aRoute);

const qRoute = require('./routes/query_Route');
app.use('/api', qRoute);

const r_sRoute = require('./routes/showEvents_supRoute');
app.use('/api', r_sRoute);

const CRUD_mRoute = require('./routes/CRUD_marketingRoute');
app.use('/api', CRUD_mRoute);

const CRUD_fRoute = require('./routes/CRUD_feedbackRoute');
app.use('/api', CRUD_fRoute);



var port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
