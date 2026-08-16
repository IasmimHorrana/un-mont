import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styles from './FlorCard.module.css';
import { Card } from '../common/Card';
import { FlorIllustration } from './FlorIllustration';

export function FlorCard({ date, florId, nomeFlor, isSpecial = false }) {
  const navigate = useNavigate();
  const classes = [styles.card, isSpecial ? styles.dourado : ''].filter(Boolean).join(' ');

  return (
    <Card className={classes} onClick={() => navigate(`/flor/${date}`)}>
      <motion.div layoutId={`flor-${date}`}>
        <FlorIllustration florId={florId} size={72} isSpecial={isSpecial} />
      </motion.div>
      <div className={styles.texto}>
        <span className={styles.label}>🌻 Flor do Dia</span>
        <span className={styles.nome}>{nomeFlor}</span>
      </div>
    </Card>
  );
}
