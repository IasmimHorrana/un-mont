import styles from './LockedBadge.module.css';
import { IconLock } from './Icon';

export function LockedBadge() {
  return (
    <span className={styles.badge} aria-label="Ainda bloqueado" title="Ainda bloqueado">
      <IconLock size={16} />
    </span>
  );
}
