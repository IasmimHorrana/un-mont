import { useNavigate } from 'react-router-dom';
import styles from './BackButton.module.css';

export function BackButton({ to }) {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className={styles.back}
      onClick={() => (to ? navigate(to) : navigate(-1))}
    >
      ← Voltar
    </button>
  );
}
