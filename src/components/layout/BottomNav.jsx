import { NavLink } from 'react-router-dom';
import styles from './BottomNav.module.css';
import { IconBook, IconLeaf } from '../common/Icon';

export function BottomNav() {
  const linkClass = ({ isActive }) => `${styles.link} ${isActive ? styles.linkActive : ''}`;

  return (
    <nav className={styles.nav} aria-label="Navegação principal">
      <NavLink to="/album" className={linkClass}>
        <IconBook size={20} />
        Álbum
      </NavLink>
      <NavLink to="/" end className={linkClass}>
        <IconLeaf size={20} />
        Hoje
      </NavLink>
    </nav>
  );
}
