export interface EnrollmentData {
  id: number;
  userId: number;
  courseId: number;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  enrolledAt: Date;
  completedAt?: Date;
  progress: number; // 0-100
  score?: number; // 0-100
} 