import React, { ReactElement, useState } from 'react';

import { CompassComponentType } from '@atlassian/dragonfruit-graphql';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { ComponentTypeSelect } from './index';

export default {
  decorators: [
    (storyFn: () => ReactElement) => (
      <CompassTestProvider>{storyFn()}</CompassTestProvider>
    ),
  ],
};

export const ComponentTypesExample = () => {
  const [currentType, setCurrentType] = useState(CompassComponentType.SERVICE);
  const onChange = (selectedType: CompassComponentType) => {
    setCurrentType(selectedType);
  };
  return <ComponentTypeSelect value={currentType} onChange={onChange} />;
};

export const ComponentTypesExampleDisabled = () => {
  const [currentType, setCurrentType] = useState(
    CompassComponentType.APPLICATION,
  );
  const onChange = (selectedType: CompassComponentType) => {
    setCurrentType(selectedType);
  };
  return (
    <ComponentTypeSelect value={currentType} onChange={onChange} isDisabled />
  );
};
