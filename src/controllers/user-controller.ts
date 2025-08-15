import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../types/authenticated-request-type';
import { UserService } from '../services/user-service';
import * as filesystem from '../utilities/filesystem';
import { UserRepository } from '../repositories/user-repository';

// Create instances directly
const userRepository = new UserRepository();
const userService = new UserService(userRepository);

// mendapatkan list users
export const index = async (req: Request, res: Response) => {
  try {
    const userData = await userService.getAllUsers();

    if (!userData || userData.length === 0) {
      return res.status(404).json({
        statusCode: 404,
        message: 'Data user kosong!',
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: 'Sukses mendapatkan user!',
      data: userData,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Error internal server!',
    });
  }
};

// update user
export const update = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({
      statusCode: 401,
      message: 'User tidak terautentikasi!',
    });
  }

  const userId = req.user.id;
  const input = req.body;
  const file = (req as any).file as Express.Multer.File | undefined;

  try {
    // cek apakah user ada
    const user = await userService.getUserById(userId, userId, req.user.role || 'student');
    if (!user) {
      return res.status(404).json({
        statusCode: 404,
        message: 'User tidak ditemukan!',
      });
    }

    // If avatar provided, upload and set path
    if (file) {
      try {
        if ((user as any).avatar) {
          await (filesystem as any).remove((user as any).avatar);
        }
        const avatarPath = await (filesystem as any).upload(file, 'avatars');
        (input as any).avatar = avatarPath;
      } catch (err: any) {
        return res.status(400).json({ statusCode: 400, message: `Gagal upload avatar: ${err.message}` });
      }
    }

    // update data user
    const updatedUser = await userService.updateUser(userId, input);

    return res.status(200).json({
      statusCode: 200,
      message: 'Berhasil update data user!',
      data: updatedUser,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Error internal server!',
    });
  }
};

// hapus user berdasarkan id nya
export const deleteById = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({
      statusCode: 401,
      message: 'User tidak terautentikasi!',
    });
  }

  const userId = parseInt(req.params.id);

  try {
    // cek apakah user ada
    const user = await userService.getUserById(userId, req.user.id, req.user.role || 'student');
    if (!user) {
      return res.status(404).json({
        statusCode: 404,
        message: 'User tidak ditemukan!',
      });
    }

    // hapus avatar jika ada
    try {
      if ((user as any).avatar) {
        await (filesystem as any).remove((user as any).avatar);
      }
    } catch (removeErr) {
      console.error('Gagal menghapus avatar user:', removeErr);
    }

    // hapus user
    const isDeleted = await userService.deleteUser(userId);

    if (!isDeleted) {
      return res.status(500).json({
        statusCode: 500,
        message: 'Gagal menghapus user!',
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: 'Berhasil hapus user!',
      data: user,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Error internal server!',
    });
  }
};

// create user baru (hanya admin)
export const create = async (req: AuthenticatedRequest, res: Response) => {
  const input = req.body;

  try {
    // validasi input
    if (!input.email || !input.password || !input.name) {
      return res.status(400).json({
        statusCode: 400,
        message: 'Email, password, dan name harus diisi!',
      });
    }

    // cek apakah email sudah terdaftar
    const existingUser = await userService.authenticateUser(input.email, input.password);
    if (existingUser) {
      return res.status(400).json({
        statusCode: 400,
        message: 'Email sudah terdaftar!',
      });
    }

    const newUser = await userService.createUser(input);

    return res.status(201).json({
      statusCode: 201,
      message: 'Berhasil membuat user baru!',
      data: newUser,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Error internal server!',
    });
  }
};

// dapatkan user berdasarkan id dengan authorization
export const getById = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({
      statusCode: 401,
      message: 'User tidak terautentikasi!',
    });
  }

  const userId = parseInt(req.params.id);
  const currentUserId = req.user.id;
  const currentUserRole = req.user.role || 'student';

  try {
    // cek apakah user ada dengan authorization
    const user = await userService.getUserById(userId, currentUserId, currentUserRole);
    
    if (!user) {
      return res.status(404).json({
        statusCode: 404,
        message: 'User tidak ditemukan atau tidak memiliki akses!',
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: 'Berhasil mendapatkan data user!',
      data: user,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Error internal server!',
    });
  }
};
