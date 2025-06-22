# 📚 Book Library API

A professional Book Library REST API built with **Express**, **TypeScript**, **Mongoose**, and **MongoDB**, following the **MVC architecture**.

This project allows managing books and borrow records with features like filtering, sorting, book borrowing, and automatic cleanup using Mongoose middleware.

---

## 🚀 Features

- Create, Read, Update, Delete (CRUD) for books
- Borrow books with business validation
- Auto-update availability based on stock
- Aggregated borrow summary
- Cascade delete for borrow records when a book is deleted
- Built with scalability and clean architecture in mind (MVC Pattern)

---

## 🛠️ Technologies

- **Node.js**
- **Express.js**
- **MongoDB** with **Mongoose**
- **TypeScript**
- **Dotenv** for environment variables

---

## 📂 Project Structure (MVC)

```

src
|── app/
|   ├── controllers/ # Route / controller logic
|   ├── models/ # Mongoose schemas
|   ├── interfaces/ # TypeScript interfaces
├── app.ts # Express app config
├── server.ts # Entry point

```

---

## 🧑‍💻 Getting Started

### 1. Clone the Repository

```bash
git clone git@github.com:sheikhmuhammadantor/next-level-5-assignment-3.git
cd next-level-5-assignment-3
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment

Create a `.env` file in the root directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_uri
```

### 4. Start the Server

#### Development (with nodemon):

```bash
npm run dev
```

#### Production:

```bash
npm run build
npm start
```

---

## 🔗 API Endpoints

### ✅ Create a Book

**POST** `/api/books`

```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}
```

---

### 📚 Get All Books (with Filtering & Sorting)

**GET** `/api/books?filter=SCIENCE&sortBy=createdAt&sort=desc&limit=5`

---

### 🔍 Get Book by ID

**GET** `/api/books/:bookId`

---

### ✏️ Update Book

**PUT** `/api/books/:bookId`

```json
{
  "copies": 50
}
```

---

### ❌ Delete Book

**DELETE** `/api/books/:bookId`

> Borrow records related to this book are also deleted automatically via Mongoose middleware.

---

### 🔄 Borrow a Book

**POST** `/api/borrow`

```json
{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

---

### 📊 Borrowed Books Summary

**GET** `/api/borrow`

Returns total borrowed quantity per book with title and ISBN.

---

## ✅ Author

Made with 💚 by [Antor](https://github.com/sheikhmuhammadantor)
