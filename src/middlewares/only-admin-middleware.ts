import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/authenticated-request-type';

export const onlyAdminMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user || !req.user.role) {
      return res.status(401).json({
        statusCode: 401,
        message: 'User tidak terautentikasi atau role tidak ditemukan!',
      });
    }

    if (req.user.role !== 'admin') {
      return res.status(403).json({
        statusCode: 403,
        message: 'Akses ditolak! Hanya admin yang diperbolehkan.',
      });
    }

    next();
  } catch (err) {
    return res.status(500).json({
      statusCode: 500,
      message: 'Terjadi kesalahan internal server!',
    });
  }
};
