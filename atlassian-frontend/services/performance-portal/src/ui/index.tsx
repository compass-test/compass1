import React from 'react';
import ReactDOM from 'react-dom';

import { Site } from '@atlassian/performance-portal-site';

ReactDOM.render(
  <Site graphqlEndpoint={'/graphql'} />,
  document.getElementById('app'),
);
