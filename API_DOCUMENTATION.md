# API Documentation - Sistem Autentikasi JWT

## Overview
API ini menggunakan sistem autentikasi JWT (JSON Web Token) dengan fitur:
- Register user baru
- Login user
- Logout user
- Refresh token
- Middleware autentikasi untuk melindungi endpoint
- Token expiration (15 menit untuk access token, 7 hari untuk refresh token)

## Base URL
```
http://localhost:3000/api
```

## Endpoints

### 1. Autentikasi (Tidak memerlukan token)

#### Register User Baru
```http
POST /api/auth/register
```

**Request Body:**
```json
{
  "username": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "tanggalLahir": "1990-01-01",
  "sudahLulus": false,
  "skorKeseluruhan": 0
}
```

**Response Success (201):**
```json
{
  "success": true,
  "message": "Registrasi berhasil",
  "data": {
    "user": {
      "id": 3,
      "username": "John Doe",
      "email": "john@example.com",
      "tanggalLahir": "1990-01-01",
      "sudahLulus": false,
      "skorKeseluruhan": 0
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Login User
```http
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "userpertama@elearning.com",
  "password": "password123"
}
```

**Response Success (200):**
```json
{
  "success": true,
  "message": "Login berhasil",
  "data": {
    "user": {
      "id": 1,
      "username": "User Pertama",
      "email": "userpertama@elearning.com",
      "tanggalLahir": "2005-01-01",
      "sudahLulus": false,
      "skorKeseluruhan": 90
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Logout User
```http
POST /api/auth/logout/:userId
```

**Response Success (200):**
```json
{
  "success": true,
  "message": "Logout berhasil"
}
```

#### Refresh Token
```http
POST /api/auth/refresh-token
```

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response Success (200):**
```json
{
  "success": true,
  "message": "Token berhasil di-refresh",
  "data": {
    "user": {
      "id": 1,
      "username": "User Pertama",
      "email": "userpertama@elearning.com",
      "tanggalLahir": "2005-01-01",
      "sudahLulus": false,
      "skorKeseluruhan": 90
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 2. User Management (Memerlukan token)

Semua endpoint user memerlukan header Authorization dengan Bearer token:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Get All Users
```http
GET /api/users
```

**Response Success (200):**
```json
{
  "statusCode": 200,
  "message": "Sukses mendapatkan user!",
  "data": [
    {
      "id": 1,
      "username": "User Pertama",
      "email": "userpertama@elearning.com",
      "password": "$2a$10$...",
      "tanggalLahir": "2005-01-01",
      "sudahLulus": false,
      "skorKeseluruhan": 90
    }
  ],
  "currentUser": {
    "userId": 1,
    "email": "userpertama@elearning.com"
  }
}
```

#### Get User by ID
```http
GET /api/users/:id
```

#### Create User
```http
POST /api/users
```

**Request Body:**
```json
{
  "username": "New User",
  "email": "newuser@example.com",
  "password": "password123",
  "tanggalLahir": "1995-01-01",
  "sudahLulus": false,
  "skorKeseluruhan": 0
}
```

#### Update User
```http
PATCH /api/users/:id
```

**Request Body:**
```json
{
  "username": "Updated User",
  "email": "updated@example.com",
  "tanggalLahir": "1995-01-01",
  "sudahLulus": true,
  "skorKeseluruhan": 95
}
```

#### Delete User
```http
DELETE /api/users/:id
```

#### Get User Count
```http
GET /api/users/count
```

## Error Responses

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Access token diperlukan"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Access token tidak valid atau sudah expired"
}
```

### 400 Bad Request
```json
{
  "success": false,
  "message": "Username, email, dan password diperlukan"
}
```

## Token Management

### Access Token
- **Expiry**: 15 menit
- **Usage**: Untuk mengakses endpoint yang memerlukan autentikasi
- **Header**: `Authorization: Bearer <token>`

### Refresh Token
- **Expiry**: 7 hari
- **Usage**: Untuk mendapatkan access token baru
- **Storage**: Disimpan di database/file JSON

## Data Storage

Sistem ini menggunakan data lokal dengan:
- **Initial Data**: Dari `src/data/users.ts`
- **Persistent Storage**: File JSON (`src/data/users.json`)
- **Password Hashing**: Menggunakan bcryptjs
- **Token Storage**: Refresh token disimpan di data user

## Default Users

Sistem memiliki 2 user default dengan password `password123`:

1. **User Pertama**
   - Email: userpertama@elearning.com
   - Password: password123

2. **User Kedua**
   - Email: userkedua@elearning.com
   - Password: password123

## Cara Penggunaan

1. **Register** user baru atau **Login** dengan user default
2. **Simpan** access token dan refresh token dari response
3. **Gunakan** access token di header Authorization untuk mengakses endpoint user
4. **Refresh** token ketika access token expired
5. **Logout** untuk menghapus refresh token

## Keamanan

- Password di-hash menggunakan bcryptjs
- Access token expired dalam 15 menit
- Refresh token expired dalam 7 hari
- Token disimpan secara aman di data user
- Middleware autentikasi melindungi semua endpoint user 