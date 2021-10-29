/** @jsx jsx */
import { jsx } from '@emotion/core';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import CodeBlock from '@atlaskit/code/block';
import SectionLink from '../components/section-link';

const ContentRenderer = ({ id, body }) => {
  const components = {
    h2: (props) => <SectionLink level={2} {...props} />,
    h3: (props) => <SectionLink level={3} {...props} />,
    img: (props) => (
      <img css={{ width: '100%' }} alt={props.alt || ''} {...props} />
    ),
    code: ({ children }) => (
      <CodeBlock
        text={children}
        language="tsx"
        showLineNumbers={false}
      ></CodeBlock>
    ),
  };

  return (
    <MDXProvider components={components}>
      <MDXRenderer key={id}>{body}</MDXRenderer>
    </MDXProvider>
  );
};

export default ContentRenderer;
