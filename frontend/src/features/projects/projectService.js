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

  return response.data;
};
//Delete selected project
const deleteProject = async (projectId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${API_URL}${projectId}/delete`, config);

  if (!response.data) {
    toast.error('Failed to delete project');
  }

  if (response.data) {
    toast.success(`Successfully delete project ${response.data.id}`);
  }

  return response.data;
};

const projectService = {
  createProject,
  getProjects,
  deleteProject,
};

export default projectService;
