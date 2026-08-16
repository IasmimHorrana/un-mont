import { useNavigate } from 'react-router-dom';
import styles from './AlbumDiaCard.module.css';
import { formatDatePtBR } from '../../utils/date';

/**
 * SVG em vez de emoji: fontes de emoji (ex. Segoe UI Emoji no Windows) usam glifos em bitmap
 * que ficam borrados quando escalados pequenos — vetor fica nítido em qualquer tamanho/tela.
 */
function FlorIcone() {
  return (
    <svg className={styles.florSvg} viewBox="0 0 100 100" aria-hidden="true">
      <g transform="translate(50,50)">
        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <ellipse key={angle} cx="0" cy="-22" rx="14" ry="24" fill="var(--color-mustard)" transform={`rotate(${angle})`} />
        ))}
        <circle r="14" fill="#fff8e6" />
      </g>
    </svg>
  );
}

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
          {!unlocked ? '🔒' : hasContent ? (isSpecial ? '✨' : <FlorIcone />) : '🌱'}
        </span>
        <span className={styles.diaNumero}>{formatDatePtBR(date)}</span>
      </button>
      {unlocked && hasContent && isRead && (
        <span className={styles.lida} aria-hidden="true">✓</span>
      )}
    </div>
  );
}
