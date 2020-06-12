/*
* Copyright 2020 Perry Dillard, All rights reserved.
* PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
*/

const config = require('./config');

module.exports = (app) => {
  // Setup routes
  app.post('/api/uploadcsv', (req, res) => {
    res.send({ status: 200, message: 'success'});
  });
};
