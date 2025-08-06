import { CourseData } from '../models/course-model';
import storedCourses from '../data/course-data';

// cari course berdasarkan id
const findCourseById = (id: number): CourseData | undefined => {
  return storedCourses.find((course: CourseData) => course.id == id);
};
exports.findCourseById = findCourseById;

// dapatkan semua course
exports.getCourses = (): CourseData[] => {
  return storedCourses || [];
};

// dapatkan course berdasarkan id
exports.getCourseById = (id: number): CourseData | undefined => {
  return findCourseById(id);
};

// tambah course baru
exports.createCourse = (input: Omit<CourseData, 'id' | 'createdAt' | 'updatedAt'>): CourseData => {
  const newId = Math.max(...storedCourses.map((course: CourseData) => course.id)) + 1;
  const now = new Date();
  
  const newCourse: CourseData = {
    id: newId,
    ...input,
    createdAt: now,
    updatedAt: now,
  };
  
  storedCourses.push(newCourse);
  return newCourse;
};

// update course berdasarkan id
exports.updateCourseById = (
  id: number,
  input: Partial<Omit<CourseData, 'id' | 'createdAt'>>,
): CourseData | undefined => {
  const course = findCourseById(id);
  if (!course) return undefined;

  Object.assign(course, { ...input, updatedAt: new Date() });
  return course;
};

// hapus course berdasarkan id
exports.deleteCourseById = (id: number): CourseData | undefined => {
  const course = findCourseById(id);
  if (!course) return undefined;

  const index = storedCourses.indexOf(course);
  if (index !== -1) {
    storedCourses.splice(index, 1);
    return course;
  }

  return undefined;
}; 