import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getProjects, reset } from '../features/projects/projectSlice';
import ProjectForm from '../component/ProjectForm';
import ProjectItem from '../component/ProjectItem';
import LoadingSpinner from '../component/LoadingSpinner';

function Dashboard() {
  // const navigate = useNavigate();
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
  console.log(projects);
  return (
    <>
      <section className="heading">
        <h1>Welcome</h1>
        <p>Project Dashboard</p>
      </section>

      <div className="mb">
        <ProjectForm />
      </div>

      <section className="content">
        {projects.length > 0 ? (
          <div className="projects">
            {projects.map((project) => (
              <ProjectItem key={project._id} project={project} />
            ))}
          </div>
        ) : (
          <h3>Currently no projects to view</h3>
        )}
      </section>
    </>
  );
}

export default Dashboard;
