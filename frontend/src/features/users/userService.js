import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = '/api/admin/';

//Retrieve all users
const getAllUsers = async () => {
  const response = await axios.get(`${API_URL}allusers`);

  if (!response.data) {
    toast.error('Failed to retrieve projects');
  }

  return response.data;
};
//Retrieve user
const getUser = async (userId) => {
  const response = await axios.get(`${API_URL}user/${userId}`);

  if (!response.data) {
    toast.error('Failed to retrieve projects');
  }

  return response.data;
};

const userService = {
  getAllUsers,
  getUser,
};

export default userService;
