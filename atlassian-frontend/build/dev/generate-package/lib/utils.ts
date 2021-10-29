export const kebabToPascal = (kebab: string): string =>
  // Capture the first letter and any letters preceded by a hyphen
  kebab.replace(/^([a-z])|-([a-z])/g, (m, groupA, groupB) => {
    const letter = groupA || groupB;
    return letter.toUpperCase();
  });

export const validateSlug = (str: string): boolean =>
  // Can only contain lowercase letters, hyphens and underscores.
  // Must start and end with a lowercase letter.
  Boolean(str.match(/(^[a-z]$|^[a-z]([a-z]|-|_)*[a-z]$)/));
