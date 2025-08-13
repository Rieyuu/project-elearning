import { Request, Response } from 'express';
import { AuthService } from '../services/auth-service';
import { UserService } from '../services/user-service';
import { UserRepository } from '../repositories/user-repository';

// Create instances directly
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const authService = new AuthService(userService);

// registrasi user
export const register = async (req: Request, res: Response) => {
  const input = req.body;
  const requiredFields: string[] = [
    'email', 'password', 'name', 'tanggalLahir',
    'sudahLulus', 'skorKeseluruhan',
  ];

  try {
    // cek apakah semua required fields ada di input
    if (!requiredFields.every(prop => prop in input)) {
      return res.status(400).json({
        statusCode: 400,
        message: 'Input harus lengkap!',
      });
    }
    
    // cek apakah akun sudah terdaftar
    const existingUser = await userService.authenticateUser(input.email, input.password);
    if (existingUser) {
      return res.status(400).json({
        statusCode: 400,
        message: 'Akun sudah terdaftar!',
      });
    }

    // daftarkan akun ke penyimpanan data
    const registeredUser = await userService.createUser(input);

    return res.status(200).json({
      statusCode: 200,
      message: 'Akun baru telah terdaftar!',
      data: registeredUser,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Error internal server!',
    });
  }
};

// login user
export const login = async (req: Request, res: Response) => {
  const input = req.body;
  const requiredFields: string[] = ['email', 'password'];

  try {
    // cek apakah semua required fields ada di input
    if (!requiredFields.every(prop => prop in input)) {
      return res.status(400).json({
        statusCode: 400,
        message: 'Input harus lengkap!',
      });
    }

    // otentikasi pengguna dengan memberikan JWT token
    const result = await authService.login(input.email, input.password);
    if (!result) {
      return res.status(404).json({
        statusCode: 404,
        message: 'Email atau password salah!',
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: 'Berhasil login!',
      data: result,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Error internal server!',
    });
  }
};
