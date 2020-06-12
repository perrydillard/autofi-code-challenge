/*
* Copyright 2020 Perry Dillard, All rights reserved.
* PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
*/

const fs = require('fs-extra');
const CsvProcessor = require('../src/CsvProcessor');
const config = require('../config');

describe('AutoFi CSV File Processor Test Suite', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Validate required constructor args', () => {
    try {
      // Arrange, Act
      const obj = new CsvProcessor();
    } catch (ex) {
      // Expect
      expect(ex.message).toBe('file is required');
    }
    try {
      // Arrange, Act
      const obj = new CsvProcessor('/tmp/uploaded.csv');
    } catch (ex) {
      // Expect
      expect(ex.message).toBe('targetConfig is required');
    }
  });

  test('Parse and transform 001', async () => {
    // Arrange
    const inputFile = `${__dirname}/AutoFiTestData_001.csv`;
    const proc = new CsvProcessor(inputFile, config.get('outputSchema'));

    // Act
    const ret = await proc.parse();

    // Expect
    const f1 = fs.readFileSync(proc.outputFile);
    const f2 = fs.readFileSync(`${inputFile}_expected.csv`);
    expect(f1.toString()).toEqual(f2.toString());
  });
});
