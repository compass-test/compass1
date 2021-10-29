import React from 'react';
import { RadioGroup } from './';
import { createDefaultExport } from '@atlassian/aux-test-utils';

export default createDefaultExport();

export const basic = () => {
  const options = [
    { name: 'simple', label: 'Milestone 1', value: '1' },
    { name: 'simple', label: 'Milestone 2', value: '2' },
    { name: 'simple', label: 'Milestone 3', value: '3' },
  ];
  return (
    <RadioGroup name="simple" label="Simple RadioGroup" options={options} />
  );
};

export const withDefaultValue = () => {
  const options = [
    { name: 'default-value', label: 'Milestone 1', value: '1' },
    { name: 'default-value', label: 'Milestone 2', value: '2' },
    { name: 'default-value', label: 'Milestone 3', value: '3' },
  ];

  return (
    <RadioGroup
      name="default-value"
      label="With default value"
      options={options}
      defaultValue={options[1].value}
    />
  );
};

export const description = () => {
  const options = [
    { name: 'simple', label: 'Milestone 1', value: '1' },
    { name: 'simple', label: 'Milestone 2', value: '2' },
    { name: 'simple', label: 'Milestone 3', value: '3' },
  ];
  return (
    <RadioGroup
      name="simple"
      label="Simple RadioGroup"
      options={options}
      description="This is description"
    />
  );
};
