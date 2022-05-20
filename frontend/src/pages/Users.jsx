import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers, reset } from '../features/users/userSlice';
import { toast } from 'react-toastify';
import UsersCard from '../component/UsersComponents/UsersCard';
import LoadingSpinner from '../component/UI/LoadingSpinner';

function Users() {
  const dispatch = useDispatch();
  const { users, isError, isLoading, message } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getAllUsers());
    return () => {
      dispatch(reset());
    };
  }, [isError, dispatch, message]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="content">
      <h1 className="mb">Users</h1>
      <div className="projects">
        {users.map((user) => (
          <UsersCard key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
}
export default Users;
