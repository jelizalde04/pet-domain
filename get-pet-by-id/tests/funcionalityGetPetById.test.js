jest.setTimeout(30000); 

const fs = require('fs');
const path = require('path');
const dbs = require('../config/db');

describe('Testing Microservice Functionality', () => {
  test('db.js file exists', () => {
    const filePath = path.join(__dirname, '../config/db.js');
    expect(fs.existsSync(filePath)).toBe(true);
  });

  const dbConnections = Object.entries(dbs).filter(
    ([, db]) => db && typeof db.authenticate === 'function'
  );

  test('all database connections are defined', () => {
    expect(dbConnections.length).toBeGreaterThan(0);
    dbConnections.forEach(([name, db]) => {
      expect(db).toBeDefined();
    });
  });

  dbConnections.forEach(([dbName, dbInstance]) => {
    test(`Database connection for "${dbName}" is established successfully`, async () => {
      try {
        await dbInstance.authenticate();
        expect(true).toBe(true);
      } catch (error) {
        expect(error).toBeUndefined();
      }
    });
  });

  afterAll(async () => {
    for (const [, dbInstance] of dbConnections) {
      await dbInstance.close();
    }
  });
});
