import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../types/authenticated-request-type';
import { EnrollmentService } from '../services/enrollment-service';
import { CourseService } from '../services/course-service';
import { EnrollmentRepository } from '../repositories/enrollment-repository';
import { CourseRepository } from '../repositories/course-repository';

// Create instances directly
const enrollmentRepository = new EnrollmentRepository();
const courseRepository = new CourseRepository();
const enrollmentService = new EnrollmentService(enrollmentRepository);
const courseService = new CourseService(courseRepository);

// mendapatkan list enrollments (hanya admin)
export const index = async (req: Request, res: Response) => {
  try {
    const enrollmentData = await enrollmentService.getAllEnrollments();

    if (!enrollmentData || enrollmentData.length === 0) {
      return res.status(404).json({
        statusCode: 404,
        message: 'Data enrollment kosong!',
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: 'Sukses mendapatkan enrollment!',
      data: enrollmentData,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Error internal server!',
    });
  }
};

// mendapatkan enrollment berdasarkan id
export const getById = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({
      statusCode: 401,
      message: 'User tidak terautentikasi!',
    });
  }

  const enrollmentId = parseInt(req.params.id);
  const currentUserId = req.user.id;
  const currentUserRole = req.user.role;

  try {
    const enrollment = await enrollmentService.getEnrollmentById(enrollmentId);
    
    if (!enrollment) {
      return res.status(404).json({
        statusCode: 404,
        message: 'Enrollment tidak ditemukan!',
      });
    }

    // Authorization check: admin bisa lihat semua, student hanya enrollment sendiri
    if (currentUserRole === 'student' && enrollment.userId !== currentUserId) {
      return res.status(403).json({
        statusCode: 403,
        message: 'Tidak memiliki akses ke enrollment ini!',
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: 'Berhasil mendapatkan data enrollment!',
      data: enrollment,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Error internal server!',
    });
  }
};

// mendapatkan enrollment berdasarkan user id
export const getByUserId = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({
      statusCode: 401,
      message: 'User tidak terautentikasi!',
    });
  }

  const userId = parseInt(req.params.userId);
  const currentUserId = req.user.id;
  const currentUserRole = req.user.role;

  try {
    // Authorization check: admin bisa lihat semua, student hanya enrollment sendiri
    if (currentUserRole === 'student' && userId !== currentUserId) {
      return res.status(403).json({
        statusCode: 403,
        message: 'Tidak memiliki akses ke data enrollment user lain!',
      });
    }

    const enrollments = await enrollmentService.getUserEnrollments(userId);

    return res.status(200).json({
      statusCode: 200,
      message: 'Berhasil mendapatkan data enrollment user!',
      data: enrollments,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Error internal server!',
    });
  }
};

// membuat enrollment baru
export const create = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({
      statusCode: 401,
      message: 'User tidak terautentikasi!',
    });
  }

  const input = req.body;
  const currentUserId = req.user.id;

  try {
    // validasi input
    if (!input.courseId) {
      return res.status(400).json({
        statusCode: 400,
        message: 'Course ID harus diisi!',
      });
    }

    // cek apakah course ada
    const course = await courseService.getCourseById(input.courseId);
    if (!course) {
      return res.status(404).json({
        statusCode: 404,
        message: 'Course tidak ditemukan!',
      });
    }

    // cek apakah user sudah enroll ke course ini
    const existingEnrollment = await enrollmentService.findEnrollment(currentUserId, input.courseId);
    if (existingEnrollment) {
      return res.status(400).json({
        statusCode: 400,
        message: 'Anda sudah terdaftar di course ini!',
      });
    }

    const newEnrollment = await enrollmentService.enrollUserInCourse(currentUserId, input.courseId);

    return res.status(201).json({
      statusCode: 201,
      message: 'Berhasil mendaftar ke course!',
      data: newEnrollment,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Error internal server!',
    });
  }
};

// update enrollment berdasarkan id (hanya admin)
export const update = async (req: AuthenticatedRequest, res: Response) => {
  const enrollmentId = parseInt(req.params.id);
  const input = req.body;

  try {
    const enrollment = await enrollmentService.getEnrollmentById(enrollmentId);
    if (!enrollment) {
      return res.status(404).json({
        statusCode: 404,
        message: 'Enrollment tidak ditemukan!',
      });
    }

    const updatedEnrollment = await enrollmentService.updateEnrollment(enrollmentId, input);

    return res.status(200).json({
      statusCode: 200,
      message: 'Berhasil update data enrollment!',
      data: updatedEnrollment,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Error internal server!',
    });
  }
};

// hapus enrollment berdasarkan id
export const deleteById = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({
      statusCode: 401,
      message: 'User tidak terautentikasi!',
    });
  }

  const enrollmentId = parseInt(req.params.id);
  const currentUserId = req.user.id;
  const currentUserRole = req.user.role;

  try {
    const enrollment = await enrollmentService.getEnrollmentById(enrollmentId);
    if (!enrollment) {
      return res.status(404).json({
        statusCode: 404,
        message: 'Enrollment tidak ditemukan!',
      });
    }

    // Authorization check: admin bisa hapus semua, student hanya enrollment sendiri
    if (currentUserRole === 'student' && enrollment.userId !== currentUserId) {
      return res.status(403).json({
        statusCode: 403,
        message: 'Tidak memiliki akses untuk menghapus enrollment ini!',
      });
    }

    const isDeleted = await enrollmentService.deleteEnrollment(enrollmentId);

    if (!isDeleted) {
      return res.status(500).json({
        statusCode: 500,
        message: 'Gagal menghapus enrollment!',
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: 'Berhasil hapus enrollment!',
      data: enrollment,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Error internal server!',
    });
  }
}; 