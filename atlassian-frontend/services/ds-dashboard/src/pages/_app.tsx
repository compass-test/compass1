import React from 'react';

import type { AppProps } from 'next/app';
import Head from 'next/head';

/**
 * We need to specify the `/dist/bundle.css` I think
 * because the standard import of `@atlaskit/css-reset` will
 * use the atlaskit:src entrypoint when in the monorepo.
 *
 * This entrypoint is to a js file and does not get recognised
 * by the CSS plugin in webpack.
 *
 * We also need to disable linting because the /dist folder
 * is not tracked so eslint thinks it doesn't exist.
 */
// eslint-disable-next-line
import '@atlaskit/css-reset/dist/bundle.css';

import { FlagsProvider } from '@atlaskit/flag';

import '../styles/global.css';

import DataInfoFlag from '../components/data-info-flag';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <FlagsProvider>
      <DataInfoFlag />
      <Head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <title>DS Dashboard – Prototype</title>
      </Head>
      <Component {...pageProps} />
    </FlagsProvider>
  );
};

export default App;
