# Create-Pet Microservice

## 1. Service Overview

The `create-pet` microservice allows authenticated users to create pet profiles. Owners (users) can create a profile for their pets by providing data such as name, species, breed, birthdate, color, etc. An image of the pet can also be uploaded and stored in a cloud storage service like AWS S3.

### Purpose

- Create a pet profile associated with an authenticated user.
- Upload pet images to AWS S3.
- Store pet profile data in a database (likely SQL).

### Interaction with Other Microservices

This microservice does not directly depend on other microservices, but it interacts with a cloud storage system (AWS S3) to store images and with a database to store pet profile data.

## 2. Routes and Endpoints

### Create a New Pet Endpoint

- **Method:** `POST`
- **Route:** `/pets`
- **Description:** Creates a new pet profile for an authenticated user.

#### Request Parameters (`multipart/form-data` form):

- `name`: Pet's name (string, required)
- `species`: Pet's species (string, required)
- `breed`: Pet's breed (string, required)
- `birthdate`: Pet's birthdate (string, format "YYYY-MM-DD", required)
- `residence`: Pet's residence (string, required)
- `gender`: Pet's gender (string, required)
- `color`: Pet's color (string, required)
- `image`: Pet's image (file, required)

#### Example Request (cURL)

```bash
curl -X POST http://localhost:3001/pets \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -F "name=Rex" \
  -F "species=Dog" \
  -F "breed=Labrador" \
  -F "birthdate=2020-05-01" \
  -F "residence=Home" \
  -F "gender=Male" \
  -F "color=Yellow" \
  -F "image=@/path/to/image.jpg"
```

#### Success Response (`201 Created`)

```json
{
  "id": 123,
  "name": "Rex",
  "species": "Dog",
  "breed": "Labrador",
  "birthdate": "2020-05-01",
  "residence": "Home",
  "gender": "Male",
  "color": "Yellow",
  "imageUrl": "https://s3.amazonaws.com/your-bucket/pet_profile/123_image.jpg"
}
```

#### Error Response (`400 Bad Request`)

```json
{
  "error": "No image file was uploaded."
}
```

## 3. Service Workflow

### Authentication

- The owner must be authenticated via a JWT token.
- The token is verified by the `authenticateToken` middleware, which ensures the token belongs to the correct owner.

### Image Handling

- The pet image is handled using Multer, which stores the file in memory.
- The image is then uploaded to AWS S3 using the `PetService.uploadPetImageToS3` service.

### Pet Profile Creation

- The provided form data and uploaded image are combined.
- The pet profile is created in the database using the `Pet` model.
- Finally, the pet profile is returned with the uploaded image URL.

### Controllers and Services

- The `createPetProfile` controller handles receiving the request, validating it, uploading the image, and creating the pet record.
- The `PetService` manages uploading the image to S3 and creating the profile in the database.

## 4. Technologies and Tools Used

- **Programming Language:** Node.js
- **Framework:** Express.js
- **Database:** SQL (likely Sequelize ORM)
- **Cloud Services:** AWS S3 for image storage
- **Authentication:** JWT for user authentication
- **File Handling:** Multer for image uploads

### Main Dependencies

- `express`: API framework
- `jsonwebtoken`: JWT creation and verification
- `multer`: File upload middleware
- `axios`: For uploading images to S3
- `sequelize`: ORM for SQL database interaction

## 5. Authentication and Security

- **Authentication:** Uses JWT (JSON Web Tokens) to authenticate users before allowing pet profile creation.
- **Route Security:** Routes are protected by the `authenticateToken` middleware, which validates the JWT and ensures it belongs to the correct owner.
- **CORS:** CORS is enabled to allow cross-domain requests.

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
   cd create-pet
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Create a `.env` file** with the necessary variables (e.g., AWS keys, database credentials).

5. **Start the server:**
   ```bash
   npm start
   ```

### Environment Variables

- `PORT`: API port (default: 3001)
- `S3_BUCKET_NAME`: AWS S3 bucket name
- `DB_URL`: SQL database connection URL

## 7. Swagger Documentation

To test the API endpoints interactively, access the Swagger documentation at:

```
http://localhost:3001/api-docs-createPet
```

## 8. Testing and Coverage

This microservice includes automated tests. To run them, use:

```bash
npm test
```

## 9. Contributing

To contribute to this microservice:

1. Fork the repository.
2. Create a branch for your changes.
3. Make your changes and test locally.
4. Submit a pull request with a clear description of your changes.

## 10. License

This project is licensed under the MIT License. See the LICENSE file for details.