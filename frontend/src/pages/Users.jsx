import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers, reset } from '../features/users/userSlice';
import { toast } from 'react-toastify';
import UsersCard from '../component/UsersComponents/UsersCard';
import LoadingSpinner from '../component/UI/LoadingSpinner';

import styles from './Dashboard.module.css';

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

  if (users.length < 1) {
    return <div className="">No other users found!</div>;
  }

  let otherUsers;
  if (users.length >= 1 && authUser) {
    otherUsers = users.filter((user) => user._id !== authUser._id);
  } else {
    otherUsers = users;
  }

  return (
    <>
      <section className={`heading ${styles.dash_container}`}>
        <h2 className={styles.text}>Users</h2>
      </section>

      <section className="content">
        {otherUsers.length === 0 && (
          <div className="">No other users found!</div>
        )}
        <div className={`users ${styles.width}`}>
          {otherUsers.map((user) => (
            <UsersCard key={user._id} user={user} />
          ))}
        </div>
      </section>
    </>
  );
}
export default Users;
