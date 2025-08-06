# Project Bootcamp E-Learning - Sistem Autentikasi JWT

Backend API dengan sistem autentikasi JWT untuk aplikasi e-learning.

## Fitur

- ✅ **Autentikasi JWT** dengan register, login, logout
- ✅ **Refresh Token** untuk memperpanjang sesi
- ✅ **Middleware Autentikasi** untuk melindungi endpoint
- ✅ **Token Expiration** (15 menit access token, 7 hari refresh token)
- ✅ **Password Hashing** menggunakan bcryptjs
- ✅ **Data Lokal** menggunakan file JSON dan TypeScript
- ✅ **CRUD User** dengan autentikasi wajib
- ✅ **TypeScript** untuk type safety

## Teknologi

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Data Storage**: Local JSON file
- **Development**: Nodemon

## Instalasi

1. **Clone repository**
```bash
git clone <repository-url>
cd project-bootcamp-elearning
```

2. **Install dependencies**
```bash
npm install
```

3. **Jalankan server development**
```bash
npm run dev
```

Server akan berjalan di `http://localhost:3000`

## Struktur Project

```
src/
├── controllers/
│   ├── auth-controller.ts    # Controller autentikasi
│   └── user-controller.ts    # Controller user management
├── data/
│   ├── users.ts             # Data awal user (TypeScript)
│   └── users.json           # Data persistent (JSON)
├── middleware/
│   └── auth-middleware.ts   # Middleware autentikasi
├── models/
│   └── user-model.ts        # Model user dengan CRUD
├── routes/
│   ├── auth-routes.ts       # Routes autentikasi
│   ├── user-routes.ts       # Routes user (protected)
│   └── index.ts             # Router utama
├── services/
│   ├── auth-service.ts      # Service autentikasi
│   └── user-service.ts      # Service user
└── server.ts                # Entry point
```

## API Endpoints

### Autentikasi (Tidak memerlukan token)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register user baru |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/logout/:userId` | Logout user |
| POST | `/api/auth/refresh-token` | Refresh access token |

### User Management (Memerlukan token)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get semua users |
| GET | `/api/users/:id` | Get user by ID |
| POST | `/api/users` | Create user baru |
| PATCH | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user |
| GET | `/api/users/count` | Get jumlah users |

## Cara Penggunaan

### 1. Register User Baru
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "tanggalLahir": "1990-01-01",
    "sudahLulus": false,
    "skorKeseluruhan": 0
  }'
```

### 2. Login dengan User Default
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "userpertama@elearning.com",
    "password": "password123"
  }'
```

### 3. Akses Endpoint dengan Token
```bash
curl -X GET http://localhost:3000/api/users \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### 4. Refresh Token
```bash
curl -X POST http://localhost:3000/api/auth/refresh-token \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "YOUR_REFRESH_TOKEN"
  }'
```

## Default Users

Sistem memiliki 2 user default:

1. **User Pertama**
   - Email: `userpertama@elearning.com`
   - Password: `password123`

2. **User Kedua**
   - Email: `userkedua@elearning.com`
   - Password: `password123`

## Keamanan

- **Password Hashing**: Menggunakan bcryptjs dengan salt rounds 10
- **JWT Secret**: Gunakan environment variable `JWT_SECRET` dan `JWT_REFRESH_SECRET` di production
- **Token Expiration**: 
  - Access Token: 15 menit
  - Refresh Token: 7 hari
- **Middleware Protection**: Semua endpoint user memerlukan autentikasi

## Data Storage

Sistem menggunakan data lokal dengan:

- **Initial Data**: Dari `src/data/users.ts` (TypeScript)
- **Persistent Storage**: File JSON (`src/data/users.json`)
- **Password Hashing**: Otomatis saat inisialisasi
- **Token Storage**: Refresh token disimpan di data user

## Development

```bash
# Development mode dengan nodemon
npm run dev

# Build TypeScript
npm run build

# Production mode
npm start
```

## Environment Variables

Untuk production, set environment variables:

```bash
JWT_SECRET=your-super-secret-jwt-key
JWT_REFRESH_SECRET=your-super-secret-refresh-key
```

## Dokumentasi Lengkap

Lihat [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) untuk dokumentasi API yang lengkap.

## Pertanyaan Umum

### Q: Apakah bisa menggunakan data lokal tanpa database?
**A: Ya!** Sistem ini dirancang untuk menggunakan data lokal dengan:
- File TypeScript untuk data awal
- File JSON untuk persistensi
- Semua fitur autentikasi tetap berfungsi

### Q: Bagaimana token expiration bekerja?
**A:** 
- Access token expired dalam 15 menit
- Refresh token expired dalam 7 hari
- Ketika access token expired, gunakan refresh token untuk mendapatkan token baru
- Jika refresh token expired, user harus login ulang

### Q: Apakah password tersimpan dengan aman?
**A: Ya!** Password di-hash menggunakan bcryptjs dengan salt rounds 10, sehingga tidak bisa dibaca dalam bentuk plain text.
