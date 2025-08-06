import { CourseData } from '../models/course-model';

// contoh data course
const courses: CourseData[] = [
  {
    id: 1,
    title: 'JavaScript Fundamentals',
    description: 'Belajar dasar-dasar JavaScript dari nol hingga mahir',
    instructor: 'John Doe',
    duration: 120, // 2 jam
    price: 150000,
    status: 'active',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 2,
    title: 'React.js Advanced',
    description: 'Kursus lanjutan React.js untuk developer berpengalaman',
    instructor: 'Jane Smith',
    duration: 180, // 3 jam
    price: 250000,
    status: 'active',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 3,
    title: 'Node.js Backend Development',
    description: 'Membangun aplikasi backend dengan Node.js dan Express',
    instructor: 'Mike Johnson',
    duration: 240, // 4 jam
    price: 300000,
    status: 'active',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01'),
  },
];

export default courses; 