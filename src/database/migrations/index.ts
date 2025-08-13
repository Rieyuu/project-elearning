import { up as createUsersTable } from './001_create_users_table';
import { up as createCoursesTable } from './002_create_courses_table';
import { up as createEnrollmentsTable } from './003_create_enrollments_table';

const migrations = [
  { name: '001_create_users_table', up: createUsersTable },
  { name: '002_create_courses_table', up: createCoursesTable },
  { name: '003_create_enrollments_table', up: createEnrollmentsTable },
];

export default migrations; 