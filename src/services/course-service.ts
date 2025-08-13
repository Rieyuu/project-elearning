import { ICourseService } from '../interfaces/service.interface';
import { ICourseRepository } from '../interfaces/repository.interface';

export class CourseService implements ICourseService {
  constructor(private courseRepository: ICourseRepository) {}

  async getAllCourses(): Promise<any[]> {
    return await this.courseRepository.findAll();
  }

  async getCourseById(id: number): Promise<any | null> {
    return await this.courseRepository.findById(id);
  }

  async createCourse(courseData: any): Promise<any> {
    return await this.courseRepository.create(courseData);
  }

  async updateCourse(id: number, courseData: any): Promise<any | null> {
    return await this.courseRepository.update(id, courseData);
  }

  async deleteCourse(id: number): Promise<boolean> {
    return await this.courseRepository.delete(id);
  }

  async getCoursesByCategory(category: string): Promise<any[]> {
    return await this.courseRepository.findByCategory(category);
  }

  async getCoursesByInstructor(instructorId: number): Promise<any[]> {
    return await this.courseRepository.findByInstructor(instructorId);
  }
} 