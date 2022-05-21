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
  const { user: authUser } = useSelector((state) => state.auth);

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

  const otherUsers = users.filter((user) => user._id !== authUser._id);

  return (
    <div className="content">
      <h1 className="mb">Users</h1>
      <div className="projects">
        {otherUsers.map((user) => (
          <UsersCard key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
}
export default Users;
