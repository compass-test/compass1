import React from 'react';

import noop from 'lodash/noop';

import SlackConsentPrimer from '../src/ui/ShareToSlack/forms/SlackConsentPrimer';

import VrWrapper, { styledForDialog } from './helpers/VrWrapper';

const Component = styledForDialog(SlackConsentPrimer);

export default function Example() {
  return (
    <VrWrapper>
      <Component product="jira" onConfirm={noop} onCancel={noop} />
    </VrWrapper>
  );
}
