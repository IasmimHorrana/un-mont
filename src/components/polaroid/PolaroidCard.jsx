import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styles from './PolaroidCard.module.css';
import { Card } from '../common/Card';

export function PolaroidCard({ date }) {
  const navigate = useNavigate();

  return (
    <Card className={styles.card} onClick={() => navigate(`/polaroid/${date}`)}>
      <motion.span layoutId={`polaroid-${date}`} className={styles.selo} aria-hidden="true">
        📷
      </motion.span>
      <div className={styles.texto}>
        <span className={styles.label}>Polaroid do Dia</span>
      </div>
    </Card>
  );
}
