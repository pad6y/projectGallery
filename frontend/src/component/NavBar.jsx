import { Link } from 'react-router-dom';

import styles from './NavBar.module.css';

function NavBar() {
  return (
    <nav>
      <ul className={styles.nav_container}>
        <li className={styles.nav_item}>
          <Link to="/">HOME</Link>
        </li>
        <li className={styles.nav_item}>
          <Link to="/create">CREATE</Link>
        </li>
        <li className={styles.nav_item}>
          <Link to="/blog">BLOG</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
