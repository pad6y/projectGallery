import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../features/auth/authSlice';
import NavBar from './NavBar';
import Button from '../UI/Button';

import styles from './Header.module.css';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/login');
  };

  return (
    <>
      <header className={styles.header}>
        <div className="logo">
          <Link to="/">Pad6Y Projects</Link>
        </div>
        <ul>
          {user ? (
            <li>
              <Button onClick={onLogout}>
                <FaSignOutAlt /> Logout
              </Button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login">
                  <FaSignInAlt /> Login
                </Link>
              </li>
              <li>
                <Link to="/register">
                  <FaUser /> Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </header>
      <NavBar />
    </>
  );
}
export default Header;
