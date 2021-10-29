import { useCallback, useState } from 'react';

import { useModalControls } from '@atlassian/dragonfruit-common-ui';
import { CompassComponentType } from '@atlassian/dragonfruit-graphql';

import { onFormSubmitType } from './types';

export const useConfirmationModalController: (props: {
  onSubmit: onFormSubmitType;
}) => [
  {
    isOpen: boolean;
    onSubmit: () => Promise<void>;
  },
  {
    open: () => void;
    close: () => void;
    setComponent: (
      componentId: string,
      componentName: string,
      componentType: CompassComponentType,
    ) => void;
  },
] = ({ onSubmit: onFormSubmit }) => {
  const [{ isOpen }, { open, close }] = useModalControls();

  const [componentId, setComponentId] = useState('');
  const [componentName, setComponentName] = useState('');
  const [componentType, setComponentType] = useState(
    CompassComponentType.SERVICE,
  );

  // we need to store componentId and componentName when the modal is opened
  // by onSubmit function of the form
  const setComponent = useCallback(
    (
      componentId: string,
      componentName: string,
      componentType: CompassComponentType,
    ) => {
      setComponentId(componentId);
      setComponentName(componentName);
      setComponentType(componentType);
    },
    [setComponentId, setComponentName, setComponentType],
  );

  const onSubmit = useCallback(async () => {
    // wait for form to finish submit before closing modal
    // to prevent flash back of picker modal
    await onFormSubmit(componentId, componentName, componentType);
    close();
  }, [onFormSubmit, close, componentId, componentName, componentType]);

  return [
    {
      isOpen,
      onSubmit,
    },
    {
      open,
      close,
      setComponent,
    },
  ];
};
