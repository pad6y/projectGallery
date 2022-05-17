import styles from './Card.module.css';

function Card({ heading, projectHead, children }) {
  let content;

  if (heading)
    content = (
      <>
        <h2 className={styles.card_heading}>{heading}</h2>
        <div className={styles.card_content}>{children}</div>
      </>
    );

  if (projectHead)
    content = (
      <>
        <h2 className={`${styles.card_heading} ${styles.project}`}>
          {projectHead}
        </h2>
        <div className={styles.card_content}>{children}</div>
      </>
    );

  return (
    <div className={styles.card}>
      {!heading && !projectHead && (
        <div className={styles.card_content}>{children}</div>
      )}
      {content}
    </div>
  );
}
export default Card;
