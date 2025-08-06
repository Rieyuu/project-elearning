import { EnrollmentData } from '../models/enrollment-model';

// contoh data enrollment
const enrollments: EnrollmentData[] = [
  {
    id: 1,
    userId: 2, // User Kedua
    courseId: 1, // JavaScript Fundamentals
    status: 'approved',
    enrolledAt: new Date('2024-01-15'),
    progress: 75,
    score: 85,
  },
  {
    id: 2,
    userId: 2, // User Kedua
    courseId: 2, // React.js Advanced
    status: 'pending',
    enrolledAt: new Date('2024-02-01'),
    progress: 0,
  },
  {
    id: 3,
    userId: 1, // User Pertama (admin)
    courseId: 3, // Node.js Backend Development
    status: 'completed',
    enrolledAt: new Date('2024-01-10'),
    completedAt: new Date('2024-02-15'),
    progress: 100,
    score: 95,
  },
];

export default enrollments; 