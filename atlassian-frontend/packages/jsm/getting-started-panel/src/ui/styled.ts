import styled from 'styled-components';
import { N30 } from '@atlaskit/theme/colors';

export const GettingStartedPanelContainer = styled.div`
  background: ${N30};

  box-sizing: content-box;
  width: 320px;
  height: inherit;

  display: flex;
  flex-direction: column;
`;

export const SectionContainer = styled.div`
  box-sizing: content-box;
  width: inherit;
  overflow: hidden;
  flex-grow: 1;

  /* Make sure the sticky header stays sticky. */
  height: 100%;

  display: flex;
  flex-direction: column;
`;

export const SlidingContainer = styled.div`
  max-width: 100%;
  flex-grow: 1;

  overflow-x: hidden;

  /* Make sure the sticky header stays sticky. */
  height: 100%;

  display: flex;
  flex-direction: row;
`;
