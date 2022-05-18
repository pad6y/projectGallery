import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteProject } from '../features/projects/projectSlice';
import Card from '../component/UI/Card';
import Button from '../component/UI/Button';

import styles from './ProjectItem.module.css';

function ProjectItem({ project }) {
  const { title, description, git_url, url, createdAt } = project;
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const date = new Date(createdAt).toLocaleString('en-GB').split(',')[0];

  const deleteHandler = () => {
    dispatch(deleteProject(project._id));
  };

  return (
    <Card projectHead={title}>
      <p className={styles.description}>{description}</p>

      {git_url ? (
        <a href={`${git_url}`} target="_blank" rel="noopener noreferrer">
          <Button type="button">GIT Repo</Button>
        </a>
      ) : null}
      {url ? (
        <a href={`${url}`} target="_blank" rel="noopener noreferrer">
          <Button type="button">Live Project</Button>
        </a>
      ) : null}

      {user && user._id === project.user ? (
        <Link to={`/${project._id}/edit`}>
          <Button type="button" className="edit">
            Edit Project
          </Button>
        </Link>
      ) : null}

      {user && user._id === project.user ? (
        <Button type="button" onClick={deleteHandler} className="delete">
          Delete Project
        </Button>
      ) : null}

      <p className={styles.date}>Published: {date}</p>
    </Card>
  );
}
export default ProjectItem;
