import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styles from './FlorCard.module.css';
import { Card } from '../common/Card';

export function FlorCard({ date, isSpecial = false }) {
  const navigate = useNavigate();
  const classes = [styles.card, isSpecial ? styles.dourado : ''].filter(Boolean).join(' ');

  return (
    <Card className={classes} onClick={() => navigate(`/flor/${date}`)}>
      <motion.span layoutId={`flor-${date}`} className={styles.selo} aria-hidden="true">
        🌸
      </motion.span>
      <div className={styles.texto}>
        <span className={styles.label}>Flor do Dia</span>
      </div>
    </Card>
  );
}
