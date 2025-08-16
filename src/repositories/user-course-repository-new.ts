import { UserCourse } from '../models/user-course-model';
import { User } from '../models/user-model';
import { Course } from '../models/course-model';
import knex from '../config/database/query-builder';

export class UserCourseRepository {
  // Enroll user in course
  async enrollUser(userId: number, courseId: number): Promise<UserCourse> {
    return UserCourse.query().insert({
      user_id: userId,
      course_id: courseId,
      enrolled_at: new Date()
    });
  }

  // Unenroll user from course
  async unenrollUser(userId: number, courseId: number): Promise<number> {
    return UserCourse.query()
      .delete()
      .where('user_id', userId)
      .where('course_id', courseId);
  }

  // Get user enrollments
  async getUserEnrollments(userId: number): Promise<UserCourse[]> {
    return UserCourse.query()
      .where('user_id', userId)
      .withGraphFetched('course');
  }

  // Get course enrollments
  async getCourseEnrollments(courseId: number): Promise<UserCourse[]> {
    return UserCourse.query()
      .where('course_id', courseId)
      .withGraphFetched('user');
  }

  // Check if user is enrolled in course
  async isUserEnrolled(userId: number, courseId: number): Promise<boolean> {
    const enrollment = await UserCourse.query()
      .where('user_id', userId)
      .where('course_id', courseId)
      .first();
    
    return !!enrollment;
  }

  // Get enrollment count for a course
  async getCourseEnrollmentCount(courseId: number): Promise<number> {
    const result = await UserCourse.query()
      .where('course_id', courseId)
      .count('* as count')
      .first();
    
    return parseInt(result?.count as string || '0');
  }

  // Get user enrollment count
  async getUserEnrollmentCount(userId: number): Promise<number> {
    const result = await UserCourse.query()
      .where('user_id', userId)
      .count('* as count')
      .first();
    
    return parseInt(result?.count as string || '0');
  }

  // Using Knex directly for complex queries
  async getEnrollmentStats(): Promise<any[]> {
    return knex('user_courses')
      .join('users', 'user_courses.user_id', 'users.id')
      .join('courses', 'user_courses.course_id', 'courses.id')
      .select(
        'users.name as user_name',
        'users.email as user_email',
        'courses.title as course_title',
        'courses.slug as course_slug',
        'user_courses.enrolled_at'
      )
      .orderBy('user_courses.enrolled_at', 'desc');
  }

  // Get recent enrollments
  async getRecentEnrollments(limit: number = 10): Promise<any[]> {
    return knex('user_courses')
      .join('users', 'user_courses.user_id', 'users.id')
      .join('courses', 'user_courses.course_id', 'courses.id')
      .select(
        'users.name as user_name',
        'courses.title as course_title',
        'user_courses.enrolled_at'
      )
      .orderBy('user_courses.enrolled_at', 'desc')
      .limit(limit);
  }
}
