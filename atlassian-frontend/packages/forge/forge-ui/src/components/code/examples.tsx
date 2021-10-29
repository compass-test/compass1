import React from 'react';
import Code from './';
import { createDefaultExport } from '@atlassian/aux-test-utils';
import { InlineContext } from '../../context/inline';
import { TextMarkup } from '../text';
import { Strong } from '../markup';

export default createDefaultExport();

const exampleCodeBlock = `  // React Component
  class HelloMessage extends React.Component {
    render() {
      return (
        <div>
          Hello {this.props.name}
        </div>
      );
    }
  }

  ReactDOM.render(
    <HelloMessage name="Taylor" />,
    mountNode
  );
`;

export const basic = () => <Code text={exampleCodeBlock} />;

export const languageSyntaxHighlighting = () => (
  <Code text={exampleCodeBlock} language="javascript" />
);

export const noLineNumbers = () => (
  <Code text={exampleCodeBlock} language="javascript" showLineNumbers={false} />
);

const jsCode = `const map = {}`;

export const inlineCode = () => (
  <InlineContext.Provider value={{ inline: true }}>
    This is inline code <Code text={jsCode} language="javascript" />, check it
    out.
  </InlineContext.Provider>
);

export const codeInsideTextMarkup = () => (
  <TextMarkup>
    This is inline code <Code text={jsCode} language="javascript" /> inside{' '}
    <Strong>TextMarkup</Strong> component. Using <Strong>Code</Strong> component
    inside <Strong>TextMarkup</Strong> will render it inline; block-level
    otherwise.
  </TextMarkup>
);
