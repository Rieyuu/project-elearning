import { UserModel, UserData } from '../models/user-model';

// GET - Mendapatkan semua users
export const getUsers = async (): Promise<UserData[]> => {
  return await UserModel.getAllUsers();
};

// GET - Mendapatkan user by ID
export const getUserById = async (id: number): Promise<UserData | null> => {
  return await UserModel.getUserById(id);
};

// POST - Membuat user baru
export const createUser = async (userData: Omit<UserData, 'id'>): Promise<UserData> => {
  return await UserModel.createUser(userData);
};

// PUT - Update user existing
export const updateUser = async (id: number, userData: Partial<Omit<UserData, 'id'>>): Promise<UserData | null> => {
  return await UserModel.updateUser(id, userData);
};

// DELETE - Hapus user
export const deleteUser = async (id: number): Promise<boolean> => {
  return await UserModel.deleteUser(id);
};

// GET - Jumlah users
export const getUsersCount = async (): Promise<number> => {
  return await UserModel.getUsersCount();
};
