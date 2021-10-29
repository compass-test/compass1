const testingLibrary = {
  id: 'testing-library',
  caption: 'React Testing Library',
  href: 'https://testing-library.com/docs/react-testing-library/intro',
};

const enzyme = {
  id: 'enzyme',
  caption: 'Enzyme',
  href: 'https://airbnb.io/enzyme',
};

module.exports = {
  id: 'unit-testing',
  caption: {
    'as-a': 'developer',
    'i-want-to': 'unit test my components',
  },
  tags: ['testing'],
  solutions: [testingLibrary, enzyme],
};
