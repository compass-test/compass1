import React from 'react';
import Tabs from '.';
import { createDefaultExport } from '@atlassian/aux-test-utils';

export default createDefaultExport();

export const basic = () => {
  const tabs = [
    { label: 'Chocolate', content: 'chocolate' },
    { label: 'Strawberry', content: 'strawberry' },
    { label: 'Cinnamon', content: 'cinnamon' },
  ];

  return <Tabs tabs={tabs} />;
};
