import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createProject, reset } from '../../features/projects/projectSlice';

import Card from '../UI/Card';
import Button from '../UI/Button';

function ProjectForm() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [titleErr, setTitleErr] = useState('');
  const [descErr, setDescErr] = useState('');

  const [formData, setFormData] = useState({
    user: '',
    title: '',
    description: '',
    git_url: '',
    url: '',
  });

  const { title, description, git_url, url } = formData;

  const onChange = (e) => {
    if (title.length > 0) setTitleErr('');
    if (description.length > 0) setDescErr('');
    setFormData((prevState) => ({
      ...prevState,
      user: user._id,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (title === '') setTitleErr('Must provide a name');
    if (description === '') setDescErr('Must provide description');

    if (title !== '' && description !== '') {
      dispatch(createProject(formData));
      dispatch(reset());
      setTitleErr('');
      setDescErr('');
      setFormData(() => ({
        user: '',
        title: '',
        description: '',
        git_url: '',
        url: '',
      }));
      navigate(`/userprojects/${user._id}`);
    }
  };

  return (
    <section className="form">
      {!user && <p>Form is disabled. Please login to activate form.</p>}
      <Card>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              className="form-control"
              autoFocus
              type="text"
              placeholder="Enter project name"
              id="title"
              name="title"
              value={title}
              onChange={onChange}
              disabled={!user ? true : false}
            />
            {titleErr && <p id="error">{titleErr}</p>}
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
            {descErr && <p id="error">{descErr}</p>}
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
