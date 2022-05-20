import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import styles from './NavBar.module.css';

function NavBar() {
  const { user } = useSelector((state) => state.auth);

  return (
    <nav>
      <ul className={styles.nav_container}>
        <li className={styles.nav_item}>
          <Link to="/">HOME</Link>
        </li>
        <li className={styles.nav_item}>
          <Link to="/users">USERS</Link>
        </li>
        <li className={styles.nav_item}>
          <Link to="/blog">BLOG</Link>
        </li>
        {user && (
          <>
            <li className={styles.nav_item}>
              <Link to="/create">CREATE</Link>
            </li>
            <li className={styles.nav_item}>
              <Link to="/myprojects">MY PROJECTS</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
