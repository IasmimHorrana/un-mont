import { FlorPlaceholder } from './FlorPlaceholder';
import { getFlorInfo } from '../../utils/floresPool';

// Troca por PNGs finais é só adicionar arquivos em /src/assets/flores — zero mudança de código.
const florAssets = import.meta.glob('../../assets/flores/*.{png,webp,svg}', {
  eager: true,
  query: '?url',
  import: 'default',
});

function resolveAssetUrl(florId) {
  const entry = Object.entries(florAssets).find(([path]) => path.includes(`/${florId}.`));
  return entry?.[1] ?? null;
}

export function FlorIllustration({ florId, fotoFlor, size = 96, isSpecial = false }) {
  const florInfo = getFlorInfo(florId);
  // foto_flor da planilha tem prioridade — permite trocar a imagem dia a dia,
  // mesmo quando o nome/espécie da flor se repete em datas diferentes.
  const assetUrl = fotoFlor || (florId ? resolveAssetUrl(florId) : null);

  if (assetUrl) {
    return (
      <img
        src={assetUrl}
        alt={florInfo?.nome ?? 'Flor do dia'}
        width={size}
        height={size}
        style={{ objectFit: 'contain', maxWidth: '100%', height: 'auto' }}
      />
    );
  }

  return <FlorPlaceholder cor={florInfo?.cor} size={size} isSpecial={isSpecial} />;
}
