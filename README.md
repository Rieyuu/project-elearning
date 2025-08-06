# Project E-Learning Day 3

## Deskripsi
Project e-learning dengan sistem autentikasi, manajemen user, course, dan enrollment.

## Fitur yang Tersedia

### 1. Authentication
- Login user
- Register user baru

### 2. User Management
- GET `/api/users` - Mendapatkan semua user (admin only)
- GET `/api/users/:id` - Mendapatkan user berdasarkan ID (admin bisa akses semua, student hanya data diri sendiri)
- PATCH `/api/users` - Update data user (user yang sudah login)
- DELETE `/api/users/:id` - Hapus user berdasarkan ID (admin only)

### 3. Course Management
- GET `/api/courses` - Mendapatkan semua course (bisa diakses semua user)
- GET `/api/courses/:id` - Mendapatkan course berdasarkan ID (bisa diakses semua user)
- POST `/api/courses` - Membuat course baru (admin only)
- PATCH `/api/courses/:id` - Update course berdasarkan ID (admin only)
- DELETE `/api/courses/:id` - Hapus course berdasarkan ID (admin only)

### 4. Enrollment System
- GET `/api/enrollments` - Mendapatkan semua enrollment (admin only)
- GET `/api/enrollments/:id` - Mendapatkan enrollment berdasarkan ID (dengan authorization)
- GET `/api/enrollments/user/:userId` - Mendapatkan enrollment berdasarkan user ID (dengan authorization)
- POST `/api/enrollments` - Membuat enrollment baru (user yang sudah login)
- PATCH `/api/enrollments/:id` - Update enrollment berdasarkan ID (admin only)
- DELETE `/api/enrollments/:id` - Hapus enrollment berdasarkan ID (dengan authorization)

## Struktur Data

### User
```typescript
{
  id: number;
  name: string;
  email: string;
  password: string;
  tanggalLahir: Date;
  sudahLulus: boolean;
  skorKeseluruhan: number;
  role: 'admin' | 'student';
}
```

### Course
```typescript
{
  id: number;
  title: string;
  description: string;
  instructor: string;
  duration: number; // dalam menit
  price: number;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}
```

### Enrollment
```typescript
{
  id: number;
  userId: number;
  courseId: number;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  enrolledAt: Date;
  completedAt?: Date;
  progress: number; // 0-100
  score?: number; // 0-100
}
```

## Authorization Rules

### User Endpoints
- **GET /api/users** - Hanya admin
- **GET /api/users/:id** - Admin bisa akses semua, student hanya data diri sendiri
- **PATCH /api/users** - User yang sudah login
- **DELETE /api/users/:id** - Hanya admin

### Course Endpoints
- **GET /api/courses** - Semua user
- **GET /api/courses/:id** - Semua user
- **POST /api/courses** - Hanya admin
- **PATCH /api/courses/:id** - Hanya admin
- **DELETE /api/courses/:id** - Hanya admin

### Enrollment Endpoints
- **GET /api/enrollments** - Hanya admin
- **GET /api/enrollments/:id** - Admin bisa akses semua, student hanya enrollment sendiri
- **GET /api/enrollments/user/:userId** - Admin bisa akses semua, student hanya enrollment sendiri
- **POST /api/enrollments** - User yang sudah login
- **PATCH /api/enrollments/:id** - Hanya admin
- **DELETE /api/enrollments/:id** - Admin bisa hapus semua, student hanya enrollment sendiri

## Cara Menjalankan

1. Install dependencies:
```bash
npm install
```

2. Jalankan server:
```bash
npm run dev
```

3. Server akan berjalan di `http://localhost:3000`

## Contoh Penggunaan

### Login
```bash
POST /api/auth/login
{
  "email": "userpertama@elearning.com",
  "password": "password123"
}
```

### Mendapatkan Course
```bash
GET /api/courses
```

### Enroll ke Course
```bash
POST /api/enrollments
{
  "courseId": 1
}
```

### Mendapatkan Enrollment User
```bash
GET /api/enrollments/user/2
```
