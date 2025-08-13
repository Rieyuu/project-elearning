export interface IUserService {
  getAllUsers(): Promise<any[]>;
  getUserById(id: number, currentUserId: number, currentUserRole: string): Promise<any | null>;
  createUser(userData: any): Promise<any>;
  updateUser(id: number, userData: any): Promise<any | null>;
  deleteUser(id: number): Promise<boolean>;
  authenticateUser(email: string, password: string): Promise<any | null>;
}

export interface ICourseService {
  getAllCourses(): Promise<any[]>;
  getCourseById(id: number): Promise<any | null>;
  createCourse(courseData: any): Promise<any>;
  updateCourse(id: number, courseData: any): Promise<any | null>;
  deleteCourse(id: number): Promise<boolean>;
  getCoursesByCategory(category: string): Promise<any[]>;
  getCoursesByInstructor(instructorId: number): Promise<any[]>;
}

export interface IEnrollmentService {
  getAllEnrollments(): Promise<any[]>;
  getEnrollmentById(id: number): Promise<any | null>;
  createEnrollment(enrollmentData: any): Promise<any>;
  updateEnrollment(id: number, enrollmentData: any): Promise<any | null>;
  deleteEnrollment(id: number): Promise<boolean>;
  getUserEnrollments(userId: number): Promise<any[]>;
  getCourseEnrollments(courseId: number): Promise<any[]>;
  enrollUserInCourse(userId: number, courseId: number): Promise<any>;
  findEnrollment(userId: number, courseId: number): Promise<any | null>;
} 