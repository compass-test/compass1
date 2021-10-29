import React from 'react';

import useClipboard from 'react-use-clipboard';

import Button from '@atlaskit/button';
import { CodeBlock } from '@atlaskit/code';
import Tooltip from '@atlaskit/tooltip';

import { PipeReadmeSyntax } from '../types';

import { CopyableCodeWrapper } from './styled';

type Props = {
  pipeReadmeSyntax: PipeReadmeSyntax;
};

const CopyableCode: React.FC<Props> = ({ pipeReadmeSyntax }) => {
  const [isCopied, setCopied] = useClipboard(pipeReadmeSyntax.innerText || '', {
    successDuration: 1500,
  });

  return (
    <CopyableCodeWrapper>
      {isCopied ? (
        <Tooltip position="left" content={'Copied to clipboard'}>
          <Button onClick={setCopied}>Copy</Button>
        </Tooltip>
      ) : (
        <Button onClick={setCopied}>Copy</Button>
      )}
      <CodeBlock
        text={pipeReadmeSyntax.innerText || ''}
        language={pipeReadmeSyntax.language}
        showLineNumbers={false}
      />
    </CopyableCodeWrapper>
  );
};

export default React.memo(CopyableCode);
