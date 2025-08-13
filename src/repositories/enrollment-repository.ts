import { IEnrollmentRepository } from '../interfaces/repository.interface';
import storedEnrollments from '../data/enrollment-data';

export class EnrollmentRepository implements IEnrollmentRepository {
  async findAll(): Promise<any[]> {
    return Promise.resolve(storedEnrollments);
  }

  async findById(id: number): Promise<any | null> {
    const enrollment = storedEnrollments.find((enrollment: any) => enrollment.id === id);
    return Promise.resolve(enrollment || null);
  }

  async findByUserId(userId: number): Promise<any[]> {
    const enrollments = storedEnrollments.filter((enrollment: any) => enrollment.userId === userId);
    return Promise.resolve(enrollments);
  }

  async findByCourseId(courseId: number): Promise<any[]> {
    const enrollments = storedEnrollments.filter((enrollment: any) => enrollment.courseId === courseId);
    return Promise.resolve(enrollments);
  }

  async findEnrollment(userId: number, courseId: number): Promise<any | null> {
    const enrollment = storedEnrollments.find(
      (enrollment: any) => enrollment.userId === userId && enrollment.courseId === courseId
    );
    return Promise.resolve(enrollment || null);
  }

  async create(data: any): Promise<any> {
    const newId = Math.max(...storedEnrollments.map((e: any) => e.id)) + 1;
    const newEnrollment = {
      id: newId,
      ...data
    };
    storedEnrollments.push(newEnrollment);
    return Promise.resolve(newEnrollment);
  }

  async update(id: number, data: any): Promise<any | null> {
    const enrollmentIndex = storedEnrollments.findIndex((enrollment: any) => enrollment.id === id);
    if (enrollmentIndex === -1) return Promise.resolve(null);

    storedEnrollments[enrollmentIndex] = { ...storedEnrollments[enrollmentIndex], ...data };
    return Promise.resolve(storedEnrollments[enrollmentIndex]);
  }

  async delete(id: number): Promise<boolean> {
    const enrollmentIndex = storedEnrollments.findIndex((enrollment: any) => enrollment.id === id);
    if (enrollmentIndex === -1) return Promise.resolve(false);

    storedEnrollments.splice(enrollmentIndex, 1);
    return Promise.resolve(true);
  }
} 