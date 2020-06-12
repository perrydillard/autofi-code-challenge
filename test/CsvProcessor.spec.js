/*
* Copyright 2020 Perry Dillard, All rights reserved.
* PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
*/

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

  test('Parse and transform', () => {
    // Arrange
    const x = new CsvProcessor();

    // Act

    // Expect
    expect(x).toBe('Hi');
  });
});
