# To-Do List REST API

A RESTful API for managing a to-do list, built with TypeScript and Express.js. This API implements HATEOAS (Hypermedia as the Engine of Application State) principles.

## Features

- ✅ Full CRUD operations for tasks
- ✅ RESTful endpoint naming conventions
- ✅ HATEOAS links in all responses
- ✅ JSON response format
- ✅ Proper HTTP status codes
- ✅ Error handling

## Installation

1. Install dependencies:

```bash
npm install
```

2. Build the TypeScript project:

```bash
npm run build
```

## Running the API

### Development mode (with ts-node):

```bash
npm run dev
```

### Production mode:

```bash
npm start
```

The API will be available at `http://localhost:3000`

## API Endpoints

| Method | Endpoint     | Description                    |
| ------ | ------------ | ------------------------------ |
| GET    | `/tasks`     | Retrieve all tasks             |
| GET    | `/tasks/:id` | Retrieve a specific task by ID |
| POST   | `/tasks`     | Create a new task              |
| PUT    | `/tasks/:id` | Update a task by ID            |
| DELETE | `/tasks/:id` | Delete a task by ID            |

## Request/Response Examples

### GET /tasks - Retrieve all tasks

**Response (200 OK):**

```json
{
  "tasks": [
    {
      "id": 1,
      "task": "Learn REST APIs",
      "done": false,
      "_links": {
        "self": { "href": "http://localhost:3000/tasks/1", "method": "GET" },
        "update": { "href": "http://localhost:3000/tasks/1", "method": "PUT" },
        "delete": { "href": "http://localhost:3000/tasks/1", "method": "DELETE" },
        "all": { "href": "http://localhost:3000/tasks", "method": "GET" }
      }
    }
  ],
  "count": 4,
  "_links": {
    "self": { "href": "http://localhost:3000/tasks", "method": "GET" },
    "create": { "href": "http://localhost:3000/tasks", "method": "POST" }
  }
}
```

### GET /tasks/:id - Retrieve a task by ID

**Response (200 OK):**

```json
{
  "id": 1,
  "task": "Learn REST APIs",
  "done": false,
  "_links": {
    "self": { "href": "http://localhost:3000/tasks/1", "method": "GET" },
    "update": { "href": "http://localhost:3000/tasks/1", "method": "PUT" },
    "delete": { "href": "http://localhost:3000/tasks/1", "method": "DELETE" },
    "all": { "href": "http://localhost:3000/tasks", "method": "GET" }
  }
}
```

**Response (404 Not Found):**

```json
{
  "error": "Task not found",
  "message": "Task with ID 99 does not exist"
}
```

### POST /tasks - Create a new task

**Request Body:**

```json
{
  "task": "Deploy the API",
  "done": false
}
```

**Response (201 Created):**

```json
{
  "id": 5,
  "task": "Deploy the API",
  "done": false,
  "_links": {
    "self": { "href": "http://localhost:3000/tasks/5", "method": "GET" },
    "update": { "href": "http://localhost:3000/tasks/5", "method": "PUT" },
    "delete": { "href": "http://localhost:3000/tasks/5", "method": "DELETE" },
    "all": { "href": "http://localhost:3000/tasks", "method": "GET" }
  }
}
```

### PUT /tasks/:id - Update a task

**Request Body:**

```json
{
  "task": "Learn REST APIs thoroughly",
  "done": true
}
```

**Response (200 OK):**

```json
{
  "id": 1,
  "task": "Learn REST APIs thoroughly",
  "done": true,
  "_links": {
    "self": { "href": "http://localhost:3000/tasks/1", "method": "GET" },
    "update": { "href": "http://localhost:3000/tasks/1", "method": "PUT" },
    "delete": { "href": "http://localhost:3000/tasks/1", "method": "DELETE" },
    "all": { "href": "http://localhost:3000/tasks", "method": "GET" }
  }
}
```

### DELETE /tasks/:id - Delete a task

**Response (200 OK):**

```json
{
  "message": "Task successfully deleted",
  "task": {
    "id": 1,
    "task": "Learn REST APIs",
    "done": false
  },
  "_links": {
    "self": { "href": "http://localhost:3000/tasks", "method": "GET" },
    "create": { "href": "http://localhost:3000/tasks", "method": "POST" }
  }
}
```

## HATEOAS Implementation

This API implements HATEOAS by including `_links` objects in all responses. These links provide:

- **self**: Link to the current resource
- **update**: Link to update the resource
- **delete**: Link to delete the resource
- **all**: Link to view all tasks
- **create**: Link to create a new task (in collection responses)

Clients can navigate the API using these links without hardcoding URLs.

## Testing with Postman

A Postman collection file (`postman_collection.json`) is included in the project. Import it into Postman to test all endpoints.

### Import Instructions:

1. Open Postman
2. Click "Import" button
3. Select the `postman_collection.json` file
4. The collection will appear in your Postman workspace

## Technologies Used

- **TypeScript**: For type-safe code
- **Express.js**: Web framework for Node.js
- **Node.js**: Runtime environment

## REST Best Practices Implemented

- ✅ Resource-based URLs (`/tasks`, `/tasks/:id`)
- ✅ HTTP methods for actions (GET, POST, PUT, DELETE)
- ✅ Proper HTTP status codes (200, 201, 404, 400)
- ✅ JSON response format
- ✅ HATEOAS for API discoverability
- ✅ Stateless operations
