import React from 'react';
import { ReactRenderer } from '@atlaskit/renderer';
import styled from 'styled-components';
import { useTTR } from '../use-ttr/use-ttr';

const doc = require('../adf-samples/adf-simple.json');

const RendererContainer = styled.div`
  width: 960px;
  text-align: left;
  padding-bottom: 80px;
`;

export const Renderer = () => {
  useTTR();
  return (
    <RendererContainer>
      <ReactRenderer
        document={doc}
        adfStage="stage0"
        appearance="full-page"
        allowDynamicTextSizing={false}
      />
    </RendererContainer>
  );
};
