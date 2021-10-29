import React from 'react';

import { CodeBlock } from '@atlaskit/code';

import CopyButton from './CopyButton';
import { Code } from './styled';

type Props = {
  name: string;
  content: string;
  showLineNumbers: boolean;
  language: string;
};

const CopyableCodeBlock: React.FC<Props> = ({
  name,
  content,
  showLineNumbers,
  language,
}) => {
  return (
    <Code>
      <CodeBlock
        text={content}
        showLineNumbers={showLineNumbers}
        language={language as any}
      />
      <CopyButton name={name} content={content} />
    </Code>
  );
};

export default React.memo(CopyableCodeBlock);
