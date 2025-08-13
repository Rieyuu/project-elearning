export interface IRepository<T> {
  findAll(): Promise<T[]>;
  findById(id: number): Promise<T | null>;
  create(data: Omit<T, 'id'>): Promise<T>;
  update(id: number, data: Partial<T>): Promise<T | null>;
  delete(id: number): Promise<boolean>;
}

export interface IUserRepository extends IRepository<any> {
  findByEmail(email: string): Promise<any | null>;
  findByRole(role: string): Promise<any[]>;
}

export interface ICourseRepository extends IRepository<any> {
  findByCategory(category: string): Promise<any[]>;
  findByInstructor(instructorId: number): Promise<any[]>;
}

export interface IEnrollmentRepository extends IRepository<any> {
  findByUserId(userId: number): Promise<any[]>;
  findByCourseId(courseId: number): Promise<any[]>;
  findEnrollment(userId: number, courseId: number): Promise<any | null>;
} 