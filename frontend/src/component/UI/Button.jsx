import styles from './Button.module.css';

function Button({ type, className, children, onClick, disabled }) {
  return (
    <button
      type={type}
      className={`${styles.btn} ${styles.btn_block} ${styles[className]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
export default Button;
