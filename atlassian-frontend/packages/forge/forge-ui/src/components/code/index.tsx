/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { lazy } from 'react';
import { CodeProps } from '@atlassian/forge-ui-types';
import { Props } from '..';
import { useInlineContext } from '../../context/inline';

const AKCodeBlock = lazy(() =>
  import('@atlaskit/code')
    .then((module) => ({
      AkCode: module.Code,
      AkCodeBlock: module.CodeBlock,
    }))
    .then((module) => ({
      default: module.AkCodeBlock,
    })),
);

const AKCodeInline = lazy(() =>
  import('@atlaskit/code')
    .then((module) => ({
      AkCode: module.Code,
      AkCodeBlock: module.CodeBlock,
    }))
    .then((module) => ({
      default: module.AkCode,
    })),
);

const Code: React.FunctionComponent<CodeProps> = ({
  text,
  language = 'text',
  showLineNumbers = true,
}) => {
  const { inline } = useInlineContext();
  return inline ? (
    <AKCodeInline>{text}</AKCodeInline>
  ) : (
    <div
      css={css`
        width: '100%';
      `}
    >
      <AKCodeBlock
        text={text}
        language={language}
        showLineNumbers={showLineNumbers}
      />
    </div>
  );
};

export default Code;

export const CodeFn: React.FunctionComponent<Props> = ({ props }) => {
  const { text, language, showLineNumbers } = props as CodeProps;

  return (
    <Code text={text} language={language} showLineNumbers={showLineNumbers} />
  );
};
