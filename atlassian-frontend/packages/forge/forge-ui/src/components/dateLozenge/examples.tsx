import React from 'react';
import DateLozenge from '.';
import { createDefaultExport } from '@atlassian/aux-test-utils';

export default createDefaultExport();

export const basic = () => (
  <>
    The date is <DateLozenge value={Date.now()} />
  </>
);
