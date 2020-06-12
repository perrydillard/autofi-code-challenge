/*
* Copyright 2020 Perry Dillard, All rights reserved.
* PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
*/

const { isRequired } = require('./utils');
const config = require('../config');

module.exports = class CsvProcessor {
  constructor(file = isRequired('file'), targetConfig = isRequired('targetConfig')) {
    // The file to parse
    this.file = file;

    // The target output config
    this.targetConfig = targetConfig;
  }
}
