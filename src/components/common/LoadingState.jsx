import styles from './LoadingState.module.css';
import { IconLeaf } from './Icon';

export function LoadingState({ message = 'Colhendo o dia de hoje...' }) {
  return (
    <div className={styles.wrap} role="status">
      <span className={styles.bloom} aria-hidden="true">
        <IconLeaf size={36} />
      </span>
      <p>{message}</p>
    </div>
  );
}
