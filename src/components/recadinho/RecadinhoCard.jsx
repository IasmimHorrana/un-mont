import { useNavigate } from 'react-router-dom';
import styles from './RecadinhoCard.module.css';
import { Card } from '../common/Card';
import { IconPencil } from '../common/Icon';

export function RecadinhoCard() {
  const navigate = useNavigate();

  return (
    <Card className={styles.card} onClick={() => navigate('/recadinho')}>
      <span className={styles.selo} aria-hidden="true">
        <IconPencil size={20} />
      </span>
      <span className={styles.label}>Digite um recadinho aqui...</span>
    </Card>
  );
}
