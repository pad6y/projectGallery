import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = '/api/admin/';

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    toast.success(`You have successfully registered ${response.data.name}`);
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};
// Login user
const login = async (userData) => {
  const response = await axios.post(`${API_URL}login`, userData);

  if (response.data) {
    toast.success(`Welcome back ${response.data.name}`);
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};
//Log out user
const logout = () => {
  localStorage.removeItem('user');
  toast.success(`You have successfully logged out`);
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
