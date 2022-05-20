import { FaLinkedin, FaGithub } from 'react-icons/fa';

import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={`${styles.footer} center`}>
      <div className={styles.icons_container}>
        <div className={styles.footer_container}>
          <a
            href="https://www.linkedin.com/in/pad6y/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/pad6y"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
        </div>
        <h3>&copy; Pad6y Projects</h3>
      </div>
    </footer>
  );
}
export default Footer;
