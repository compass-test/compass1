import React from 'react';

import noop from 'lodash/noop';

import SlackDisabledForm from '../src/ui/ShareToSlack/forms/SlackDisabledForm';

import VrWrapper, { styledForDialog } from './helpers/VrWrapper';

const Component = styledForDialog(SlackDisabledForm);

export default function Example() {
  return (
    <VrWrapper>
      <Component product="jira" onClose={noop} />
    </VrWrapper>
  );
}
