// https://github.com/npm/unique-filename/tree/3653bb94c8ae4497636f0767e0a35eb442b27d9f
declare module 'unique-filename' {
  function uniqueFilename(
    dir: string,
    fileprefix: string,
    uniqstr?: string,
  ): string;
  export default uniqueFilename;
}
