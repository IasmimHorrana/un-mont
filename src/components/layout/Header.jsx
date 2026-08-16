import styles from './Header.module.css';
import { useCountdown } from '../../hooks/useCountdown';
import { formatDateNumericPtBR } from '../../utils/date';
import { END_DATE } from '../../utils/constants';

export function Header() {
  const { diasRestantes, fase } = useCountdown();

  const countdownText = fase === 'pre-lancamento'
    ? '🌿 A contagem começa em breve'
    : fase === 'concluido'
      ? '🎉 1 ano de amor!'
      : `🌿 Faltam ${diasRestantes} dias • ${formatDateNumericPtBR(END_DATE)}`;

  return (
    <header className={styles.header}>
      <span className={styles.countdown}>{countdownText}</span>
    </header>
  );
}
