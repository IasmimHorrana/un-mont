import styles from './LoadingState.module.css';

export function LoadingState({ message = 'Colhendo o dia de hoje...' }) {
  return (
    <div className={styles.wrap} role="status">
      <span className={styles.bloom} aria-hidden="true">🌱</span>
      <p>{message}</p>
    </div>
  );
}
