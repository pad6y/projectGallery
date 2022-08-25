import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { userProjects, reset } from '../features/projects/projectSlice';
// import { getUser } from '../features/users/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import ProjectItem from '../component/ProjectComponents/ProjectItem';
import LoadingSpinner from '../component/UI/LoadingSpinner';

import styles from './Dashboard.module.css';

function UserProjects() {
  const { userID } = useParams();
  const dispatch = useDispatch();
  const { projects, isLoading, isError, message } = useSelector(
    (state) => state.projects
  );

  const {
    user,
    isError: userError,
    isLoading: userLoading,
    message: userMsg,
  } = useSelector((state) => state.users);

  const { user: loggedInUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError || userError) {
      toast.error(message || userMsg);
    }
    // dispatch(getUser(userID));
    dispatch(userProjects(userID));

    return () => {
      dispatch(reset());
    };
  }, [isError, userError, message, userMsg, userID, dispatch]);

  if (isLoading || userLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {user && (
        <section className={`heading ${styles.dash_container}`}>
          {loggedInUser && loggedInUser._id === user._id ? (
            <h3 className={styles.text}>
              Welcome back{' '}
              <span className="name">{user.name.split(' ')[0]}</span> these are
              your projects
            </h3>
          ) : (
            <h3 className={styles.text}>
              Welcome to <span className="name">{user.name.split(' ')[0]}</span>{' '}
              project's
            </h3>
          )}
        </section>
      )}

      <section className="content">
        {projects.length === 0 && <h3>Currently no projects to view</h3>}

        {projects.length > 0 && (
          <div className="projects">
            {projects.map((project) => (
              <ProjectItem key={project._id} project={project} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
export default UserProjects;
