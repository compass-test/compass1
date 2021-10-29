export function calcDiffInHours(
  timestampA: string,
  timestampB: string,
): number {
  const dateA = new Date(timestampA);
  const dateB = new Date(timestampB);
  const difference = Math.abs(dateA.getTime() - dateB.getTime());
  return difference / 36e5;
}
