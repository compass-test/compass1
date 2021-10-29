import React, { ReactElement } from 'react';

import { number, text } from '@storybook/addon-knobs';
import styled from 'styled-components';

import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { InlineErrorMessage } from './index';

export default {
  decorators: [
    (storyFn: () => ReactElement) => (
      <CompassTestProvider>{storyFn()}</CompassTestProvider>
    ),
  ],
};

export const InlineErrorMessageExample = () => {
  const message = text('message', 'This scorecard was recently deleted.');

  const width = number('Max width', 500);

  const Container = styled.div`
    width: ${width}px;
  `;

  return (
    <Container>
      <InlineErrorMessage message={message} />
    </Container>
  );
};
