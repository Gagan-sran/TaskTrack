# API Testing Guide

## Testing with Thunder Client (VS Code)

### 1. Install Thunder Client
- Open VS Code
- Go to Extensions (Ctrl+Shift+X)
- Search for "Thunder Client"
- Install it
- Click the Thunder Client icon in the sidebar

### 2. Create a New Collection
- Click "Collections"
- Click "New Collection"
- Name it "TaskTrack API"

## Test Endpoints

### Test 1: Check API is Running
**GET** `https://tasktrack-gm4r.onrender.com/`

Expected Response (200):
```json
{
  "message": "TaskTrack API",
  "version": "1.0.0",
  "status": "Running",
  "endpoints": {
    "users": {
      "register": "POST /api/users/register",
      "login": "POST /api/users/login"
    },
    "tasks": {
      "getAll": "GET /api/tasks",
      "getOne": "GET /api/tasks/:id",
      "create": "POST /api/tasks",
      "update": "PUT /api/tasks/:id",
      "delete": "DELETE /api/tasks/:id"
    },
    "categories": {
      "getAll": "GET /api/categories",
      "create": "POST /api/categories",
      "delete": "DELETE /api/categories/:id"
    }
  }
}
```

---

### Test 2: Register a New User
**POST** `https://tasktrack-gm4r.onrender.com/api/users/register`

Headers:
```
Content-Type: application/json
```

Body (JSON):
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

Expected Response (201):
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**⚠️ SAVE THE TOKEN!** You'll need it for authenticated requests.

---

### Test 3: Login
**POST** `https://tasktrack-gm4r.onrender.com/api/users/login`

Headers:
```
Content-Type: application/json
```

Body (JSON):
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Expected Response (200):
```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### Test 4: Create a Category (Protected)
**POST** `https://tasktrack-gm4r.onrender.com/api/categories`

Headers:
```
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN_HERE
```

Body (JSON):
```json
{
  "category_name": "Work"
}
```

Expected Response (201):
```json
{
  "message": "Category created successfully",
  "category": {
    "id": 1,
    "category_name": "Work",
    "user_id": 1,
    "created_at": "2026-02-07T..."
  }
}
```

---

### Test 5: Get All Categories (Protected)
**GET** `https://tasktrack-gm4r.onrender.com/api/categories`

Headers:
```
Authorization: Bearer YOUR_TOKEN_HERE
```

Expected Response (200):
```json
{
  "categories": [
    {
      "id": 1,
      "category_name": "Work",
      "user_id": 1,
      "created_at": "2026-02-07T..."
    }
  ],
  "count": 1
}
```

---

### Test 6: Create a Task (Protected)
**POST** `https://tasktrack-gm4r.onrender.com/api/tasks`

Headers:
```
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN_HERE
```

Body (JSON):
```json
{
  "title": "Complete Sprint 1",
  "description": "Finish all backend API endpoints",
  "due_date": "2026-02-10",
  "category_id": 1
}
```

Expected Response (201):
```json
{
  "message": "Task created successfully",
  "task": {
    "id": 1,
    "title": "Complete Sprint 1",
    "description": "Finish all backend API endpoints",
    "due_date": "2026-02-10",
    "status": "pending",
    "user_id": 1,
    "category_id": 1,
    "created_at": "2026-02-07T...",
    "updated_at": "2026-02-07T..."
  }
}
```

---

### Test 7: Get All Tasks (Protected)
**GET** `https://tasktrack-gm4r.onrender.com/api/tasks`

Headers:
```
Authorization: Bearer YOUR_TOKEN_HERE
```

Expected Response (200):
```json
{
  "tasks": [
    {
      "id": 1,
      "title": "Complete Sprint 1",
      "description": "Finish all backend API endpoints",
      "due_date": "2026-02-10",
      "status": "pending",
      "user_id": 1,
      "category_id": 1,
      "category_name": "Work",
      "created_at": "2026-02-07T...",
      "updated_at": "2026-02-07T..."
    }
  ],
  "count": 1
}
```

---

### Test 8: Get Single Task (Protected)
**GET** `https://tasktrack-gm4r.onrender.com/api/tasks/1`

Headers:
```
Authorization: Bearer YOUR_TOKEN_HERE
```

Expected Response (200):
```json
{
  "task": {
    "id": 1,
    "title": "Complete Sprint 1",
    "description": "Finish all backend API endpoints",
    "due_date": "2026-02-10",
    "status": "pending",
    "user_id": 1,
    "category_id": 1,
    "category_name": "Work",
    "created_at": "2026-02-07T...",
    "updated_at": "2026-02-07T..."
  }
}
```

