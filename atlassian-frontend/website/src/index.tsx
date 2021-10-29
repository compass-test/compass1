import React from 'react';
import ReactDOM, { render } from 'react-dom';
import axe from '@axe-core/react';
import cssResetStyles from '@atlaskit/css-reset';
import insertStyleSheetInHead from './utils/insertStyleSheetInHead';
import { hasQueryParam } from './utils/url';
import App from './containers/App';

insertStyleSheetInHead(cssResetStyles);

if (process.env.NODE_ENV === 'development' && hasQueryParam('a11y')) {
  axe(React, ReactDOM, 1000);
}
render(<App />, document.getElementById('app'));
