export function getReleasesFromCli(
  flags: {
    release?: string | string[];
    from?: string;
    to?: string;
  },
  releaseNames: string[],
): string[] {
  const releasesString = JSON.stringify(releaseNames);
  if (flags.release) {
    // specific release
    const { release } = flags;

    const releases = typeof release === 'string' ? [release] : release;
    if (releases.some((name) => releaseNames.indexOf(name) === -1)) {
      throw new Error(
        `One of the specified releases does not exist, check the list of valid releases ${releasesString}`,
      );
    }
    return releases;
  } else if (flags.from && flags.to) {
    const fromIndex = releaseNames.indexOf(flags.from);
    const toIndex = releaseNames.indexOf(flags.to);

    if (toIndex === -1) {
      throw new Error(
        `${flags.to} release does not exist, check the list of valid releases ${releasesString}`,
      );
    }
    if (fromIndex === -1) {
      throw new Error(
        `${flags.from} release does not exist, check the list of valid releases ${releasesString}`,
      );
    }
    if (toIndex < fromIndex) {
      return releaseNames.slice(toIndex, fromIndex + 1);
    }

    return releaseNames.slice(fromIndex, toIndex + 1);
  }

  throw new Error(
    'It was not specified releases or from and to arguments in the cli.',
  );
}
