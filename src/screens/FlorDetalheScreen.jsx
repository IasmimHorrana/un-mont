import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './FlorDetalheScreen.module.css';
import { BackButton } from '../components/common/BackButton';
import { FlorIllustration } from '../components/flor/FlorIllustration';
import { useDiario } from '../hooks/useDiario';
import { useMarkAsReadOnMount } from '../hooks/useReadTracking';
import { getTodayLocalISO, isUnlocked } from '../utils/date';
import { END_DATE } from '../utils/constants';
import { getFlorInfo } from '../utils/floresPool';

export function FlorDetalheScreen() {
  const { data } = useParams();
  const { byDate } = useDiario();
  useMarkAsReadOnMount(data);

  const hojeISO = getTodayLocalISO();
  if (!isUnlocked(data, hojeISO)) {
    return <Navigate to="/album" replace />;
  }

  const entry = byDate[data];
  const isSpecial = data === END_DATE;
  const florInfo = getFlorInfo(entry?.florId);
  const significado = entry?.significado || florInfo?.significado || '';

  const classesQuadro = [styles.quadro, isSpecial ? styles.dourado : ''].filter(Boolean).join(' ');

  return (
    <div className={styles.screen}>
      <BackButton />
      <div className={styles.conteudo}>
        <motion.div className={classesQuadro} layoutId={`flor-${data}`}>
          <FlorIllustration florId={entry?.florId} fotoFlor={entry?.fotoFlor} size={240} isSpecial={isSpecial} />
        </motion.div>
        <span className={styles.tag}>Flor do Dia</span>
        <h1 className={styles.nome}>{entry?.nomeFlor || florInfo?.nome || 'Flor do dia'}</h1>
        {significado && <p className={styles.significado}>{significado}</p>}
      </div>
    </div>
  );
}
