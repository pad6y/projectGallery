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

//Retrieve all projects
const getProjects = async () => {
  const response = await axios.get(API_URL);

  if (!response.data) {
    toast.error('Failed to retrieve projects');
  }

  return response.data.projects;
};

const projectService = {
  createProject,
  getProjects,
};

export default projectService;
