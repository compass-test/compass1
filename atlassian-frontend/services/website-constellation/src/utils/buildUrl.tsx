import resolveLocalisation from './resolveLocalisation';

export const buildUrl = (slugs: string[] = []) => {
  // ['path', 'subpath'] => /path/subpath
  let URL = slugs
    .map((s) => {
      if (s) {
        return `/${resolveLocalisation(s)}`;
      }
      return '';
    })
    .join('')
    .toLocaleLowerCase();
  return URL;
};
