export function trimPackageScope(packageName: string) {
  if (packageName.includes('/')) {
    // Trim the scope e.g. `@atlaskit/button` to `button`.
    packageName = packageName.split('/').pop()!;
  }
  return packageName;
}

/**
 * Construct a branch name for a specific package's skipped tests.
 */
export function getBranchName(packageName: string) {
  packageName = trimPackageScope(packageName);
  const [gitSafeDateLabel, timeLabel] = new Date()
    .toISOString()
    .split(':')
    .join('-')
    .slice(0, -5)
    .split('T');
  const gitSafeTimeLabel = `_T${timeLabel.split('-').join('')}`;
  return `auto-skipped-tests/${gitSafeDateLabel}/${packageName}${gitSafeTimeLabel}`;
}
