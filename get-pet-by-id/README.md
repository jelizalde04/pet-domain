# Get-Pet-By-Id Microservice

## 1. Service Overview

The `get-pet-by-id` microservice allows users to retrieve pet details by their ID, as long as the authenticated user is the pet's owner. This microservice ensures that only the responsible user can access their pet's information. The returned data includes both the pet's details and the owner's information.

### Purpose   

- Retrieve pet details by ID.
- Ensure only the pet's owner can access the information.
- Include both pet and owner data in the response.

### Interaction with Other Microservices

This microservice does not directly interact with other microservices, but it queries the database to obtain pet and owner details.

## 2. Routes and Endpoints

### 1. Get Pet Information by ID

- **Method:** `GET`
- **Route:** `/pets/{id}`
- **Description:** Retrieves complete information about a pet, including the owner's details, using the pet's ID.

#### Request Parameters

- `id`: Pet ID to query (UUID, route parameter).

#### Responses

- **200 OK:** If the pet is found, returns pet and owner information.
- **404 Not Found:** If the pet does not exist.
- **403 Forbidden:** If the user does not have permission to view the pet.
- **500 Internal Server Error:** If a server error occurs.

#### Example Request (cURL)

```bash
curl -X GET http://localhost:3003/pets/12345 \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

#### Example Response (200 OK)

```json
{
  "success": true,
  "data": {
    "id": "12345",
    "name": "Rex",
    "species": "Dog",
    "breed": "Labrador",
    "birthdate": "2020-05-01",
    "responsible": {
      "id": "67890",
      "name": "John Doe",
      "email": "johndoe@example.com"
    }
  }
}
```

#### Example Response (404 Not Found)

```json
{
  "success": false,
  "message": "Pet not found"
}
```

#### Example Response (403 Forbidden)

```json
{
  "success": false,
  "message": "You do not have permission to view this pet"
}
```

## 3. Service Workflow

### User Authentication

- The user must be authenticated via a JWT token, which is verified before allowing access to pet data.

### Pet Query

- The microservice receives a request with the pet ID.
- It verifies that the authenticated user is the pet's owner.
- If the user is the owner, the service returns the pet and owner data. Otherwise, it returns a 403 error.

### Data Retrieval

- The database is queried to obtain pet and owner details.
- If any query fails, the corresponding error is returned.

### System Components

#### Controller

- `getPetById`: Receives the request, validates the user, and retrieves pet and owner information.

#### Service

- `getPetByIdService`: Contains the logic for validation and database queries to obtain the pet and associated owner.

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

- **JWT Authentication:** The microservice uses JWT tokens to authenticate requests. The token is sent in the request headers as `Authorization: Bearer <JWT_TOKEN>`.
- **Route Security:** The `authenticateToken` middleware validates the JWT before allowing access to endpoints and ensures only the pet's owner can query their data.

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
   cd get-pet
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

- `PORT`: API port (default: 3003)
- `DB_URL`: SQL database connection URL

### Port

The microservice runs by default on port 3001.

## 7. Swagger Documentation

To test the API endpoints interactively, access the Swagger documentation at:

```
http://localhost:3003/api-docs
```

## 8. Testing and Coverage

If automated tests exist, you can run them with:

```bash
npm test
```