---

### Test 9: Update Task (Protected)
**PUT** `https://tasktrack-gm4r.onrender.com/api/tasks/1`

Headers:
```
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN_HERE
```

Body (JSON):
```json
{
  "status": "completed"
}
```

Expected Response (200):
```json
{
  "message": "Task updated successfully",
  "task": {
    "id": 1,
    "title": "Complete Sprint 1",
    "description": "Finish all backend API endpoints",
    "due_date": "2026-02-10",
    "status": "completed",
    "user_id": 1,
    "category_id": 1,
    "created_at": "2026-02-07T...",
    "updated_at": "2026-02-07T..."
  }
}
```

---

### Test 10: Delete Task (Protected)
**DELETE** `https://tasktrack-gm4r.onrender.com/api/tasks/1`

Headers:
```
Authorization: Bearer YOUR_TOKEN_HERE
```

Expected Response (200):
```json
{
  "message": "Task deleted successfully",
  "task": {
    "id": 1,
    "title": "Complete Sprint 1",
    "description": "Finish all backend API endpoints",
    "due_date": "2026-02-10",
    "status": "completed",
    "user_id": 1,
    "category_id": 1,
    "created_at": "2026-02-07T...",
    "updated_at": "2026-02-07T..."
  }
}
```

---

### Test 11: Delete Category (Protected)
**DELETE** `https://tasktrack-gm4r.onrender.com/api/categories/1`

Headers:
```
Authorization: Bearer YOUR_TOKEN_HERE
```

Expected Response (200):
```json
{
  "message": "Category deleted successfully",
  "category": {
    "id": 1,
    "category_name": "Work",
    "user_id": 1,
    "created_at": "2026-02-07T..."
  }
}
```

---

## Error Testing

### Test 12: Register with Existing Email
**POST** `https://tasktrack-gm4r.onrender.com/api/users/register`

Body:
```json
{
  "name": "Jane Doe",
  "email": "john@example.com",
  "password": "password456"
}
```

Expected Response (400):
```json
{
  "error": "User already exists with this email"
}
```

---

### Test 13: Login with Wrong Password
**POST** `https://tasktrack-gm4r.onrender.com/api/users/login`

Body:
```json
{
  "email": "john@example.com",
  "password": "wrongpassword"
}
```

Expected Response (401):
```json
{
  "error": "Invalid credentials"
}
```

---

### Test 14: Access Protected Route Without Token
**GET** `https://tasktrack-gm4r.onrender.com/api/tasks`

Headers: (No Authorization header)

Expected Response (401):
```json
{
  "error": "No token, authorization denied"
}
```

---

### Test 15: Create Task Without Title
**POST** `https://tasktrack-gm4r.onrender.com/api/tasks`

Headers:
```
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN_HERE
```

Body:
```json
{
  "description": "This task has no title"
}
```

Expected Response (400):
```json
{
  "error": "Task title is required"
}
```

---

## Testing Checklist for Sprint 1 Demo

✅ Server starts without errors  
✅ Root endpoint returns API information  
✅ User can register successfully  
✅ User can login successfully  
✅ JWT token is generated  
✅ User can create categories  
✅ User can view their categories  
✅ User can create tasks  
✅ User can view all tasks  
✅ User can view single task  
✅ User can update task status  
✅ User can delete tasks  
✅ Protected routes require authentication  
✅ Invalid credentials are rejected  
✅ Category is linked to tasks correctly  

---

## cURL Commands (Alternative)

If you prefer command line testing:

### Register
```bash
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

### Login
```bash
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### Create Task (replace TOKEN)
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"title":"Test Task","description":"Testing","due_date":"2026-02-10","category_id":1}'
```

### Get All Tasks (replace TOKEN)
```bash
curl -X GET http://localhost:3000/api/tasks \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Notes for Sprint 1 Review

During your live demo, the instructor may ask you to:

1. **Show your running code** - Have the server running
2. **Demonstrate CRUD operations** - Create, Read, Update, Delete a task
3. **Explain authentication** - Show where JWT is used
4. **Navigate the code** - Find specific routes or middleware
5. **Answer technical questions** - Explain how your database schema works

**Pro Tips:**
- Keep Postman/Thunder Client open with saved requests
- Have some test data already created
- Know where your route definitions are
- Understand the flow: Client → Route → Middleware → Database
