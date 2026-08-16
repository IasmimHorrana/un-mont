export function readCache(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function writeCache(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify({ value, fetchedAt: Date.now() }));
  } catch {
    // Armazenamento indisponível (ex.: modo privado sem quota) — segue sem cache.
  }
}

export function isFresh(fetchedAt, ttlMs) {
  if (!fetchedAt) return false;
  return Date.now() - fetchedAt < ttlMs;
}
