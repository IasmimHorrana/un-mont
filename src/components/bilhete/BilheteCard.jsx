import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styles from './BilheteCard.module.css';
import { Card } from '../common/Card';

export function BilheteCard({ date, isSpecial = false }) {
  const navigate = useNavigate();
  const classes = [styles.card, isSpecial ? styles.dourado : ''].filter(Boolean).join(' ');

  return (
    <Card className={classes} onClick={() => navigate(`/bilhete/${date}`)}>
      <motion.span layoutId={`bilhete-${date}`} className={styles.selo} aria-hidden="true">
        💌
      </motion.span>
      <div className={styles.texto}>
        <span className={styles.label}>Bilhete do Dia</span>
        <span className={styles.titulo}>{isSpecial ? 'Uma carta especial' : 'Sua carta de hoje'}</span>
        <span className={styles.dica}>toque para abrir</span>
      </div>
    </Card>
  );
}
