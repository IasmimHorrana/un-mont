import { useNavigate } from 'react-router-dom';
import styles from './ProximaParadaCard.module.css';
import { Card } from '../common/Card';

export function ProximaParadaCard({ nomeLocal }) {
  const navigate = useNavigate();

  return (
    <Card className={styles.card} onClick={() => navigate('/proxima-parada')}>
      <span className={styles.selo} aria-hidden="true">📍</span>
      <div className={styles.texto}>
        <span className={styles.label}>Próxima Parada</span>
        <span className={styles.local}>{nomeLocal}</span>
      </div>
    </Card>
  );
}
