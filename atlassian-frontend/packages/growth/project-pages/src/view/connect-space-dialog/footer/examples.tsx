import React from 'react';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';

import {
  CONNECT_ERROR,
  FETCH_ERROR,
} from '../../../state/ui/connect-space/types';

import Footer from './index';
import { generateMetadata } from '../../../common/util/storybook';

const defaultEventHandlers = {
  onConnect: action('onConnect'),
  onCancel: action('onCancel'),
};

const Container = styled.div`
  width: 500px;
  outline: 1px dashed lightgray;
  padding: 12px;
`;

const metaData = generateMetadata(
  'ProjectPagesComponent/ConnectSpaceDialog/ConnectSpaceDialogFooter',
);

metaData.decorators.push((story: Function) => <Container>{story()}</Container>);

export default metaData;

export const DefaultFooter = (props: any) => (
  <Footer {...defaultEventHandlers} {...props} />
);

export const FooterWithSubmitEnabled = (props: any) => (
  <Footer {...defaultEventHandlers} isSubmitAllowed {...props} />
);

export const FooterWhileSubmitting = (props: any) => (
  <Footer {...defaultEventHandlers} isSubmitting {...props} />
);

export const FooterWithConnectError = (props: any) => (
  <Footer
    isSubmitAllowed
    hasConnectSpaceError
    errorState={CONNECT_ERROR}
    {...defaultEventHandlers}
    {...props}
  />
);

export const FooterWithFetchError = (props: any) => (
  <Footer
    isSubmitAllowed
    hasConnectSpaceError
    errorState={FETCH_ERROR}
    {...defaultEventHandlers}
    {...props}
  />
);
