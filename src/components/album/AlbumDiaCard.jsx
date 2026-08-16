import { useNavigate } from 'react-router-dom';
import styles from './AlbumDiaCard.module.css';
import { formatDatePtBR } from '../../utils/date';
import cadeadoImg from '../../assets/cadeado.png';
import florImg from '../../assets/flower.png';

export function AlbumDiaCard({ slot, isRead }) {
  const navigate = useNavigate();
  const { date, unlocked, hasContent, isSpecial } = slot;

  const classes = [
    styles.diaCard,
    !unlocked ? styles.bloqueado : '',
    unlocked && !hasContent ? styles.pendente : '',
    unlocked && isSpecial ? styles.dourado : '',
  ].filter(Boolean).join(' ');

  const label = !unlocked
    ? `Dia ${formatDatePtBR(date)}, ainda bloqueado`
    : hasContent
      ? `Dia ${formatDatePtBR(date)}, abrir flor e bilhete`
      : `Dia ${formatDatePtBR(date)}, em preparação`;

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        className={classes}
        disabled={!unlocked}
        onClick={() => navigate(`/album/${date}`)}
        aria-label={label}
      >
        <span className={styles.icone} aria-hidden="true">
          {!unlocked
            ? <img src={cadeadoImg} className={styles.cadeadoImg} alt="" />
            : hasContent
              ? (isSpecial ? '✨' : <img src={florImg} className={styles.florImg} alt="" />)
              : '🌱'}
        </span>
        <span className={styles.diaNumero}>{formatDatePtBR(date)}</span>
      </button>
      {unlocked && hasContent && isRead && (
        <span className={styles.lida} aria-hidden="true">✓</span>
      )}
    </div>
  );
}
