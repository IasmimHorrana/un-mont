import { NavLink } from 'react-router-dom';
import styles from './BottomNav.module.css';

export function BottomNav() {
  const linkClass = ({ isActive }) => `${styles.link} ${isActive ? styles.linkActive : ''}`;

  return (
    <nav className={styles.nav} aria-label="Navegação principal">
      <NavLink to="/album" className={linkClass}>
        📖 Álbum
      </NavLink>
      <NavLink to="/" end className={linkClass}>
        ✨ Hoje
      </NavLink>
    </nav>
  );
}
