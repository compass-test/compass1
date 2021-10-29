import React from 'react';
import {
  WithDispatch,
  ForgeDoc,
  EffectsDispatcher as LegacyDispatch,
} from '@atlassian/forge-ui-types';

type LegacyRenderFn = (props: {
  aux: ForgeDoc | undefined;
  dispatch: LegacyDispatch;
  Components: LegacyComponentMap;
  onInitialRender?: () => void;
}) => React.ReactNode;

type LegacyRenderChildrenFn = (props: {
  render: LegacyRenderFn;
  children: ForgeDoc[];
  dispatch: LegacyDispatch;
  Components: LegacyComponentMap;
}) => React.ReactNode;

export type Props = WithDispatch<ForgeDoc> & {
  render: LegacyRenderFn;
  renderChildren: LegacyRenderChildrenFn;
  Components: LegacyComponentMap;
};

export type LegacyComponentMap = {
  [name: string]: React.FunctionComponent<Props>;
};

export { ModalErrorPanel, makeModalErrorPanel } from './errorPanel';

export {
  makeThreeLOPrompt,
  makeModalThreeLOPrompt,
  makeModalThreeLOPromptForCustomUI,
  ModalThreeLOPrompt,
  ThreeLOPrompt,
} from './threeLOPrompt';

export { makeUser, makeUser as makeAvatar } from './user';
export { makeUserGroup, makeUserGroup as makeAvatarStack } from './userGroup';
export { isProductKey, makeUserPicker } from './userPicker';

export { useButton, AkButton, ButtonSet } from './button';
export { useForm, AkForm, AkFormFooter, AkFormField } from './form';
export { useInlineDialog } from './inlineDialog';
export { useModalDialog, AkModalDialog } from './modalDialog';
