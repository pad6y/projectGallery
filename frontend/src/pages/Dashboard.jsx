import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProjectForm from '../component/ProjectForm';
import { reset } from '../features/projects/projectSlice';
import LoadingSpinner from '../component/LoadingSpinner';

function Dashboard() {
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const { projects, isLoading, isError, message } = useSelector(
    (state) => state.projects
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    return () => {
      dispatch(reset());
    };
  }, [isError, dispatch, message]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome</h1>
        <p>Project dashboard</p>
      </section>
      <ProjectForm />
    </>
  );
}

export default Dashboard;
