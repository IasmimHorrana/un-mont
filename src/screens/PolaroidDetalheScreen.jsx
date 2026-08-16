import { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './PolaroidDetalheScreen.module.css';
import { BackButton } from '../components/common/BackButton';
import { useDiario } from '../hooks/useDiario';
import { useMarkAsReadOnMount } from '../hooks/useReadTracking';
import { getTodayLocalISO, isUnlocked, formatDatePtBR } from '../utils/date';

export function PolaroidDetalheScreen() {
  const { data } = useParams();
  const { byDate } = useDiario();
  const [imgFailed, setImgFailed] = useState(false);
  useMarkAsReadOnMount(data);

  const hojeISO = getTodayLocalISO();
  if (!isUnlocked(data, hojeISO)) {
    return <Navigate to="/album" replace />;
  }

  const entry = byDate[data];

  if (!entry?.hasPolaroid || imgFailed) {
    return (
      <div className={styles.screen}>
        <BackButton />
        <div className={styles.pendente}>
          <p>A polaroid de {formatDatePtBR(data)} ainda não chegou. 📷</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.screen}>
      <BackButton />
      <div className={styles.conteudo}>
        <motion.div className={styles.polaroid} layoutId={`polaroid-${data}`}>
          <img
            className={styles.foto}
            src={entry.fotoPolaroid}
            alt={`Foto de vocês em ${formatDatePtBR(data)}`}
            onError={() => setImgFailed(true)}
          />
          {entry.legendaPolaroid && <span className={styles.legenda}>{entry.legendaPolaroid}</span>}
        </motion.div>
      </div>
    </div>
  );
}
