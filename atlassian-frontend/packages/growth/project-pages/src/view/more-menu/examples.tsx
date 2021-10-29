import React from 'react';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';
import fetchMock from 'fetch-mock/cjs/client';
import MoreMenu from './index';
import { mockIntl, generateMetadata } from '../../common/util/storybook';

const initMock = ({
  cloudId,
  message = 'STG-EXT-534',
}: {
  cloudId: string;
  message?: string;
}) => {
  fetchMock.post(
    `/gateway/api/engage-targeting/api/v2/user/${cloudId}/messages/${message}/start`,
    204,
  );
};

const defaultProps = {
  intl: mockIntl,
  isSpaceConnected: false,
  triggerShowConnectSpaceDialog: action(
    'triggerShowConnectSpaceDialog triggered',
  ),
};

const defaultEventHandlers = {};

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
`;

const metaData = generateMetadata('ProjectPagesComponent/MoreMenu');

metaData.decorators.push((story: Function) => <Container>{story()}</Container>);

export default metaData;

export const NoSpaceConnected = (props: any) => {
  fetchMock.restore();
  initMock({ cloudId: 'my-cloud-id' });
  return (
    <MoreMenu
      {...defaultProps}
      {...defaultEventHandlers}
      {...props}
      cloudId="my-cloud-id"
    />
  );
};

export const MoreMenuSpaceConnected = (props: any) => {
  fetchMock.restore();
  initMock({ cloudId: 'my-cloud-id' });
  return (
    <MoreMenu
      {...defaultProps}
      {...defaultEventHandlers}
      {...props}
      isSpaceConnected
      cloudId="my-cloud-id"
    />
  );
};
