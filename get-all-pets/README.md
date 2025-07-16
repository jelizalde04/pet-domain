# Get-All-Pets Microservice

## 1. Service Overview
  
The `get-all-pets` microservice allows authenticated users to retrieve all pets associated with their account. This microservice ensures that only the responsible user can access the list of their pets and returns details for each pet.

### Purpose

- Retrieve all pets associated with an authenticated user.
- Ensure that only the responsible user can access their list of pets.

### Interaction with Other Microservices

This microservice queries the database to obtain the user's pets and their details. It does not directly interact with other microservices.

## 2. Routes and Endpoints

### 1. Get All Pets for a User 

- **Method:** `GET`
- **Route:** `/pets`
- **Description:** Retrieves a list of all pets associated with the authenticated user.

#### Request Parameters

- **Headers:**
  - `Authorization`: JWT token to authenticate the user.

#### Responses

- **200 OK:** If pets associated with the user are found.
- **403 Forbidden:** If the user does not have permission to access the pets.
- **500 Internal Server Error:** If a server error occurs.

#### Example Request (cURL)

```bash
curl -X GET http://localhost:4004/pets \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

#### Example Response (200 OK)

```json
{
  "success": true,
  "data": [
    {
      "id": "12345",
      "name": "Rex",
      "species": "Dog",
      "breed": "Labrador",
      "birthdate": "2020-05-01"
    },
    {
      "id": "67890",
      "name": "Bella",
      "species": "Cat",
      "breed": "Persian",
      "birthdate": "2018-07-15"
    }
  ]
}
```

#### Example Response (403 Forbidden)

```json
{
  "success": false,
  "message": "You do not have permission to view this user's pets."
}
```

## 3. Service Workflow

### User Authentication

- The user must be authenticated via a JWT token, which is verified before allowing access to the list of pets.

### Pet Query

- The microservice receives a GET request.
- It validates that the user is authenticated via the JWT token.
- If the user is authenticated, the database is queried for all pets associated with that user.
- If there are no pets or the user is not authorized, the corresponding error is returned.

### Data Retrieval

- The database is queried to obtain the pets associated with the authenticated user.
- If any query fails, the corresponding error is returned.

### System Components

#### Controller

- `getAllPets`: Receives the request, validates the user, and retrieves the list of pets associated with the responsible user.

#### Service

- `getAllPetsService`: Contains the logic for validation and database queries to obtain all pets for the responsible user.

## 4. Technologies and Tools Used

- **Programming Language:** Node.js
- **Framework:** Express.js
- **Database:** SQL (likely using Sequelize ORM)
- **Authentication:** JWT for user authentication

### Main Dependencies

- `express`: API framework
- `jsonwebtoken`: For JWT creation and verification
- `sequelize`: ORM for SQL database interaction

## 5. Authentication and Security

- **JWT Authentication:** The microservice uses a JWT token to authenticate requests. The token is sent in the request headers as `Authorization: Bearer <JWT_TOKEN>`.
- **Route Security:** The `authenticateToken` middleware validates the JWT before allowing access to the endpoint and ensures only the responsible user can access their list of pets.

## 6. Setup and Running

### Prerequisites

- Node.js (v14 or higher)
- Database configured (SQL with Sequelize)

### Installation Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository_url>
   ```
2. **Navigate to the project directory:**
   ```bash
   cd get-all-pets
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Create a `.env` file** with the necessary variables (e.g., database credentials).

5. **Start the server:**
   ```bash
   node app.js
   ```

### Environment Variables

- `PORT`: API port (default: 4004)
- `DB_URL`: SQL database connection URL

### Port

The microservice runs by default on port 4004.

## 7. Swagger Documentation

To test the API endpoints interactively, access the Swagger documentation at:

```
http://localhost:4004/api-docs
```

## 8. Testing and Coverage

If automated tests exist, you can run them with:

```bash
npm test
```

## 9. Contributing

To contribute to the microservice:

1. Fork the repository.
2. Create a branch for your changes.
3. Make your changes and run the tests locally.
4. Submit a pull request with a clear description