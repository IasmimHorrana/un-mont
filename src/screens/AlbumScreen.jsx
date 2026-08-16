import styles from './AlbumScreen.module.css';
import { useDiario } from '../hooks/useDiario';
import { useAlbumSlots } from '../hooks/useAlbumSlots';
import { useReadTracking } from '../hooks/useReadTracking';
import { LoadingState } from '../components/common/LoadingState';
import { ErrorState } from '../components/common/ErrorState';
import { AlbumMesGroup } from '../components/album/AlbumMesGroup';

export function AlbumScreen() {
  const { status, error, refetch } = useDiario();
  const { groups } = useAlbumSlots();
  const { readDates } = useReadTracking();

  if (status === 'loading') return <LoadingState message="Organizando as prateleiras..." />;
  if (status === 'error') {
    return <ErrorState message={error?.message} onRetry={refetch} />;
  }

  return (
    <div className={styles.album}>
      {groups.map(({ month, items }) => (
        <AlbumMesGroup key={month} month={month} items={items} readDates={readDates} />
      ))}
    </div>
  );
}
