import { useNavigate } from 'react-router-dom';
import styles from './RecadinhoCard.module.css';
import { Card } from '../common/Card';

export function RecadinhoCard() {
  const navigate = useNavigate();

  return (
    <Card className={styles.card} onClick={() => navigate('/recadinho')}>
      <span className={styles.selo} aria-hidden="true">✍️</span>
      <div className={styles.texto}>
        <span className={styles.label}>Digite um recadinho aqui...</span>
      </div>
    </Card>
  );
}
