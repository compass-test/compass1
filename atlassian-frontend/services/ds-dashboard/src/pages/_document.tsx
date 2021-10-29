import React from 'react';
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';

import { ServerStyleSheet } from 'styled-components';
import createEmotionServer from 'create-emotion-server';
import createCache from '@emotion/cache';

/**
 * There are some issues with SSR when using styled-components with emotion.
 *
 * A solution for this is provided here <https://github.com/styled-components/styled-components/issues/2502>.
 * This is a rewritten version similar to that approach.
 *
 * This uses a custom next.js Document <https://nextjs.org/docs/advanced-features/custom-document>.
 *
 * This does not seem to be needed for deployment, but does make dev mode annoying with some broken
 * styling.
 */
class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const cache = createCache({
      key: 'css',
    });
    const { extractCritical } = createEmotionServer(cache);

    const renderedPage = await ctx.renderPage({
      enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
    });
    ctx.renderPage = () => renderedPage;

    const initialProps = await Document.getInitialProps(ctx);
    const emotionCriticalCSS = extractCritical(renderedPage.html).css;

    return {
      ...initialProps,
      styles: (
        <React.Fragment>
          {initialProps.styles}
          <style>{emotionCriticalCSS}</style>
          {sheet.getStyleElement()}
        </React.Fragment>
      ),
    };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
