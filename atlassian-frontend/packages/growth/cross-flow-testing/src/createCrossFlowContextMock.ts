import type {
  CrossFlowContextType,
  OnOpen,
} from '@atlassiansox/cross-flow-api-internals';

export const createCrossFlowContextMock = (
  isEnabled: boolean,
  onOpen: OnOpen,
): CrossFlowContextType => {
  return {
    isEnabled,
    api: {
      open: onOpen,
    },
  } as CrossFlowContextType;
};

export const createCrossFlowEnabledContextMock = (onOpen: OnOpen) =>
  createCrossFlowContextMock(true, onOpen);

export const createCrossFlowDisabledContextMock = (onOpen: OnOpen) =>
  createCrossFlowContextMock(false, onOpen);
