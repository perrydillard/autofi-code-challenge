/*
* Copyright 2020 Perry Dillard, All rights reserved.
* PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
*/

const httpStatus = require('http-status');
const fs = require('fs-extra');
const { nanoid } = require('nanoid');
const config = require('../../config');

module.exports = (app) => {
  // Setup routes
  app.post('/api/uploadcsv', async (req, res) => {
    let message = 'success';
    let status = httpStatus.OK;
    if (!req.files || req.files.length === 0) {
      status = httpStatus.NO_CONTENT;
      message = 'no files uploaded';
    }
    if (!req.body || req.body.customerId) {
      status = httpStatus.BAD_REQUEST;
      message = 'no customerId found in request body';
    }

    // Move the temporary file to a more permanent location with a unique prefix
    const prefix = nanoid(6);
    const filePath = `${config.get('fileDestinationPath')}/${req.body.customerId}`;
    fs.ensureDir(filePath);
    const fileName = `${filePath}/${prefix}_${req.files[config.get('fileInputFieldName')].name}`;
    try {
      const ret = await req.files[config.get('fileInputFieldName')].mv(fileName);
    } catch (ex) {
      status = httpStatus.INTERNAL_SERVER_ERROR;
      message = ex.message;
    }

    res.send({ status, message});
  });
};
