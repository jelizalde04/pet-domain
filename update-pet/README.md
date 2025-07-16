# Update-Pet Microservice

## 1. Service Overview     

The `update-pet` microservice allows updating pet profiles and their associated images. Owners (authenticated users) can update their pets' data, such as name, species, breed, birthdate, etc. They can also update the pet's image, which is uploaded to a cloud storage service like AWS S3.

### Purpose

- Update pet information (name, species, breed, birthdate).
- Update the pet's associated image.
- Ensure only the pet's owner can perform updates.

### Interaction with Other Microservices

This microservice communicates with AWS S3 to store images and with the database to update pet records.

## 2. Routes and Endpoints

### 1. Update Pet Information

- **Method:** `PATCH`
- **Route:** `/pets/update/{id}`
- **Description:** Updates a pet's information in the database.

#### Request Parameters

- `id`: Pet ID to update (UUID, route parameter).

#### Request Body

- `name`: Pet's name (string, optional).
- `species`: Pet's species (string, optional).
- `breed`: Pet's breed (string, optional).
- `birthdate`: Pet's birthdate (string, format `YYYY-MM-DD`, optional).

#### Responses

- **200 OK:** If the pet is updated successfully.
- **400 Bad Request:** If there are invalid or missing fields.
- **404 Not Found:** If the pet does not exist.
- **403 Forbidden:** If the user does not have permission to update the pet.

#### Example Request (cURL)

```bash
curl -X PATCH http://localhost:3002/pets/update/12345 \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"name": "Rex", "species": "Dog", "birthdate": "2020-05-01"}'
```

### 2. Update Pet Image

- **Method:** `PUT`
- **Route:** `/pets/{id}/image`
- **Description:** Updates the pet's image in AWS S3.

#### Request Parameters

- `id`: Pet ID to update (UUID, route parameter).

#### Request Body

- `image`: Pet image file (multipart/form-data).

#### Responses

- **200 OK:** If the image is updated successfully.
- **404 Not Found:** If the pet does not exist.
- **403 Forbidden:** If the user does not have permission to update the image.
- **500 Internal Server Error:** If an error occurs while updating the image.

#### Example Request (cURL)

```bash
curl -X PUT http://localhost:3002/pets/12345/image \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -F "image=@/path/to/image.jpg"
```

## 3. Service Workflow

### User Authentication

- The owner must be authenticated via a JWT token, which is verified before allowing updates.

### Updating Pet Information

- The provided data is validated and, if valid, updated in the database.
- A check ensures only the pet's owner can modify its data.

### Updating Pet Image

- The service validates that the pet exists and the user has permission.
- The new image is uploaded to AWS S3, and the image URL is updated in the database.

### System Components

#### Controllers

- `updatePet`: Updates pet data in the database.
- `updatePetImage`: Updates the pet's image in S3 and the URL in the database.

#### Services

- `updatePetProfile`: Logic to validate and update pet data in the database.
- `uploadImageToS3`: Uploads the pet image to AWS S3 and returns the URL.
- `updatePetImageInDatabase`: Updates the image URL in the database.
- `deletePetImageFromS3`: Deletes the previous image from S3 if necessary.

## 4. Technologies and Tools Used

- **Programming Language:** Node.js
- **Framework:** Express.js
- **Database:** SQL (likely using Sequelize ORM)
- **Cloud Services:** AWS S3 for image storage
- **Authentication:** JWT for user authentication
- **File Handling:** Multer for image uploads
- **HTTP Requests:** axios for interacting with AWS S3

### Main Dependencies

- `express`: API framework
- `jsonwebtoken`: JWT creation and verification
- `multer`: File upload middleware
- `axios`: For interacting with AWS S3
- `sequelize`: ORM for SQL database interaction

## 5. Authentication and Security

- **JWT Authentication:** The microservice uses JWT tokens to authenticate requests. The token is sent in the request headers as `Authorization: Bearer <JWT_TOKEN>`.
- **Route Security:** The `authenticateToken` middleware validates the JWT on update routes and ensures only the pet's owner can update its data or image.

## 6. Setup and Running

### Prerequisites

- Node.js (v14 or higher)
- AWS S3 configured with a bucket for image storage
- Database configured (SQL with Sequelize)

### Installation Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository_url>
   ```
2. **Navigate to the project directory:**
   ```bash
   cd update-pet
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Create a `.env` file** with the necessary variables (e.g., AWS keys, database credentials).

5. **Start the server:**
   ```bash
   node app.js
   ```

### Environment Variables

- `PORT`: API port (default: 3001)
- `S3_BUCKET_NAME`: AWS S3 bucket name
- `DB_URL`: SQL database connection URL

## 7. Swagger Documentation

To test the API endpoints interactively, access the Swagger documentation at:

```
http://localhost:3002/api-docs-updatePet
```

## 8. Testing and Coverage

If automated tests exist, you can run them with:

```bash
npm test
```

## 9. Contributing

1. Fork the repository.
2. Create a branch for your changes.
3. Make your changes and test locally.
4. Submit a pull request with a clear description of your changes.

## 10. License

This project is licensed under the MIT License. See the LICENSE file for details.