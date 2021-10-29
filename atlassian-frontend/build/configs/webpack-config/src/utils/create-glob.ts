export function createGlob(glob: string, docs?: boolean): string[] {
  return [
    docs === false ? '' : `${glob}/docs/**/*.+(js|ts|tsx)`,
    docs === false ? '' : `${glob}/CHANGELOG.md`,
    `${glob}/package.json`,
    `${glob}/examples/*.+(js|ts|tsx)`,
  ].filter(Boolean);
}
