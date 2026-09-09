import { useNavigate } from 'react-router-dom';
import styles from './AlbumDiaCard.module.css';
import { formatDatePtBR } from '../../utils/date';
import { IconCheck } from '../common/Icon';

export function AlbumDiaCard({ slot, isRead }) {
  const navigate = useNavigate();
  const { date, unlocked, hasContent, isSpecial, isToday } = slot;

  const classes = [
    styles.diaCard,
    !unlocked ? styles.bloqueado : '',
    unlocked && !hasContent ? styles.pendente : '',
    unlocked && isSpecial ? styles.dourado : '',
    unlocked && !isSpecial && isToday ? styles.hoje : '',
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
        {formatDatePtBR(date)}
      </button>
      {unlocked && hasContent && isRead && (
        <span className={styles.lida} aria-hidden="true"><IconCheck size={11} /></span>
      )}
    </div>
  );
}
