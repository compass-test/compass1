import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

// Adding _document.js so that if you hard refresh a page in the browser the styles don't disappear
// https://github.com/zeit/next.js/tree/master/examples/with-styled-components
// https://github.com/zeit/next.js/blob/master/examples/with-styled-components/pages/_document.js
//
// Also overriding render so can add `lang` attribute on `html` element for better accessibility.
export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      // this is to prevent memory leaks but this only exists in style-components v4
      // so commenting out for now until AK & we can upgrade
      // https://github.com/zeit/next.js/pull/6207#issuecomment-460676919
      //sheet.seal()
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="icon"
            type="image/png"
            href="https://wac-cdn.atlassian.com/assets/img/favicons/atlassian/favicon.png"
            sizes="32x32"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
