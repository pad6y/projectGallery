import styles from './LoadingSpinner.module.css';

function LoadingSpinner() {
  return (
    <div className={styles.loadingSpinnerContainer}>
      <div className={styles.loadingSpinner}></div>
    </div>
  );
}
export default LoadingSpinner;
