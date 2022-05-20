import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createProject, reset } from '../../features/projects/projectSlice';

import Card from '../UI/Card';
import Button from '../UI/Button';

function ProjectForm(props) {
  const [formData, setFormData] = useState({
    user: '',
    title: '',
    description: '',
    git_url: '',
    url: '',
  });

  const { title, description, git_url, url } = formData;

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      user: user._id,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createProject(formData));
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
      {!user && <p>Form is disabled. Please login to activate form.</p>}
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
              disabled={!user ? true : false}
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
              disabled={!user ? true : false}
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
              disabled={!user ? true : false}
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
              disabled={!user ? true : false}
            />
          </div>
          <Button type="submit" disabled={!user ? true : false}>
            Submit
          </Button>
        </form>
      </Card>
      {/* )} */}
    </section>
  );
}
export default ProjectForm;
