import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

// Adding overriding render so can add `lang` attribute on `html` element for better accessibility.
export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
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
