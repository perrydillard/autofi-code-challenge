/*
* Copyright 2020 Perry Dillard, All rights reserved.
* PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
*/

// This file includes all configurable values for this project along with their default values. Overrides of
// values should be placed in their respective deployment environment file. Only sections/values that need to
// be overridden should be placed there, not the entire configuration.
module.exports = {
  projectName: 'autofi-code-challenge',
  local: false,
  debug: false,
  port: process.env.PORT,
  fileUpload: {
    fileSize: 50 * 1025 * 1024,
    useTempFiles: true,
    tempFileDir: '/tmp/'
  }
};
