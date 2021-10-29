const emotionCore = {
  id: 'emotion-core',
  caption: 'Emotion Core',
  href: 'https://emotion.sh',
  description: "Emotion without 'styled', for smaller bundle size",
  status: 'recommended',
};

const emotion = {
  id: 'emotion',
  caption: 'Emotion',
  href: 'https://emotion.sh',
};

const styledComponents = {
  id: 'styled-components',
  caption: 'Styled Components',
  href: 'https://www.styled-components.com',
};

const inlineStyles = {
  id: 'inline-styles',
  caption: 'Inline styles',
  status: 'unavailable',
};

const globalStyles = {
  id: 'global-styles',
  caption: 'Global styles',
  description: "Good ol' stylesheets",
  status: 'unavailable',
};

module.exports = {
  id: 'styling',
  caption: {
    'as-a': 'developer',
    'i-want-to': 'style my experiences',
  },
  solutions: [
    emotionCore,
    emotion,
    styledComponents,
    inlineStyles,
    globalStyles,
  ],
};
