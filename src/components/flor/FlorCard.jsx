import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styles from './FlorCard.module.css';
import { Card } from '../common/Card';
import { IconFlor } from '../common/Icon';

export function FlorCard({ date, isSpecial = false }) {
  const navigate = useNavigate();
  const classes = [styles.card, isSpecial ? styles.dourado : ''].filter(Boolean).join(' ');

  return (
    <Card className={classes} onClick={() => navigate(`/flor/${date}`)}>
      <motion.span layoutId={`flor-${date}`} className={styles.selo} aria-hidden="true">
        <IconFlor size={20} />
      </motion.span>
      <span className={styles.tag}>Flor do Dia</span>
    </Card>
  );
}
