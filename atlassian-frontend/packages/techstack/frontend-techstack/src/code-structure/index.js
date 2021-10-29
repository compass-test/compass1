const tangerineNext = require('./solutions/tangerine-next');

const tangerineClassic = {
  id: 'tangerine-classic',
  caption: 'Tangerine Classic',
};

module.exports = {
  id: 'code-structure',
  caption: {
    'as-a': 'developer',
    'i-want-to': 'structure my packages',
  },
  solutions: [tangerineNext, tangerineClassic],
};
