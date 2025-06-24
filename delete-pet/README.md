# Microservicio Delete-Pet

## 1. Resumen del Microservicio

El microservicio `delete-pet` permite la eliminación de un perfil de mascota a partir de su ID. El usuario debe estar autenticado mediante un token JWT y debe ser el responsable de la mascota para poder eliminarla. Además, si la mascota tiene una imagen asociada, esta también se elimina de AWS S3 antes de borrar el registro de la mascota en la base de datos.

### Propósito:
- Eliminar un perfil de mascota asociado a un usuario autenticado.
- Eliminar la imagen de la mascota desde AWS S3.
- Asegurarse de que solo el responsable de la mascota pueda eliminarla.

### Interacción con otros microservicios:
Este microservicio no interactúa directamente con otros microservicios, pero realiza una solicitud para eliminar la imagen de la mascota en AWS S3 y elimina el registro de la mascota en la base de datos.

## 2. Rutas y Endpoints

### **1. Eliminar una Mascota por ID**
- **Método:** `DELETE`
- **Ruta:** `/pets/delete/{id}`
- **Descripción:** Elimina el perfil de una mascota a partir de su ID.

#### Parámetros de la solicitud:
- `id`: ID de la mascota a eliminar (UUID, parámetro en la ruta).

#### Respuestas:
- **200 OK:** Si la mascota se elimina correctamente.
- **400 Bad Request:** Si el ID de la mascota no es válido.
- **403 Forbidden:** Si el usuario no tiene permiso para eliminar la mascota.
- **404 Not Found:** Si la mascota no existe.
- **500 Internal Server Error:** Si ocurre un error en el servidor.

#### Ejemplo de solicitud (cURL):
```bash
curl -X DELETE http://localhost:4005/pets/delete/12345 \
  -H "Authorization: Bearer <JWT_TOKEN>"
Ejemplo de respuesta (200 OK):
json
Copiar
{
  "message": "Mascota eliminada correctamente"
}
Ejemplo de respuesta (400 Bad Request):
json
Copiar
{
  "code": 400,
  "message": "ID no es válido"
}
Ejemplo de respuesta (403 Forbidden):
json
Copiar
{
  "code": 403,
  "message": "No tienes permiso para eliminar esta mascota"
}
Ejemplo de respuesta (404 Not Found):
json
Copiar
{
  "code": 404,
  "message": "Mascota no encontrada"
}
3. Funcionamiento del Microservicio
Flujo de trabajo:
Autenticación del Usuario:

El usuario debe estar autenticado mediante un token JWT, que es verificado antes de permitirle eliminar la mascota.

Eliminación de la Mascota:

El microservicio recibe una solicitud DELETE con el ID de la mascota. Se valida que el usuario autenticado sea el responsable de esa mascota.

Si el usuario es el responsable, se procede a eliminar la imagen de la mascota en AWS S3 y luego eliminar el registro de la mascota en la base de datos.

Eliminación de la Imagen:

Si la mascota tiene una imagen asociada, esta se elimina de AWS S3 mediante una solicitud DELETE a S3.

Eliminación de la Mascota:

Finalmente, el registro de la mascota se elimina de la base de datos.

Componentes del sistema:
Controlador:

deletePet: Recibe la solicitud, valida al usuario y elimina la mascota y su imagen.

Servicio:

deletePetById: Lógica de validación y eliminación de la mascota de la base de datos y la eliminación de la imagen en AWS S3.

deleteImageFromS3: Elimina la imagen de la mascota desde AWS S3.

4. Tecnologías y Herramientas Utilizadas
Lenguaje de Programación: Node.js

Framework: Express.js

Base de Datos: SQL (probablemente utilizando Sequelize ORM)

Servicios en la Nube: AWS S3 para almacenar las imágenes de las mascotas.

Autenticación: JWT para verificar que los usuarios están autenticados.

Dependencias principales:
express: Framework para la creación de APIs.

jsonwebtoken: Para la creación y verificación de tokens JWT.

axios: Para interactuar con AWS S3 y realizar la eliminación de imágenes.

sequelize: ORM para interactuar con la base de datos SQL.

5. Autenticación y Seguridad
Autenticación con JWT: El microservicio utiliza un token JWT para autenticar las solicitudes. El token se envía en los encabezados de las solicitudes a través de Authorization: Bearer <JWT_TOKEN>.

Seguridad en las Rutas:

El middleware authenticateToken valida el token JWT antes de permitir el acceso al endpoint.

Se asegura de que solo los responsables de una mascota puedan eliminarla.

6. Configuración y Ejecución
Requisitos previos:
Node.js (v14 o superior)

AWS S3 configurado con un bucket para almacenar las imágenes.

Base de datos configurada (SQL con Sequelize).

Instrucciones de instalación:
Clona el repositorio:

bash
Copiar
git clone <repository_url>
Navega al directorio del proyecto:

bash
Copiar
cd delete-pet
Instala las dependencias:

bash
Copiar
npm install
Crea un archivo .env con las variables necesarias (por ejemplo, claves de AWS, credenciales de base de datos).

Ejecuta el servidor con el siguiente comando:

bash
Copiar
node app.js
Variables de entorno:
PORT: Puerto en el que se ejecutará la API.

S3_BUCKET_NAME: Nombre del bucket en AWS S3.

DB_URL: URL de conexión a la base de datos SQL.

Puerto:
El microservicio corre por defecto en el puerto 4005.

7. Swagger Documentation
Para probar los endpoints interactivos de la API, accede a la documentación Swagger en:

bash
Copiar
http://localhost:4005/api-docs
8. Pruebas y Coverage
Si existen pruebas automatizadas, puedes ejecutarlas con:

bash
Copiar
npm test
9. Contribución
Para contribuir al microservicio:

Haz un fork del repositorio.

Crea una rama para tus cambios.

Realiza tus cambios y ejecuta las pruebas localmente.

Haz un pull request con una descripción clara de tus cambios.

10. Licencia