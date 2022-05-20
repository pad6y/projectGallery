import styles from './Card.module.css';

function Card({ heading, projectHead, children, className }) {
  let content;

  if (heading)
    content = (
      <>
        <div className={styles.card_heading}>{heading}</div>
        <div className={styles.card_content}>{children}</div>
      </>
    );

  if (projectHead)
    content = (
      <>
        <div className={`${styles.card_heading} ${styles.project}`}>
          {projectHead}
        </div>
        <div className={styles.card_content}>{children}</div>
      </>
    );

  return (
    <div className={`${styles.card} ${className}`}>
      {!heading && !projectHead && (
        <div className={styles.card_content}>{children}</div>
      )}
      {content}
    </div>
  );
}
export default Card;
