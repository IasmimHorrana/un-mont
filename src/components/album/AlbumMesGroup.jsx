import styles from './AlbumMesGroup.module.css';
import { AlbumDiaCard } from './AlbumDiaCard';
import { formatMonthLabelPtBR } from '../../utils/date';

export function AlbumMesGroup({ month, items, readDates }) {
  return (
    <section className={styles.grupo}>
      <h2 className={styles.titulo}>{formatMonthLabelPtBR(month)}</h2>
      <div className={styles.grade}>
        {items.map((slot) => (
          <AlbumDiaCard key={slot.date} slot={slot} isRead={readDates.has(slot.date)} />
        ))}
      </div>
    </section>
  );
}
