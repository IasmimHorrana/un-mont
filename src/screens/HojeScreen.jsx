import styles from './HojeScreen.module.css';
import { useDiario } from '../hooks/useDiario';
import { useCountdown } from '../hooks/useCountdown';
import { LoadingState } from '../components/common/LoadingState';
import { ErrorState } from '../components/common/ErrorState';
import { FlorCard } from '../components/flor/FlorCard';
import { BilheteCard } from '../components/bilhete/BilheteCard';
import { PolaroidCard } from '../components/polaroid/PolaroidCard';
import { ProximaParadaCard } from '../components/proximaParada/ProximaParadaCard';
import { useProximaParada } from '../hooks/useProximaParada';
import { END_DATE } from '../utils/constants';

export function HojeScreen() {
  const { status, byDate, error, refetch } = useDiario();
  const { hojeISO, fase } = useCountdown();
  const proximaParada = useProximaParada();

  if (status === 'loading') return <LoadingState />;
  if (status === 'error') {
    return <ErrorState message={error?.message} onRetry={refetch} />;
  }

  if (fase === 'pre-lancamento') {
    return (
      <div className={styles.pendente}>
        <span className={styles.icone} aria-hidden="true">🌱</span>
        <p>A nossa contagem regressiva ainda não começou. Volte em 16 de agosto!</p>
      </div>
    );
  }

  const entry = byDate[hojeISO];
  const isSpecial = hojeISO === END_DATE;

  if (!entry?.hasContent) {
    return (
      <div className={styles.pendente}>
        <span className={styles.icone} aria-hidden="true">🌱</span>
        <p>O carinho de hoje ainda está sendo preparado. Volte daqui a pouco.</p>
      </div>
    );
  }

  return (
    <>
      <FlorCard date={hojeISO} isSpecial={isSpecial} />
      <BilheteCard date={hojeISO} isSpecial={isSpecial} />
      {entry.hasPolaroid && <PolaroidCard date={hojeISO} />}
      {proximaParada && <ProximaParadaCard nomeLocal={proximaParada.nomeLocalProximaParada} />}
    </>
  );
}
