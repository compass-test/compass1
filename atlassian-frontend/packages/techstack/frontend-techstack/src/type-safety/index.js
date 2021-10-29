const typescript = {
  id: 'typescript',
  caption: 'Typescript',
  status: 'recommended',
};

const flow = {
  id: 'flow',
  caption: 'Flow',
  status: 'discouraged',
};

module.exports = {
  id: 'typing',
  caption: {
    'as-a': 'developer',
    'i-want-to': 'have type safety',
  },
  solutions: [typescript, flow],
};
