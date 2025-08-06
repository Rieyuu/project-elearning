import { UserData } from '../models/user-model';
import storedUsers from '../data/user-data';

// cari user berdasarkan id nya
const findUserById = (id: number): UserData | undefined => {
  return storedUsers.find((user: UserData) => user.id == id);
};
exports.findUserById = findUserById;

// dapatkan user berdasarkan id dengan authorization check
exports.getUserById = (id: number, currentUserId: number, currentUserRole: string): UserData | undefined => {
  const user = findUserById(id);
  
  // Jika user tidak ditemukan
  if (!user) return undefined;
  
  // Jika admin, bisa akses semua user
  if (currentUserRole === 'admin') return user;
  
  // Jika student, hanya bisa akses data dirinya sendiri
  if (currentUserRole === 'student' && currentUserId === id) return user;
  
  // Jika bukan admin dan bukan data diri sendiri, return undefined
  return undefined;
};

// dapatkan semua user
exports.getUsers = (): UserData[] => {
  return storedUsers || [];
};

// ubah data user
exports.updateUserById = (
  id: number,
  input: UserData,
): UserData | undefined => {
  const user = findUserById(id);
  if (!user) return undefined;

  Object.assign(user, input);
  return user;
};

// hapus data user berdasarkan id nya
exports.deleteUserById = (
  id: number,
): UserData | undefined => {
  const user = findUserById(id);
  if (!user) return undefined;

  const index = storedUsers.indexOf(user);
  if (index !== -1) {
    storedUsers.splice(index, 1);
    return user;
  }

  return undefined;
};
