export const wordCounter = (text: string): number => {
  const filteredWords = text.trim().replace(/['";:,.?¿\-!¡]+/g, '');
  return filteredWords ? (filteredWords.match(/\S+/g) || []).length : 0;
};
