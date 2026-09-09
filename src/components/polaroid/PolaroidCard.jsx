import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styles from './PolaroidCard.module.css';
import { Card } from '../common/Card';
import { IconCamera } from '../common/Icon';

export function PolaroidCard({ date }) {
  const navigate = useNavigate();

  return (
    <Card className={styles.card} onClick={() => navigate(`/polaroid/${date}`)}>
      <motion.span layoutId={`polaroid-${date}`} className={styles.selo} aria-hidden="true">
        <IconCamera size={20} />
      </motion.span>
      <span className={styles.tag}>Polaroid do Dia</span>
    </Card>
  );
}
