import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  editProject,
  getProject,
  reset,
} from '../features/projects/projectSlice';
import { toast } from 'react-toastify';
import Card from './UI/Card';
import Button from './UI/Button';
import LoadingSpinner from '../component/LoadingSpinner';

function EditProjectForm() {
  const { user } = useSelector((state) => state.auth);
  const { project, isLoading, isError, message } = useSelector(
    (state) => state.projects
  );
  const editProjectId = useParams().id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    user: '',
    title: '',
    description: '',
    git_url: '',
    url: '',
  });

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getProject(editProjectId));
  }, [editProjectId, dispatch, isError, message]);

  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      ...project,
    }));
  }, [setFormData, project, isLoading]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const { title, description, git_url, url } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(editProject(formData));
    dispatch(reset());
    setFormData(() => ({
      user: '',
      title: '',
      description: '',
      git_url: '',
      url: '',
    }));

    navigate('/myprojects');
  };

  return (
    <section className="form">
      {user && (
        <Card>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter project name"
                id="title"
                name="title"
                value={title}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter project description"
                id="description"
                name="description"
                value={description}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Git Repo (optional)"
                id="git_url"
                name="git_url"
                value={git_url}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter URL for project (optional)"
                id="url"
                name="url"
                value={url}
                onChange={onChange}
              />
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </Card>
      )}
    </section>
  );
}
export default EditProjectForm;
