import { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import styles from './DiaDetalheScreen.module.css';
import { BackButton } from '../components/common/BackButton';
import { FlorIllustration } from '../components/flor/FlorIllustration';
import { BilheteEnvelope } from '../components/bilhete/BilheteEnvelope';
import { DiaCarousel } from '../components/album/DiaCarousel';
import { useDiario } from '../hooks/useDiario';
import { useMarkAsReadOnMount } from '../hooks/useReadTracking';
import { getTodayLocalISO, isUnlocked, formatDatePtBR } from '../utils/date';
import { END_DATE } from '../utils/constants';
import { getFlorInfo } from '../utils/floresPool';

export function DiaDetalheScreen() {
  const { data } = useParams();
  const { byDate } = useDiario();
  const [fotoFalhou, setFotoFalhou] = useState(false);
  useMarkAsReadOnMount(data);

  const hojeISO = getTodayLocalISO();
  if (!isUnlocked(data, hojeISO)) {
    return <Navigate to="/album" replace />;
  }

  const entry = byDate[data];
  const isSpecial = data === END_DATE;
  const florInfo = getFlorInfo(entry?.florId);
  const significado = entry?.significado || florInfo?.significado || '';

  if (!entry?.hasContent) {
    return (
      <div className={styles.screen}>
        <BackButton to="/album" />
        <div className={styles.pendente}>
          <p>O carinho de {formatDatePtBR(data)} ainda está sendo preparado. 🌱</p>
        </div>
      </div>
    );
  }

  const classesQuadro = [styles.quadro, isSpecial ? styles.dourado : ''].filter(Boolean).join(' ');

  const slides = [
    {
      key: 'flor',
      content: (
        <div className={styles.florBloco}>
          <h1 className={styles.nome}>{entry.nomeFlor || florInfo?.nome}</h1>
          <div className={classesQuadro}>
            <FlorIllustration florId={entry.florId} size={200} isSpecial={isSpecial} />
          </div>
          {significado && <p className={styles.significado}>{significado}</p>}
        </div>
      ),
    },
    {
      key: 'bilhete',
      content: <BilheteEnvelope date={data} texto={entry.bilhete} isSpecial={isSpecial} />,
    },
  ];

  if (entry.hasPolaroid && !fotoFalhou) {
    slides.push({
      key: 'polaroid',
      content: (
        <div className={styles.polaroidBloco}>
          <div className={styles.polaroid}>
            <img
              className={styles.foto}
              src={entry.fotoPolaroid}
              alt={`Foto de vocês em ${formatDatePtBR(data)}`}
              onError={() => setFotoFalhou(true)}
            />
            {entry.legendaPolaroid && <span className={styles.legenda}>{entry.legendaPolaroid}</span>}
          </div>
        </div>
      ),
    });
  }

  return (
    <div className={styles.screen}>
      <BackButton to="/album" />
      <DiaCarousel slides={slides} />
    </div>
  );
}
