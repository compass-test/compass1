const atlassianRouter = {
  id: 'atlassian-router',
  caption: 'React Resource Router',
  href: 'https://github.com/atlassian-labs/react-resource-router',
  status: 'recommended',
  firstParty: true,
};

const reactRouter = {
  id: 'react-router',
  caption: 'React Router',
};

const reduxFirstRouter = {
  id: 'redux-first-router',
  caption: 'Redux First Router',
  status: 'discouraged',
};

module.exports = {
  id: 'routing',
  caption: {
    'as-a': 'developer',
    'i-want-to': 'do routing',
  },
  solutions: [atlassianRouter, reactRouter, reduxFirstRouter],
};
