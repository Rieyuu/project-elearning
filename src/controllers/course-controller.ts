import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../types/authenticated-request-type';
import { CourseService } from '../services/course-service';
import { CourseRepository } from '../repositories/course-repository';

// Create instances directly
const courseRepository = new CourseRepository();
const courseService = new CourseService(courseRepository);

// mendapatkan list courses
export const index = async (req: Request, res: Response) => {
  try {
    const courseData = await courseService.getAllCourses();

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
export const getById = async (req: Request, res: Response) => {
  const courseId = parseInt(req.params.id);

  try {
    const course = await courseService.getCourseById(courseId);
    
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
export const create = async (req: AuthenticatedRequest, res: Response) => {
  const input = req.body;

  try {
    // validasi input
    if (!input.title || !input.description || !input.instructor) {
      return res.status(400).json({
        statusCode: 400,
        message: 'Title, description, dan instructor harus diisi!',
      });
    }

    const newCourse = await courseService.createCourse(input);

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
export const update = async (req: AuthenticatedRequest, res: Response) => {
  const courseId = parseInt(req.params.id);
  const input = req.body;

  try {
    const course = await courseService.getCourseById(courseId);
    if (!course) {
      return res.status(404).json({
        statusCode: 404,
        message: 'Course tidak ditemukan!',
      });
    }

    const updatedCourse = await courseService.updateCourse(courseId, input);

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
export const deleteById = async (req: AuthenticatedRequest, res: Response) => {
  const courseId = parseInt(req.params.id);

  try {
    const course = await courseService.getCourseById(courseId);
    if (!course) {
      return res.status(404).json({
        statusCode: 404,
        message: 'Course tidak ditemukan!',
      });
    }

    const isDeleted = await courseService.deleteCourse(courseId);

    if (!isDeleted) {
      return res.status(500).json({
        statusCode: 500,
        message: 'Gagal menghapus course!',
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: 'Berhasil hapus course!',
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