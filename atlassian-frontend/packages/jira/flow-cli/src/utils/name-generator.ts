export const NameGenerator = (name: string) => {
  let count = 0;
  return {
    getName: () => {
      count = count + 1;
      return `${name}${count}`;
    },
  };
};
