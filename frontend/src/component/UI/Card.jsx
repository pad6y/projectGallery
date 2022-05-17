import styles from './Card.module.css';

function Card({ heading, projectHead, children }) {
  let content;

  if (heading)
    content = (
      <div className={styles.card}>
        <h2 className={styles.card_heading}>{heading}</h2>
        <div className={styles.card_content}>{children}</div>
      </div>
    );

  if (projectHead)
    content = (
      <div className={styles.card}>
        <h2 className={`${styles.card_heading} ${styles.project}`}>
          {projectHead}
        </h2>
        <div className={styles.card_content}>{children}</div>
      </div>
    );

  return content;
}
export default Card;
