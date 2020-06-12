/*
* Copyright 2020 Perry Dillard, All rights reserved.
* PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
*/

const httpStatus = require('http-status');
const fs = require('fs-extra');
const { nanoid } = require('nanoid');
const CsvProcessor = require('../CsvProcessor');
const config = require('../../config');

module.exports = (app) => {
  // Setup routes
  app.post('/api/uploadcsv', async (req, res) => {
    // Assume success
    let message = 'success';
    let status = httpStatus.OK;

    // Check some pre-conditions
    if (!req.files || req.files.length === 0) {
      status = httpStatus.NO_CONTENT;
      message = 'no files uploaded';
    }
    if (!req.body || !req.body[config.get('providerNameInputField')]) {
      status = httpStatus.BAD_REQUEST;
      message = 'no customerId found in request body';
    }

    // Move the temporary file to a more permanent location with a unique prefix and process it
    const prefix = nanoid(6);
    const filePath = `${config.get('fileDestinationPath')}/${req.body[config.get('providerNameInputField')]}`;
    fs.ensureDir(filePath);
    const fileName = `${filePath}/${prefix}_${req.files[config.get('fileInputFieldName')].name}`;
    try {
      await req.files[config.get('fileInputFieldName')].mv(fileName);

      // Process the uploaded file
      const proc = new CsvProcessor(fileName, config.get('outputSchema'));

      // Since parse returns a Promise you can either await/.then() here or leave as is for true
      // asynchronous operation and a quick response to the client.
      const ret = proc.parse();
    } catch (ex) {
      status = httpStatus.INTERNAL_SERVER_ERROR;
      message = ex.message;
    }

    res.send({ status, message});
  });
};
