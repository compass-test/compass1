import React from 'react';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';

import { CREATE_ERROR, KEY_ERROR } from '../../../state/ui/create-space/types';

import Footer from './index';
import { generateMetadata } from '../../../common/util/storybook';

const defaultEventHandlers = {
  onCreate: action('onCreate'),
  onCancel: action('onCancel'),
  onSpaceNameChanged: action('onSpaceNameChanged'),
};

const Container = styled.div`
  width: 500px;
  outline: 1px dashed lightgray;
  padding: 12px;
`;

const metaData = generateMetadata(
  'ProjectPagesComponent/CreateSpaceDialog/CreateSpaceDialogFooter',
);

metaData.decorators.push((story: Function) => <Container>{story()}</Container>);

export default metaData;

export const DefaultFooter = (props: any) => (
  <Footer {...defaultEventHandlers} {...props} />
);

export const FooterWithSubmitEnabled = (props: any) => (
  <Footer
    {...defaultEventHandlers}
    userEnteredSpaceNameInvalid={false}
    suggestedKey="TEST"
    {...props}
  />
);

export const FooterWhileGeneratingKey = (props: any) => (
  <Footer {...defaultEventHandlers} isGeneratingKey {...props} />
);

export const FooterWhileSubmitting = (props: any) => (
  <Footer {...defaultEventHandlers} isCreatingSpace {...props} />
);

export const FooterWithKeyError = (props: any) => (
  <Footer
    suggestedKey={null}
    userEnteredSpaceName="TEAM"
    errorState={KEY_ERROR}
    {...defaultEventHandlers}
    {...props}
  />
);

export const FooterWithCreateError = (props: any) => (
  <Footer
    suggestedKey={'TE'}
    userEnteredSpaceName={'TEAM'}
    errorState={CREATE_ERROR}
    {...defaultEventHandlers}
    {...props}
  />
);
