import { FlorPlaceholder } from './FlorPlaceholder';
import { getFlorInfo } from '../../utils/floresPool';

// Troca por PNGs finais é só adicionar arquivos em /src/assets/flores — zero mudança de código.
const florAssets = import.meta.glob('../../assets/flores/*.{png,svg}', {
  eager: true,
  query: '?url',
  import: 'default',
});

function resolveAssetUrl(florId) {
  const entry = Object.entries(florAssets).find(([path]) => path.includes(`/${florId}.`));
  return entry?.[1] ?? null;
}

export function FlorIllustration({ florId, size = 96, isSpecial = false }) {
  const assetUrl = florId ? resolveAssetUrl(florId) : null;
  const florInfo = getFlorInfo(florId);

  if (assetUrl) {
    return (
      <img
        src={assetUrl}
        alt={florInfo?.nome ?? 'Flor do dia'}
        width={size}
        height={size}
        style={{ objectFit: 'contain' }}
      />
    );
  }

  return <FlorPlaceholder cor={florInfo?.cor} size={size} isSpecial={isSpecial} />;
}
