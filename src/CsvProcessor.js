/*
* Copyright 2020 Perry Dillard, All rights reserved.
* PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
*/

const { EOL } = require('os');
const _ = require('lodash');
const fs = require('fs-extra');
const csv = require('csv-parser');
const { isRequired } = require('./utils');
const config = require('../config');

module.exports = class CsvProcessor {
  constructor(file = isRequired('file'), targetSchema = isRequired('targetSchema')) {
    // The file to parse
    this.file = file;

    // Build the output filename by simply appending a suffix
    this.outputFile = `${file}${config.get('outputFileSuffix')}`;

    // The target output config
    this.targetSchema = targetSchema;
  }

  parse() {
    // Return a promise which allows the client to await/.then() or not depending on need
    return new Promise((resolve) => {
      const ret = { success: true };

      // Open our output file stream and write the headers
      const outputStream = fs.createWriteStream(this.outputFile);
      outputStream.write(`${this.targetSchema.join(',')}${EOL}`);

      // Process the input file and create the output
      fs.createReadStream(this.file)
      .pipe(csv())
      .on('data', (data) => {
        const schemaLength = this.targetSchema.length;
        for (let i = 0; i < schemaLength; i += 1) {
          const val = _.get(data, this.targetSchema[i], '');
          outputStream.write(val.indexOf(',') > -1 ? `"${val}"` : val);
          outputStream.write(i === schemaLength - 1 ? EOL : ',');
        }
      })
      .on('end', () => {
        outputStream.end();
        resolve(ret);
      });
    });
  }
}
