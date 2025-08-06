import { Request, Response } from 'express';
import * as userService from '../services/user-service';
import { AuthenticatedRequest } from '../middleware/auth-middleware';

// GET - Mendapatkan semua users
export const index = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userData = await userService.getUsers();

    return res.status(200).json({
      statusCode: 200,
      message: 'Sukses mendapatkan user!',
      data: userData,
      currentUser: req.user
    });
  } catch (error: any) {
    console.error('Error getting users:', error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// GET - Mendapatkan user by ID
export const show = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({
        statusCode: 400,
        message: 'ID harus berupa angka!',
      });
    }

    const user = await userService.getUserById(id);
    
    if (!user) {
      return res.status(404).json({
        statusCode: 404,
        message: 'User tidak ditemukan!',
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: 'Sukses mendapatkan user!',
      data: user,
      currentUser: req.user
    });
  } catch (error: any) {
    console.error('Error getting user:', error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// POST - Membuat user baru
export const store = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { username, email, password, tanggalLahir, sudahLulus, skorKeseluruhan } = req.body;

    // Validasi input
    if (!username || !email || !password || !tanggalLahir) {
      return res.status(400).json({
        statusCode: 400,
        message: 'Username, email, password, dan tanggal lahir harus diisi!',
      });
    }

    const newUser = await userService.createUser({
      username,
      email,
      password,
      tanggalLahir,
      sudahLulus: sudahLulus || false,
      skorKeseluruhan: skorKeseluruhan || 0,
    });

    return res.status(201).json({
      statusCode: 201,
      message: 'User berhasil dibuat!',
      data: newUser,
      currentUser: req.user
    });
  } catch (error: any) {
    console.error('Error creating user:', error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// PUT - Update user existing
export const update = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({
        statusCode: 400,
        message: 'ID harus berupa angka!',
      });
    }

    const { username, email, tanggalLahir, sudahLulus, skorKeseluruhan } = req.body;

    const updatedUser = await userService.updateUser(id, {
      username,
      email,
      tanggalLahir,
      sudahLulus,
      skorKeseluruhan,
    });

    if (!updatedUser) {
      return res.status(404).json({
        statusCode: 404,
        message: 'User tidak ditemukan!',
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: 'User berhasil diupdate!',
      data: updatedUser,
      currentUser: req.user
    });
  } catch (error: any) {
    console.error('Error updating user:', error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// DELETE - Hapus user
export const destroy = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({
        statusCode: 400,
        message: 'ID harus berupa angka!',
      });
    }

    const isDeleted = await userService.deleteUser(id);

    if (!isDeleted) {
      return res.status(404).json({
        statusCode: 404,
        message: 'User tidak ditemukan!',
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: 'User berhasil dihapus!',
      currentUser: req.user
    });
  } catch (error: any) {
    console.error('Error deleting user:', error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// GET - Jumlah users
export const count = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userCount = await userService.getUsersCount();

    return res.status(200).json({
      statusCode: 200,
      message: 'Sukses mendapatkan jumlah user!',
      data: {
        totalUsers: userCount
      },
      currentUser: req.user
    });
  } catch (error: any) {
    console.error('Error getting user count:', error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Internal server error',
      error: error.message
    });
  }
};
