const React = require('react');

module.exports = {
  __esModule: true,
  default: ({ children }) =>
    React.createElement(React.Fragment, null, children),
  MainContent: (props) => <div {...props} />,
  SpanAllContent: (props) => <div {...props} />,
  CardGroup: (props) => <div {...props} />,
};
