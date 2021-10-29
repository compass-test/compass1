// this component replicates the Confluence loading screen in the iframe as close to pixel-perfect
// as possible, so that we can transition between loading the iframe and rendering the iframe once
// it's ready as seamlessly as possible
import React from 'react';
import styled from 'styled-components';
import { ConfluenceIcon } from '@atlaskit/logo/confluence-icon';
import { N70, N50 } from '@atlaskit/theme/colors';
import { layers } from '@atlaskit/theme/constants';

const Blanket = styled.div`
  z-index: ${layers.blanket()};
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: white;

  display: flex;
  flex-direction: column;
  align-items: center;

  > span {
    margin: 0 auto;
    height: 56px;
    margin: 181px 14px 13px 11px;

    animation: pulse 2s infinite;
    @keyframes pulse {
      0% {
        opacity: 0.7;
      }
      50% {
        opacity: 1;
      }
      100% {
        opacity: 0.7;
      }
    }
  }
`;

const Container = styled.div`
  position: relative;
  height: 100%;
  z-index: 1; // make sure this is on top of the inner modal blanket when it is shown
  iframe {
    background-color: white; // ensure the iframe is not transparent so we won't see the modal blanket under it even if the content is short
  }
`;

// children is always rendered, but the blanket will cover the content unless isLoading=false
export const LoadingContainer = ({
  isLoading,
  children,
}: {
  isLoading: boolean;
  children?: React.ReactNode;
}) => (
  <Container>
    {children}
    {isLoading && (
      <Blanket>
        <ConfluenceIcon iconGradientStart={N70} iconGradientStop={N50} />
      </Blanket>
    )}
  </Container>
);
