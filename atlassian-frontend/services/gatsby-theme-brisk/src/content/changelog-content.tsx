import React from 'react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';

export default ({ changelog, components }) => (
  <MDXProvider components={components}>
    {changelog.map(({ version, childMdx }) => {
      return <MDXRenderer id={version}>{childMdx.body}</MDXRenderer>;
    })}
  </MDXProvider>
);
