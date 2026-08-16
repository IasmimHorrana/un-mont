import { Outlet } from 'react-router-dom';
import styles from './PageShell.module.css';
import { Header } from './Header';
import { BottomNav } from './BottomNav';

export function PageShell() {
  return (
    <div className={styles.shell}>
      <Header />
      <main className={styles.content}>
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
