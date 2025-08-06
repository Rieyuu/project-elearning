import { EnrollmentData } from '../models/enrollment-model';
import storedEnrollments from '../data/enrollment-data';

// cari enrollment berdasarkan id
const findEnrollmentById = (id: number): EnrollmentData | undefined => {
  return storedEnrollments.find((enrollment: EnrollmentData) => enrollment.id == id);
};
exports.findEnrollmentById = findEnrollmentById;

// dapatkan semua enrollment
exports.getEnrollments = (): EnrollmentData[] => {
  return storedEnrollments || [];
};

// dapatkan enrollment berdasarkan id
exports.getEnrollmentById = (id: number): EnrollmentData | undefined => {
  return findEnrollmentById(id);
};

// dapatkan enrollment berdasarkan user id
exports.getEnrollmentsByUserId = (userId: number): EnrollmentData[] => {
  return storedEnrollments.filter((enrollment: EnrollmentData) => enrollment.userId === userId);
};

// dapatkan enrollment berdasarkan course id
exports.getEnrollmentsByCourseId = (courseId: number): EnrollmentData[] => {
  return storedEnrollments.filter((enrollment: EnrollmentData) => enrollment.courseId === courseId);
};

// cek apakah user sudah enroll ke course tertentu
exports.isUserEnrolledInCourse = (userId: number, courseId: number): boolean => {
  return storedEnrollments.some((enrollment: EnrollmentData) => 
    enrollment.userId === userId && enrollment.courseId === courseId
  );
};

// tambah enrollment baru
exports.createEnrollment = (input: Omit<EnrollmentData, 'id' | 'enrolledAt'>): EnrollmentData => {
  const newId = Math.max(...storedEnrollments.map((enrollment: EnrollmentData) => enrollment.id)) + 1;
  
  const newEnrollment: EnrollmentData = {
    id: newId,
    ...input,
    enrolledAt: new Date(),
  };
  
  storedEnrollments.push(newEnrollment);
  return newEnrollment;
};

// update enrollment berdasarkan id
exports.updateEnrollmentById = (
  id: number,
  input: Partial<Omit<EnrollmentData, 'id' | 'enrolledAt'>>,
): EnrollmentData | undefined => {
  const enrollment = findEnrollmentById(id);
  if (!enrollment) return undefined;

  Object.assign(enrollment, input);
  return enrollment;
};

// hapus enrollment berdasarkan id
exports.deleteEnrollmentById = (id: number): EnrollmentData | undefined => {
  const enrollment = findEnrollmentById(id);
  if (!enrollment) return undefined;

  const index = storedEnrollments.indexOf(enrollment);
  if (index !== -1) {
    storedEnrollments.splice(index, 1);
    return enrollment;
  }

  return undefined;
}; 