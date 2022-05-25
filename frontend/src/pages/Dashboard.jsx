import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getProjects, reset } from '../features/projects/projectSlice';

import ProjectItem from '../component/ProjectComponents/ProjectItem';
import LoadingSpinner from '../component/UI/LoadingSpinner';
import styles from './Dashboard.module.css';

function Dashboard() {
  const dispatch = useDispatch();

  const { projects, isLoading, isError, message } = useSelector(
    (state) => state.projects
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getProjects());

    return () => {
      dispatch(reset());
    };
  }, [isError, dispatch, message]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <section className={`heading ${styles.dash_container}`}>
        <h2 className={styles.text}>Welcome to Pad6y's Project Gallery</h2>
      </section>

      <section className="content">
        {projects.length > 0 && (
          <div className="projects">
            {projects.map((project) => (
              <ProjectItem key={project._id} project={project} />
            ))}
          </div>
        )}
        {projects.length === 0 && <h3>Currently no projects to view</h3>}
      </section>
    </>
  );
}

export default Dashboard;
