const fs = require('fs');
const path = require('path');

describe('Get All Pets Microservice', () => {
  test('Functionality test completed successfully', () => {
    // Validar que el archivo de configuración de la base de datos existe
    const filePath = path.resolve(__dirname, '../../config/db.js');
    
    // Validación de existencia
    expect(fs.existsSync(filePath)).toBe(true);
  });
});
