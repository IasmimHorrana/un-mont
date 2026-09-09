import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styles from './BilheteCard.module.css';
import { Card } from '../common/Card';
import { IconEnvelope } from '../common/Icon';

export function BilheteCard({ date, isSpecial = false }) {
  const navigate = useNavigate();
  const classes = [styles.card, isSpecial ? styles.dourado : ''].filter(Boolean).join(' ');

  return (
    <Card className={classes} onClick={() => navigate(`/bilhete/${date}`)}>
      <motion.span layoutId={`bilhete-${date}`} className={styles.selo} aria-hidden="true">
        <IconEnvelope size={20} />
      </motion.span>
      <span className={styles.tag}>Bilhete do Dia</span>
    </Card>
  );
}
