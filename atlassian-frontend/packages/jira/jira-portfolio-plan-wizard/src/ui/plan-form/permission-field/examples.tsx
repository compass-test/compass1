import React from 'react';

import { fireEvent } from '@testing-library/react';

import Scenario from '../../../common/utils/scenario';
import {
  action,
  withIntl,
  withMaxWidth,
} from '../../../common/utils/storybook';
import Vr from '../../../common/utils/vr';

import PermissionField from './index';

export const basic = () => (
  <PermissionField value={'open'} onChange={action('onChange')} />
);

export const menuIsOpen = () => (
  <Vr clip={{ x: 0, y: 0, width: 508, height: 240 }}>
    <Scenario
      act={async ({ getByText }) => {
        fireEvent.mouseDown(getByText('Open') as Element);
      }}
    >
      {basic()}
    </Scenario>
  </Vr>
);

export default {
  decorators: [withIntl, withMaxWidth()],
};
