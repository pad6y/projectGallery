import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = '/api/projects/';
//Create a new project entry
const createProject = async (projectData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, projectData, config);

  if (response.data) {
    toast.success('Project Added Successfully');
  }

  return response.data;
};

const projectService = {
  createProject,
};

export default projectService;
