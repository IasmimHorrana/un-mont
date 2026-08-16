import { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import styles from './BilheteDetalheScreen.module.css';
import { BackButton } from '../components/common/BackButton';
import { BilheteEnvelope } from '../components/bilhete/BilheteEnvelope';
import { useDiario } from '../hooks/useDiario';
import { useMarkAsReadOnMount } from '../hooks/useReadTracking';
import { vibrate } from '../hooks/useVibration';
import { getTodayLocalISO, isUnlocked } from '../utils/date';
import { END_DATE } from '../utils/constants';

export function BilheteDetalheScreen() {
  const { data } = useParams();
  const { byDate } = useDiario();
  useMarkAsReadOnMount(data);

  useEffect(() => {
    vibrate();
  }, []);

  const hojeISO = getTodayLocalISO();
  if (!isUnlocked(data, hojeISO)) {
    return <Navigate to="/album" replace />;
  }

  const entry = byDate[data];
  const isSpecial = data === END_DATE;

  return (
    <div className={styles.screen}>
      <BackButton />
      <BilheteEnvelope date={data} texto={entry?.bilhete || ''} isSpecial={isSpecial} />
    </div>
  );
}
