import { hot } from 'react-hot-loader/root';
import React from 'react';
import ReactDOM from 'react-dom';

import { App as AppComponent } from '@atlassian/dragonfruit-app';

const App = hot(AppComponent);

declare const COMPASS_BUILD_COMMIT_HASH: string;
declare const COMPASS_BUILD_KEY: string;

(window as any).COMPASS_BUILD_VERSION = COMPASS_BUILD_COMMIT_HASH;
(window as any).COMPASS_BUILD_KEY = COMPASS_BUILD_KEY;

ReactDOM.render(<App />, document.getElementById('app'));
