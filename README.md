# 📝 Todo CRUD API (Node.js + Express + MySQL)

A simple and scalable RESTful API for managing Todos using **Node.js**, **Express.js**, and **MySQL**.
This project demonstrates clean architecture, proper API design, and production-ready practices.

---

## 🚀 Features

* **Create, Read, Update, Delete** (CRUD) Todos
* **MySQL** database integration
* **Timestamp** support (`created_at`, `updated_at`)
* **Input validation** middleware
* **Centralized error handling**
* **Partial updates** using `PATCH` (Specifically for status toggles)
* **Duplicate prevention** for Todo titles
* **Clean folder structure** following the MVC pattern

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MySQL
* dotenv
* mysql2

---

## 📂 Project Structure

```text
todo-crud-api-nodejs/
│
├── config/
│   └── db.js
├── controllers/
│   └── todoController.js
├── models/
│   └── Todo.js
├── routes/
│   └── todoRoutes.js
├── middleware/
│   ├── errorHandler.js
│   └── validateTodo.js
├── database.sql
├── server.js
├── package.json
└── .gitignore
```

---

## ⚙️ Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/sakthiram2004/todo-crud-api-nodejs.git
cd todo-crud-api-nodejs
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Setup MySQL Database

Open MySQL and run the script below to initialize your database:

```sql
CREATE DATABASE IF NOT EXISTS tododb;

USE tododb;

CREATE TABLE IF NOT EXISTS todos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

### 4. Configure Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=tododb
DB_PORT=3306
```

---

### 5. Run Server

Start the development server:

```bash
npm run dev
```

Server will run on:

```text
http://localhost:5000
```

---

## 📌 API Endpoints

**Base URL:**
```text
http://localhost:5000/todos
```

---

### 1️⃣ Create Todo

`POST /todos`

**Request Body:**
```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread"
}
```

---

### 2️⃣ Get All Todos

`GET /todos`

---

### 3️⃣ Get Todo by ID

`GET /todos/:id`

---

### 4️⃣ Update Todo (Full Update)

`PUT /todos/:id`

**Request Body:**
```json
{
  "title": "Updated title",
  "description": "Updated description",
  "completed": true
}
```

---

### 5️⃣ Update Todo Status (PATCH) ✅

`PATCH /todos/:id/status`

**Request Body:**
```json
{
  "completed": true
}
```

**Description:**
* Updates only the **completion status**
* Efficient for frontend toggle actions

---

### 6️⃣ Delete Todo

`DELETE /todos/:id`

---


## ❗ Error Handling

* Proper HTTP status codes 
* Validation for required fields
* Centralized error middleware gracefully catching exceptions


## ⭐ Conclusion

This project demonstrates:

* REST API design
* Clean code practices
* Database integration
* Production-ready structure
