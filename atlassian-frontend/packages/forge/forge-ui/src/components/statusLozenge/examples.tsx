import React from 'react';
import StatusLozenge from '.';
import { createDefaultExport } from '@atlassian/aux-test-utils';

export default createDefaultExport();

export const basic = () => (
  <>
    This is a default lozenge:{' '}
    <StatusLozenge appearance="default" text="Default" />{' '}
    <StatusLozenge appearance="inprogress" text="In Progress" />
  </>
);
