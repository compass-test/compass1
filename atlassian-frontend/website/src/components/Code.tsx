import React from 'react';
import AKCodeBlock from '@atlaskit/code/block';
import GlobalTheme from '@atlaskit/theme/components';

import { replaceSrc } from '@atlaskit/docs';
import { replaceImports } from 'codesandboxer';

export type Props = {
  content: string;
  grammar: 'jsx';
  language: 'javascript';
  name: string;
};

export default function CodeBlock(props: Props) {
  const srcFixed = replaceSrc(props.content, props.name);
  const src = replaceImports(srcFixed, [
    ['../glyph/*', `${props.name}/glyph/`],
  ]);

  return (
    <GlobalTheme.Provider value={() => ({ mode: 'dark' })}>
      <AKCodeBlock showLineNumbers={false} text={src} language="jsx" />
    </GlobalTheme.Provider>
  );
}
