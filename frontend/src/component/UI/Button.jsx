import styles from './Button.module.css';

function Button({ type, className, children, onClick }) {
  return (
    <button
      type={type}
      className={`${styles.btn} ${styles.btn_block} ${styles[className]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
export default Button;
