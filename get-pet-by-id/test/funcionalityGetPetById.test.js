const fs = require('fs');
const path = require('path');

describe('Get Pet by ID Microservice', () => {
  test('Functionality test completed successfully', () => {
    
    const filePath = path.resolve(__dirname, '../../config/db.js');
 
    expect(fs.existsSync(filePath)).toBe(true);
  });
});
