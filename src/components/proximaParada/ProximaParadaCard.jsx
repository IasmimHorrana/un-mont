import { useNavigate } from 'react-router-dom';
import styles from './ProximaParadaCard.module.css';
import { Card } from '../common/Card';
import { IconPin } from '../common/Icon';

export function ProximaParadaCard() {
  const navigate = useNavigate();

  return (
    <Card className={styles.card} onClick={() => navigate('/proxima-parada')}>
      <span className={styles.selo} aria-hidden="true">
        <IconPin size={20} />
      </span>
      <span className={styles.tag}>Próxima Parada</span>
    </Card>
  );
}
