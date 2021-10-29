import React from 'react';
import { Helmet } from 'react-helmet';
import * as CommonMark from 'commonmark';
import ReactRenderer from 'commonmark-react-renderer';
import styled from 'styled-components';
import { CodeBlock, Code } from '@atlaskit/code';
import type { SupportedLanguages } from '@atlaskit/code/types';
import Heading from './Markdown/Heading';

export type Props = {
  literal: string;
  language: SupportedLanguages;
};

const parser = new CommonMark.Parser();
const markdown = 'markdown';
const renderer = new ReactRenderer({
  renderers: {
    CodeBlock: (props: Props) => (
      <p>
        <CodeBlock text={props.literal} language={props.language || markdown} />
      </p>
    ),
    Code: (props: Props) => <Code>{props.literal}</Code>,
    Heading,
  },
});

export default function Markdown({
  children,
  description,
  styles,
}: {
  children: React.ReactChild;
  description?: string;
  styles?: any;
}) {
  const StyledDiv = styled.div(styles || {});
  return (
    <StyledDiv>
      <Helmet>
        <meta
          name="description"
          // DEFAULT_META_DESCRIPTION is set by webpack config.
          content={description || DEFAULT_META_DESCRIPTION}
        />
      </Helmet>
      {renderer.render(parser.parse(children as string))}
    </StyledDiv>
  );
}
