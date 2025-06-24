
const fs = require('fs');
const path = require('path');
const dbs = require('../config/db'); 

describe('Testing Microservice Functionality', () => {
  test('db.js file exists', () => {
    const filePath = path.join(__dirname, '../config/db.js');
    expect(fs.existsSync(filePath)).toBe(true);
  });
});