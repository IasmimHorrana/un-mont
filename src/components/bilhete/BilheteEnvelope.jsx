import { motion } from 'framer-motion';
import styles from './BilheteEnvelope.module.css';

/**
 * Scroll vertical interno (não swipe lateral) — evita conflito com o gesto
 * nativo de voltar do iOS/PWA e é o padrão natural para ler texto longo.
 */
export function BilheteEnvelope({ date, texto, isSpecial = false }) {
  const classes = [styles.envelope, isSpecial ? styles.dourado : ''].filter(Boolean).join(' ');

  return (
    <motion.div
      layoutId={`bilhete-${date}`}
      className={classes}
      initial={{ opacity: 0, scaleY: 0.85 }}
      animate={{ opacity: 1, scaleY: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      style={{ transformOrigin: 'top' }}
    >
      <span className={styles.selo} aria-hidden="true">💌</span>
      <div className={styles.corpo}>{texto}</div>
    </motion.div>
  );
}
