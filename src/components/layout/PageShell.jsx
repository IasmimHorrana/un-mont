import { Outlet } from 'react-router-dom';
import styles from './PageShell.module.css';
import { Header } from './Header';
import { BottomNav } from './BottomNav';
import { useCountdown } from '../../hooks/useCountdown';
import { formatDateExtensoPtBR } from '../../utils/date';

export function PageShell() {
  const { hojeISO } = useCountdown();

  return (
    <div className={styles.shell}>
      <Header />
      <main className={styles.content}>
        <Outlet />
      </main>
      <span className={styles.hojeRodape}>{formatDateExtensoPtBR(hojeISO)}</span>
      <BottomNav />
    </div>
  );
}
