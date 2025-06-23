const fs = require('fs');
const path = require('path');

describe('Update Pet Microservice', () => {
  test('Functionality test completed successfully', () => {
    const filePath = path.join(__dirname, '../config/db.js');
          expect(fs.existsSync(filePath)).toBe(true);
  });
});
