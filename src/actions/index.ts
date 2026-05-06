import { loginUser } from './auth/login.action';
import { logout } from './auth/logout.action';
import { loginWithGoogle } from './auth/login-google.action';
import { registerUser } from './auth/register.action';
import { deleteUser } from './admin/deleteUser.action';
import { updateUser } from './admin/updateUser.action';
import { createUser } from './admin/createUser.action';
import { getUsers } from './admin/getUsers.action';

export const server = {
  loginUser,
  logout,
  loginWithGoogle,
  registerUser,
  deleteUser,
  updateUser,
  createUser,
  getUsers,
};