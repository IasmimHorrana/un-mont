const DRIVE_FILE_RE = /drive\.google\.com\/file\/d\/([^/]+)/;

/**
 * Um link de compartilhamento do Drive ("/file/d/ID/view") carrega uma página HTML,
 * não a imagem crua — não funciona direto num <img src>. Reescreve para o formato
 * de hotlink do googleusercontent quando reconhece esse padrão; outras URLs (Imgur etc.)
 * passam intactas.
 */
export function toDirectImageUrl(url) {
  if (!url) return url;
  const match = DRIVE_FILE_RE.exec(url);
  if (!match) return url;
  return `https://lh3.googleusercontent.com/d/${match[1]}`;
}
