import { IEnrollmentService } from '../interfaces/service.interface';
import { IEnrollmentRepository } from '../interfaces/repository.interface';

export class EnrollmentService implements IEnrollmentService {
  constructor(private enrollmentRepository: IEnrollmentRepository) {}

  async getAllEnrollments(): Promise<any[]> {
    return await this.enrollmentRepository.findAll();
  }

  async getEnrollmentById(id: number): Promise<any | null> {
    return await this.enrollmentRepository.findById(id);
  }

  async createEnrollment(enrollmentData: any): Promise<any> {
    return await this.enrollmentRepository.create(enrollmentData);
  }

  async updateEnrollment(id: number, enrollmentData: any): Promise<any | null> {
    return await this.enrollmentRepository.update(id, enrollmentData);
  }

  async deleteEnrollment(id: number): Promise<boolean> {
    return await this.enrollmentRepository.delete(id);
  }

  async getUserEnrollments(userId: number): Promise<any[]> {
    return await this.enrollmentRepository.findByUserId(userId);
  }

  async getCourseEnrollments(courseId: number): Promise<any[]> {
    return await this.enrollmentRepository.findByCourseId(courseId);
  }

  async enrollUserInCourse(userId: number, courseId: number): Promise<any> {
    // Check if user is already enrolled
    const existingEnrollment = await this.enrollmentRepository.findEnrollment(userId, courseId);
    if (existingEnrollment) {
      throw new Error('User is already enrolled in this course');
    }

    const enrollmentData = {
      userId,
      courseId,
      enrolledAt: new Date(),
      status: 'active'
    };

    return await this.enrollmentRepository.create(enrollmentData);
  }

  async findEnrollment(userId: number, courseId: number): Promise<any | null> {
    return await this.enrollmentRepository.findEnrollment(userId, courseId);
  }
} 