import React from 'react';
import { LoadingContainer } from './index';
import { generateMetadata } from '../../../common/util/storybook';
import styled from 'styled-components';

export default generateMetadata(
  'ProjectPagesComponent/EmbeddedConfluenceDialog/LoadingBlanket',
);

const StorybookContainer = styled.div`
  width: 800px;
  height: 600px;
  border: 1px solid black;
  background-color: #eef;
`;

export const BlanketNoContent = () => (
  <StorybookContainer>
    <LoadingContainer isLoading={true} />
  </StorybookContainer>
);

export const BlanketIsLoading = () => (
  <StorybookContainer>
    <LoadingContainer isLoading={true}>
      <div>
        You're not meant to see this (but this should be rendered into DOM)
      </div>
    </LoadingContainer>
  </StorybookContainer>
);

export const BlanketNotLoading = () => (
  <StorybookContainer>
    <LoadingContainer isLoading={false}>
      <div>Some visible content</div>
    </LoadingContainer>
  </StorybookContainer>
);
