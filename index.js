/*
* Copyright 2020 Perry Dillard, All rights reserved.
* PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
*/

const express = require('express');
const config = require('./config');

if (config.get('debug'))
{
  console.log(`Config: ${process.env.NODE_ENV}`);
  console.log(JSON.stringify(config, null, 2));
}

// Create the server
const app = express();

// Configure routes
require('./src/routes/csvRoutes')(app);

// Startup the server
app.listen(config.get('port'));
