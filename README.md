# E-Learning Platform API

A comprehensive e-learning platform backend API built with Node.js, Express, and TypeScript. This project provides a robust foundation for managing users, courses, and enrollments with role-based access control.

## 🚀 Features

### 🔐 Authentication & Authorization
- JWT-based authentication system
- Role-based access control (Admin/Student)
- Secure password hashing with bcrypt
- Protected API endpoints

### 👥 User Management
- User registration and login
- Profile management
- Role-based permissions
- Student progress tracking

### 📚 Course Management
- Create, read, update, and delete courses
- Course status management (active/inactive)
- Instructor assignment
- Duration and pricing configuration

### 🎓 Enrollment System
- Course enrollment management
- Progress tracking (0-100%)
- Score recording
- Status management (pending/approved/rejected/completed)

## 🛠️ Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **Authentication**: JWT + bcrypt
- **Architecture**: Repository Pattern + Service Layer
- **Development**: Nodemon for hot reloading

## 📁 Project Structure

```
src/
├── controllers/          # HTTP request handlers
├── database/            # Database configuration & migrations
│   ├── config.ts        # Database connection settings
│   ├── migrations/      # Database schema migrations
│   └── seeders/         # Sample data population
├── interfaces/          # TypeScript interfaces
├── middlewares/         # Express middlewares
├── models/              # Data models
├── repositories/        # Data access layer
├── routes/              # API route definitions
├── services/            # Business logic layer
└── types/               # TypeScript type definitions
```

## 🗄️ Database Schema

### Users Table
- `id`: Primary key
- `name`: User's full name
- `email`: Unique email address
- `password`: Hashed password
- `tanggalLahir`: Date of birth
- `sudahLulus`: Graduation status
- `skorKeseluruhan`: Overall score
- `role`: User role (admin/student)

### Courses Table
- `id`: Primary key
- `title`: Course title
- `description`: Course description
- `instructor`: Instructor name
- `duration`: Course duration in minutes
- `price`: Course price
- `status`: Course status (active/inactive)
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

### Enrollments Table
- `id`: Primary key
- `userId`: Foreign key to users table
- `courseId`: Foreign key to courses table
- `status`: Enrollment status
- `enrolledAt`: Enrollment timestamp
- `completedAt`: Completion timestamp (optional)
- `progress`: Progress percentage (0-100)
- `score`: Final score (0-100, optional)

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID
- `PATCH /api/users` - Update user profile
- `DELETE /api/users/:id` - Delete user (admin only)

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID
- `POST /api/courses` - Create new course (admin only)
- `PATCH /api/courses/:id` - Update course (admin only)
- `DELETE /api/courses/:id` - Delete course (admin only)

### Enrollments
- `GET /api/enrollments` - Get all enrollments (admin only)
- `GET /api/enrollments/:id` - Get enrollment by ID
- `GET /api/enrollments/user/:userId` - Get user enrollments
- `POST /api/enrollments` - Create new enrollment
- `PATCH /api/enrollments/:id` - Update enrollment (admin only)
- `DELETE /api/enrollments/:id` - Delete enrollment

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd project-elearning
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=elearning_db
   DB_USER=your_username
   DB_PASSWORD=your_password
   JWT_SECRET=your_jwt_secret
   PORT=3000
   ```

4. **Set up the database**
   ```bash
   # Create database
   createdb elearning_db
   
   # Run migrations
   npm run db:migrate
   
   # Seed with sample data
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:3000`

## 📚 Available Scripts

- `npm run dev` - Start development server with nodemon
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database with sample data
- `npm run db:reset` - Reset database (clear all data)

## 🔒 Security Features

- **Password Hashing**: All passwords are hashed using bcrypt
- **JWT Authentication**: Secure token-based authentication
- **Role-Based Access Control**: Different permissions for admin and student users
- **Input Validation**: Request data validation and sanitization
- **Protected Routes**: Middleware-based route protection

## 🧪 Testing

The project includes sample data and endpoints for testing:

- **Admin User**: `admin@elearning.com` / `admin123`
- **Student User**: `student@elearning.com` / `student123`
- **Sample Courses**: Pre-populated with various course examples
- **Sample Enrollments**: Demonstrates the enrollment workflow

## 📖 API Documentation

For detailed API documentation, see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with Express.js and TypeScript
- Database management with PostgreSQL
- Authentication powered by JWT and bcrypt
- Architecture following Repository and Service patterns
