import styles from './Header.module.css';
import { useCountdown } from '../../hooks/useCountdown';
import { formatDateNumericPtBR } from '../../utils/date';
import { END_DATE } from '../../utils/constants';

export function Header() {
  const { diasRestantes, fase } = useCountdown();

  if (fase === 'pre-lancamento') {
    return (
      <header className={styles.header}>
        <span className={styles.overline}>Diário Botânico do Amor</span>
        <span className={styles.mensagem}>A contagem começa em breve</span>
      </header>
    );
  }

  if (fase === 'concluido') {
    return (
      <header className={styles.header}>
        <span className={styles.overline}>Diário Botânico do Amor</span>
        <span className={styles.numero}>1 ano</span>
        <span className={styles.legenda}>de amor</span>
      </header>
    );
  }

  return (
    <header className={styles.header}>
      <span className={styles.overline}>Faltam para {formatDateNumericPtBR(END_DATE)}</span>
      <span className={styles.numero}>{diasRestantes}</span>
      <span className={styles.legenda}>dias</span>
    </header>
  );
}
