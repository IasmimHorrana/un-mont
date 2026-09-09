import styles from './ErrorState.module.css';
import { Button } from './Button';
import { IconLeaf } from './Icon';

export function ErrorState({
  message = 'Não consegui buscar o diário agora. Que tal tentar de novo?',
  onRetry,
}) {
  return (
    <div className={styles.wrap} role="alert">
      <span className={styles.icon} aria-hidden="true">
        <IconLeaf size={32} />
      </span>
      <p>{message}</p>
      {onRetry && <Button onClick={onRetry}>Tentar novamente</Button>}
    </div>
  );
}
