import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  editProject,
  getProject,
  reset,
} from '../../features/projects/projectSlice';
import { toast } from 'react-toastify';
import Card from '../UI/Card';
import Button from '../UI/Button';
import LoadingSpinner from '../UI/LoadingSpinner';

function EditProjectForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: editProjectId } = useParams();
  const [titleErr, setTitleErr] = useState('');
  const [descErr, setDescErr] = useState('');

  const { user } = useSelector((state) => state.auth);
  const { project, isLoading, isError, message } = useSelector(
    (state) => state.projects
  );

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
    if (title.length > 0) setTitleErr('');
    if (description.length > 0) setDescErr('');
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (title === '') setTitleErr('Must provide a name');
    if (description === '') setDescErr('Must provide description');

    if (title !== '' && description !== '') {
      dispatch(editProject(formData));
      dispatch(reset());
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
      {user && (
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
              />
              {titleErr && <p id="error">{titleErr}</p>}
            </div>
            <div className="form-group">
              <textarea
                type="text"
                className="form-control"
                placeholder="Enter project description"
                id="description"
                name="description"
                value={description}
                onChange={onChange}
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
