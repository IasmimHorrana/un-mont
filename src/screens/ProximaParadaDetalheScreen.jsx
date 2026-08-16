import { useState } from 'react';
import styles from './ProximaParadaDetalheScreen.module.css';
import { BackButton } from '../components/common/BackButton';
import { useProximaParada } from '../hooks/useProximaParada';

export function ProximaParadaDetalheScreen() {
  const [imgFailed, setImgFailed] = useState(false);
  const entry = useProximaParada();

  if (!entry || imgFailed) {
    return (
      <div className={styles.screen}>
        <BackButton />
        <div className={styles.pendente}>
          <p>Ainda não escolhemos a próxima parada. 📍</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.screen}>
      <BackButton />
      <div className={styles.conteudo}>
        <div className={styles.moldura}>
          <img
            className={styles.foto}
            src={entry.fotoProximaParada}
            alt={`Foto de ${entry.nomeLocalProximaParada}`}
            onError={() => setImgFailed(true)}
          />
          <span className={styles.legenda}>{entry.nomeLocalProximaParada}</span>
        </div>
      </div>
    </div>
  );
}
