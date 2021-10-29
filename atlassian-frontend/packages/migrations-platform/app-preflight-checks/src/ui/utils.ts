// from https://stackoverflow.com/questions/27194359/javascript-pluralize-a-string
export const pluralize = (count: number, noun: string, suffix = 's') =>
  noun ? `${noun}${count !== 1 ? suffix : ''}` : noun;
