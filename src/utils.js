/*
* Copyright 2020 Perry Dillard, All rights reserved.
* PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
*/

module.exports = {
  isRequired: (arg) => { throw new Error(`${arg} is required`); }
};
