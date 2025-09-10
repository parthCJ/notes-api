# Notes API

A RESTful API for managing personal notes with user authentication, built with Node.js, Express, and MongoDB.

## Features

- User registration and authentication (JWT-based)
- Secure password hashing with bcrypt
- CRUD operations for notes
- User-specific note management
- Input validation and error handling
- Search functionality
- Pagination support
- MongoDB integration with Mongoose

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd notes-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
NODE_ENV=development
PORT=3000
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
MONGODB_URI=mongodb://localhost:27017/notes-api
```

4. Make sure MongoDB is running:
   - **Local MongoDB**: Start your MongoDB service
   - **MongoDB Atlas**: Update the `MONGODB_URI` with your Atlas connection string

5. Start the server:
```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The API will be available at `http://localhost:3000`

API endpoints:

<pre> ```csv POST,/api/auth/register,AuthRequired(❌),Register new user POST,/api/auth/login,AuthRequired(❌),Login user GET,/api/auth/profile,AuthRequired(✅),Get user profile POST,/api/notes,AuthRequired(✅),Create note GET,/api/notes,AuthRequired(✅),Get all notes (paginated/searchable) GET,/api/notes/:id,AuthRequired(✅),Get single note PUT,/api/notes/:id,AuthRequired(✅),Update note DELETE,/api/notes/:id,AuthRequired(✅),Delete note GET,/api/health,AuthRequired(❌),Health check ``` </pre>



