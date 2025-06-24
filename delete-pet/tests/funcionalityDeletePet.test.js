const fs = require('fs');
const path = require('path');
const sequelize = require('../config/db');

describe('Functionality Test Microservice', () => {
  test('db.js file exists', () => {
    const filePath = path.join(__dirname, '../config/db.js');
    expect(fs.existsSync(filePath)).toBe(true);
  });

  test('Database connection is established successfully', async () => {
    expect.assertions(1);
    try {
      await sequelize.authenticate();
      console.log('✅ Database connection test completed and approved successfully.');
      expect(true).toBe(true); 
    } catch (error) {
      console.error('❌ Error connecting to the database:', error);
      expect(error).toBeUndefined(); 
    }
  });

  afterAll(async () => {
    await sequelize.close();
    console.log('✅ Database connection closed.');
  });
});