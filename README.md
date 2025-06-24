# Pet-Domain

## 1. Domain Overview

The **`pet-domain`** consists of several microservices responsible for managing pet profiles and user interactions. This domain includes microservices for:

- Creating, retrieving, updating, and deleting pet profiles.
- Managing images associated with pets in a cloud storage service (AWS S3).
- Ensuring pet security and privacy through user authentication with **JWT**.

### Included Microservices

1. **Create-Pet**: Allows authenticated users to create new pet profiles, including basic information and image upload.
2. **Get-Pet**: Allows retrieving information about a specific pet if the authenticated user is the pet's owner.
3. **Get-All-Pets**: Provides a list of all pets associated with an authenticated user.
4. **Update-Pet**: Allows updating information of an existing pet, including its image.
5. **Delete-Pet**: Allows deleting a pet profile, including its associated image.

### Technologies and Tools Used

- **Programming Language:** Node.js (JavaScript)
- **Framework:** Express.js for building RESTful APIs
- **Authentication:** JWT (JSON Web Tokens) for user authentication and authorization
- **Database:** SQL (Sequelize ORM)
- **Cloud Storage:** AWS S3 for storing pet images
- **File Handling:** Multer for file uploads
- **Testing:** Mocha, Chai (for automated tests)

---

## 2. Domain Folder Structure

The domain folder structure is organized for modularity and maintainability of each microservice. The main organization is as follows:

```
pet-domain/
├── create-pet/         # Microservice for creating pets
│   ├── controllers/    # Controllers for pet creation
│   ├── routes/         # Route definitions for pet creation
│   ├── services/       # Business logic (pet creation and image upload)
│   ├── models/         # Database models for pets
│   └── app.js          # Main file to start the microservice
├── get-pet/            # Microservice for retrieving a pet
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── models/
│   └── app.js
├── get-all-pets/       # Microservice for retrieving all pets of a user
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── models/
│   └── app.js
├── update-pet/         # Microservice for updating a pet
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── models/
│   └── app.js
├── delete-pet/         # Microservice for deleting a pet
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── models/
│   └── app.js
└── common/             # Shared folder for common functions (middlewares, authentication)
    ├── middlewares/    # JWT authentication, data validation
    └── utils/          # Common utilities (helper functions)
```

---

## 3. Technologies Used

### Languages and Frameworks

- **Node.js**: JavaScript runtime environment for the server
- **Express.js**: Framework for building RESTful APIs

### Databases

- **SQL (Sequelize ORM)**: Sequelize is used to handle interaction with the relational database, which stores pet and user records.

### Cloud Storage

- **AWS S3**: Storage service for saving images associated with pets.

### Security

- **JWT (JSON Web Tokens)**: Used to authenticate and authorize users before allowing any operation on pet profiles.

### Development Tools

- **Multer**: Middleware for file uploads, used for uploading images to AWS S3.
- **Axios**: For interacting with the cloud storage service (AWS S3).

---

## 4. General Domain Workflow

### General Workflow

1. **User Authentication**
   - Users must be authenticated with a valid JWT token before interacting with any microservice.
   - The `authenticateToken` middleware validates the token and associates the user ID with the process.

2. **Pet Creation (`create-pet`)**
   - An authenticated user can create a pet profile by providing the required data (name, species, breed, image).
   - The image is uploaded to AWS S3, and the pet details are stored in the database.

3. **Pet Retrieval (`get-pet`, `get-all-pets`)**
   - An authenticated user can retrieve their pet profiles by ID or get a list of all pets associated with their account.

4. **Pet Update (`update-pet`)**
   - Users can update their pet data, including changing the image.
   - The old image is deleted from AWS S3 and a new one is uploaded if necessary.

5. **Pet Deletion (`delete-pet`)**
   - Users can delete a pet from their account. The associated image is deleted from AWS S3 and the pet record is removed from the database.

---

## 5. Routes and Endpoints

### **Available Endpoints**

- **Create-Pet**
  - `POST /pets`: Create a pet profile

- **Get-Pet**
  - `GET /pets/{id}`: Get information about a pet by its ID

- **Get-All-Pets**
  - `GET /pets`: Get a list of all pets associated with an authenticated user

- **Update-Pet**
  - `PATCH /pets/update/{id}`: Update information of an existing pet
  - `PUT /pets/{id}/image`: Update a pet's image

- **Delete-Pet**
  - `DELETE /pets/delete/{id}`: Delete a pet from the database and AWS S3

---

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
   cd pet-domain
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Configure the `.env` file** with the necessary variables (e.g., AWS keys, database credentials).

5. **Start the server:**
   ```bash
   node app.js
   ```

---

## 7. Authentication and Security

### JWT Authentication

Each microservice in the domain requires a valid JWT token to access protected routes. The token is included in the request headers as `Authorization: Bearer <JWT_TOKEN>`.

### Security

- CORS is enabled to allow requests from different origins.
- Request validation is performed at the middleware level to ensure only authenticated users can access endpoints for modifying and deleting pets.

---

## 8. Swagger Documentation

To access the interactive API documentation and test the endpoints, visit the corresponding Swagger route:

- Swagger route for create-pet: `/api-docs-createPet`
- Swagger route for get-pet: `/api-docs-getPet`
- Swagger route for get-all-pets: `/api-docs-getAllPets`
- Swagger route for update-pet: `/api-docs-updatePet`
- Swagger route for delete-pet: `/api-docs-deletePet`