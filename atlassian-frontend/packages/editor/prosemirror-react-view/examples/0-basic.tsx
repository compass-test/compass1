import React from 'react';

import styled from 'styled-components';

import {
  BaseTheme,
  indentationSharedStyles,
  inlineNodeSharedStyle,
  listsSharedStyles,
  paragraphSharedStyles,
  shadowSharedStyle,
  whitespaceSharedStyles,
} from '@atlaskit/editor-common';
import { doc, p } from '@atlaskit/editor-test-helpers/doc-builder';
import schema from '@atlaskit/editor-test-helpers/schema';
// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { fontSize as defaultFontSize } from '@atlaskit/theme';

import { Editor } from '../src';

const RequiredStyle = styled.div`
  .ProseMirror {
    outline: none;
    font-size: ${defaultFontSize()}px;

    ${whitespaceSharedStyles};
    ${paragraphSharedStyles};
    ${listsSharedStyles};
    ${indentationSharedStyles};
    ${shadowSharedStyle};
    ${inlineNodeSharedStyle};
  }
`;

export default function Example() {
  return (
    <BaseTheme>
      <RequiredStyle>
        <Editor schema={schema} initialDoc={doc(p('Hello World'))(schema)} />
      </RequiredStyle>
    </BaseTheme>
  );
}
