import styles from './LockedBadge.module.css';

export function LockedBadge() {
  return (
    <span className={styles.badge} aria-label="Ainda bloqueado" title="Ainda bloqueado">
      🔒
    </span>
  );
}
