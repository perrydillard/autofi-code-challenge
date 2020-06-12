/*
* Copyright 2020 Perry Dillard, All rights reserved.
* PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
*/

const config = require('../config');

describe('AutoFi CSV File Processor Test Suite', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Parse and transform', () => {
    // Arrange
    const x = 'Hi';

    // Act

    // Expect
    expect(x).toBe('Hi');
  });
});
