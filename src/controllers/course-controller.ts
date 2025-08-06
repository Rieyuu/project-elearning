import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../types/authenticated-request-type';

const courseService = require('../services/course-service');

// mendapatkan list courses
exports.index = async (req: Request, res: Response) => {
  try {
    const courseData = courseService.getCourses();

    if (!courseData || courseData.length === 0) {
      return res.status(404).json({
        statusCode: 404,
        message: 'Data course kosong!',
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: 'Sukses mendapatkan course!',
      data: courseData,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Error internal server!',
    });
  }
};

// mendapatkan course berdasarkan id
exports.getById = async (req: Request, res: Response) => {
  const courseId = parseInt(req.params.id);

  try {
    const course = courseService.getCourseById(courseId);
    
    if (!course) {
      return res.status(404).json({
        statusCode: 404,
        message: 'Course tidak ditemukan!',
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: 'Berhasil mendapatkan data course!',
      data: course,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Error internal server!',
    });
  }
};

// membuat course baru (hanya admin)
exports.create = async (req: AuthenticatedRequest, res: Response) => {
  const input = req.body;

  try {
    // validasi input
    if (!input.title || !input.description || !input.instructor) {
      return res.status(400).json({
        statusCode: 400,
        message: 'Title, description, dan instructor harus diisi!',
      });
    }

    const newCourse = courseService.createCourse(input);

    return res.status(201).json({
      statusCode: 201,
      message: 'Berhasil membuat course baru!',
      data: newCourse,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Error internal server!',
    });
  }
};

// update course berdasarkan id (hanya admin)
exports.update = async (req: AuthenticatedRequest, res: Response) => {
  const courseId = parseInt(req.params.id);
  const input = req.body;

  try {
    const course = courseService.findCourseById(courseId);
    if (!course) {
      return res.status(404).json({
        statusCode: 404,
        message: 'Course tidak ditemukan!',
      });
    }

    const updatedCourse = courseService.updateCourseById(courseId, input);

    return res.status(200).json({
      statusCode: 200,
      message: 'Berhasil update data course!',
      data: updatedCourse,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Error internal server!',
    });
  }
};

// hapus course berdasarkan id (hanya admin)
exports.deleteById = async (req: AuthenticatedRequest, res: Response) => {
  const courseId = parseInt(req.params.id);

  try {
    const course = courseService.findCourseById(courseId);
    if (!course) {
      return res.status(404).json({
        statusCode: 404,
        message: 'Course tidak ditemukan!',
      });
    }

    const deletedCourse = courseService.deleteCourseById(courseId);

    return res.status(200).json({
      statusCode: 200,
      message: 'Berhasil hapus course!',
      data: deletedCourse,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Error internal server!',
    });
  }
}; 