import { useEffect } from 'react';
import { userProjects, reset } from '../features/projects/projectSlice';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import ProjectItem from '../component/ProjectItem';
import LoadingSpinner from '../component/LoadingSpinner';

function UserProjects() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { projects, isLoading, isError, message } = useSelector(
    (state) => state.projects
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(userProjects(user._id));

    return () => {
      dispatch(reset());
    };
  }, [isError, message, user, dispatch]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <section className="heading">
        <h3 className="border_b">Welcome {user.name}'s Project's Gallery</h3>
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
export default UserProjects;
