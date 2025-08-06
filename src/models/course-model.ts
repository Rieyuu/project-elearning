export interface CourseData {
  id: number;
  title: string;
  description: string;
  instructor: string;
  duration: number; // dalam menit
  price: number;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
} 