# Project E-Learning Day 3

## Deskripsi
Project e-learning dengan sistem autentikasi, manajemen user, course, dan enrollment menggunakan **PostgreSQL** sebagai database.

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

## Teknologi yang Digunakan

- **Backend**: Node.js + Express + TypeScript
- **Database**: PostgreSQL
- **Authentication**: JWT + bcrypt
- **Architecture**: Repository Pattern + Service Layer

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

## Setup dan Instalasi

### Prerequisites
1. **PostgreSQL** - Pastikan PostgreSQL sudah terinstall
2. **Node.js** - Pastikan Node.js dan npm sudah terinstall

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Database
```bash
# Buat database PostgreSQL
psql -U postgres
CREATE DATABASE elearning_db;
\q

# Buat file .env dengan konfigurasi database
# Lihat DATABASE_SETUP.md untuk detail
```

### 3. Jalankan Migrations
```bash
npm run db:migrate
```

### 4. Jalankan Seeders
```bash
npm run db:seed
```

### 5. Jalankan Server
```bash
npm run dev
```

Server akan berjalan di `http://localhost:3000`

## Database Commands

```bash
# Reset database (hapus semua data)
npm run db:reset

# Jalankan migrations
npm run db:migrate

# Jalankan seeders
npm run db:seed
```

## Struktur Project

```
src/
├── controllers/          # HTTP controllers
├── database/            # Database configuration & migrations
│   ├── config.ts        # Database connection
│   ├── migrations/      # Database migrations
│   └── seeders/         # Database seeders
├── interfaces/          # TypeScript interfaces
├── middlewares/         # Express middlewares
├── models/              # Data models
├── repositories/        # Data access layer
├── routes/              # API routes
├── services/            # Business logic layer
└── types/               # TypeScript type definitions
```

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

## Dokumentasi Lebih Lanjut

- **Database Setup**: Lihat [DATABASE_SETUP.md](./DATABASE_SETUP.md)
- **API Documentation**: Lihat [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- **Role Based Access Control**: Lihat [ROLE_BASED_ACCESS_CONTROL.md](./ROLE_BASED_ACCESS_CONTROL.md)
- **Service Repository Pattern**: Lihat [SERVICE_REPOSITORY_PATTERN.md](./SERVICE_REPOSITORY_PATTERN.md)

## Development

### Menambah Migration Baru
1. Buat file baru di `src/database/migrations/`
2. Export fungsi `up()` dan `down()`
3. Tambahkan ke `src/database/migrations/index.ts`
4. Jalankan `npm run db:migrate`

### Menambah Seeder Baru
1. Buat file baru di `src/database/seeders/`
2. Export fungsi seeder
3. Tambahkan ke `src/database/seeders/index.ts`
4. Jalankan `npm run db:seed`
