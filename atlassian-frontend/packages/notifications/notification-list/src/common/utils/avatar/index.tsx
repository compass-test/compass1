export function getUserIdFromARI(ari: string) {
  return ari.match(/ari:cloud:identity::user\/([^/]+)$/)?.[1] ?? null;
}

export function getUserAvatarFromARI(ari: string) {
  const userId = getUserIdFromARI(ari);
  if (userId) {
    return `/gateway/api/users/${userId}/avatar`;
  }
  return null;
}
