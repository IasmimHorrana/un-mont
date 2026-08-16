import styles from './ErrorState.module.css';
import { Button } from './Button';

export function ErrorState({
  message = 'Não consegui buscar o diário agora. Que tal tentar de novo?',
  onRetry,
}) {
  return (
    <div className={styles.wrap} role="alert">
      <span className={styles.icon} aria-hidden="true">🥀</span>
      <p>{message}</p>
      {onRetry && <Button onClick={onRetry}>Tentar novamente</Button>}
    </div>
  );
}
