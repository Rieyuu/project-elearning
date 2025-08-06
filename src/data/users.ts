// contoh data LMS user
export interface UserData {
  id: number;
  username: string;
  email: string;
  password: string;
  tanggalLahir: string;
  sudahLulus: boolean;
  skorKeseluruhan: number;
  refreshToken?: string;
  tokenExpiry?: number;
}

export const users: UserData[] = [
  {
    id: 1,
    username: 'User Pertama',
    email: 'userpertama@elearning.com',
    password: '$2a$10$defaultpasswordhash', // akan di-hash saat runtime
    tanggalLahir: '2005-01-01',
    sudahLulus: false,
    skorKeseluruhan: 90,
  },
  {
    id: 2,
    username: 'User Kedua',
    email: 'userkedua@elearning.com',
    password: '$2a$10$defaultpasswordhash', // akan di-hash saat runtime
    tanggalLahir: '2004-01-01',
    sudahLulus: true,
    skorKeseluruhan: 85,
  },
];
