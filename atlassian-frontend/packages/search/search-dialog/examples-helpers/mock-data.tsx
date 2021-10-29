import faker from 'faker';

export const getMockSearchResults = (num: number) => {
  faker.seed(777);

  return [...Array(num)].map((i, idx) => {
    return {
      id: idx + 1,
      href: '#',
      title: faker.lorem.sentence(),
    };
  });
};
