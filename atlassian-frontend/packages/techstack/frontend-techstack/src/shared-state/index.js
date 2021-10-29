const sweetState = {
  id: 'sweet-state',
  caption: 'React Context and Sweet State',
  href: 'https://github.com/atlassian/react-sweet-state',
  status: 'recommended',
};

const unstated = {
  id: 'unstated',
  caption: 'Unstated',
  href: 'https://github.com/jamiebuilds/unstated',
  status: 'discouraged',
};

const redux = {
  id: 'redux',
  caption: 'Redux',
  href: 'https://redux.js.org/',
  status: 'discouraged',
};

module.exports = {
  id: 'shared-state',
  caption: {
    'as-a': 'developer',
    'i-want-to': 'manage shared state',
  },
  solutions: [sweetState, unstated, redux],
};
