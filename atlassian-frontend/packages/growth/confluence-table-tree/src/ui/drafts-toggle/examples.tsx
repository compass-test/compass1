/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import '@atlaskit/css-reset';
import DraftsToggle from './index';
import styled from '@emotion/styled';
import { ConfluencePageTreeProvider } from '../../controllers/page-tree';
import { action } from '@storybook/addon-actions';
import { DEFAULT_LOCALE } from '../translations-provider';

const Container = styled.div`
  border: 1px solid black;
  width: 80vw;
`;

export const Default = () => {
  return (
    <ConfluencePageTreeProvider
      analyticsClient={{
        sendOperationalEvent: action('operational event'),
        sendUIEvent: action('ui event'),
        sendScreenEvent: action('screen event'),
        sendTrackEvent: action('track event'),
      }}
      accountId="foo-account-id"
    >
      <Container>
        <DraftsToggle locale={DEFAULT_LOCALE} />
      </Container>
    </ConfluencePageTreeProvider>
  );
};
