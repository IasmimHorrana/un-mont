import styles from './Header.module.css';
import { useCountdown } from '../../hooks/useCountdown';
import { formatDatePtBR } from '../../utils/date';

export function Header() {
  const { hojeISO, diasRestantes, fase } = useCountdown();

  const countdownText = fase === 'pre-lancamento'
    ? 'A contagem começa em breve'
    : fase === 'concluido'
      ? '🎉 1 ano de amor!'
      : `🌸 Faltam ${diasRestantes}d para 1 ano`;

  return (
    <header className={styles.header}>
      <span className={styles.countdown}>{countdownText}</span>
      <span className={styles.date}>{formatDatePtBR(hojeISO)}</span>
    </header>
  );
}
