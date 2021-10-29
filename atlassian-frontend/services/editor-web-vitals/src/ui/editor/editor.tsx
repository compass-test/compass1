import React from 'react';
import { Editor as AKEditor } from '@atlaskit/editor-core';
import styled from 'styled-components';
import { useTTR } from '../use-ttr/use-ttr';

const doc = require('../adf-samples/adf-simple.json');

const EditorContainer = styled.div`
  width: 960px;
  text-align: left;
  padding-bottom: 80px;
`;

export const Editor = () => {
  useTTR();
  return (
    <EditorContainer>
      <AKEditor defaultValue={doc} />
    </EditorContainer>
  );
};
