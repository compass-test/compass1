const titleify = (str: string): string => {
  return str
    .split('-')
    .map((chunk, index) => {
      if (index === 0) {
        return chunk.charAt(0).toUpperCase() + chunk.slice(1);
      }
      return chunk;
    })
    .join(' ');
};

export default titleify;
