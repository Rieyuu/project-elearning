import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../types/authenticated-request-type';

const enrollmentService = require('../services/enrollment-service');
const courseService = require('../services/course-service');

// mendapatkan list enrollments (hanya admin)
exports.index = async (req: Request, res: Response) => {
  try {
    const enrollmentData = enrollmentService.getEnrollments();

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
exports.getById = async (req: AuthenticatedRequest, res: Response) => {
  const enrollmentId = parseInt(req.params.id);
  const currentUserId = req.user.id;
  const currentUserRole = req.user.role;

  try {
    const enrollment = enrollmentService.getEnrollmentById(enrollmentId);
    
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
exports.getByUserId = async (req: AuthenticatedRequest, res: Response) => {
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

    const enrollments = enrollmentService.getEnrollmentsByUserId(userId);

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
exports.create = async (req: AuthenticatedRequest, res: Response) => {
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
    const course = courseService.findCourseById(input.courseId);
    if (!course) {
      return res.status(404).json({
        statusCode: 404,
        message: 'Course tidak ditemukan!',
      });
    }

    // cek apakah user sudah enroll ke course ini
    const isAlreadyEnrolled = enrollmentService.isUserEnrolledInCourse(currentUserId, input.courseId);
    if (isAlreadyEnrolled) {
      return res.status(400).json({
        statusCode: 400,
        message: 'Anda sudah terdaftar di course ini!',
      });
    }

    const newEnrollment = enrollmentService.createEnrollment({
      userId: currentUserId,
      courseId: input.courseId,
      status: 'pending',
      progress: 0,
    });

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
exports.update = async (req: AuthenticatedRequest, res: Response) => {
  const enrollmentId = parseInt(req.params.id);
  const input = req.body;

  try {
    const enrollment = enrollmentService.findEnrollmentById(enrollmentId);
    if (!enrollment) {
      return res.status(404).json({
        statusCode: 404,
        message: 'Enrollment tidak ditemukan!',
      });
    }

    const updatedEnrollment = enrollmentService.updateEnrollmentById(enrollmentId, input);

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
exports.deleteById = async (req: AuthenticatedRequest, res: Response) => {
  const enrollmentId = parseInt(req.params.id);
  const currentUserId = req.user.id;
  const currentUserRole = req.user.role;

  try {
    const enrollment = enrollmentService.findEnrollmentById(enrollmentId);
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

    const deletedEnrollment = enrollmentService.deleteEnrollmentById(enrollmentId);

    return res.status(200).json({
      statusCode: 200,
      message: 'Berhasil hapus enrollment!',
      data: deletedEnrollment,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Error internal server!',
    });
  }
}; 