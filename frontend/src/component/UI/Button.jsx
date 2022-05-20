import styles from './Button.module.css';

function Button({ type, className, children, onClick, disabled }) {
  const activeClass = !disabled ? `${styles[className]}` : `${styles.disabled}`;

  return (
    <button
      type={type}
      className={`${styles.btn} ${styles.btn_block} ${activeClass}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
export default Button;
