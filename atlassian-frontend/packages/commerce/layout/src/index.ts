export { ResponsiveResize } from './common/ui/responsive-replacement';

export { SpacingScale } from './common/constants';

export {
  Inline,
  InlineLayout,
  inlineFactory,
  inlineLayoutFactory,
  LargeInline,
  LargeInlineLayout,
  SmallInline,
  SmallInlineLayout,
} from './common/ui/spacing/inline';

export {
  Stack,
  StackLayout,
  stackFactory,
  stackLayoutFactory,
  LargeStack,
  LargeStackLayout,
  SmallStack,
  SmallStackLayout,
} from './common/ui/spacing/stack';

export {
  Inset,
  LargeInset,
  SmallInset,
  insetFactory,
} from './common/ui/spacing/inset';

export type {
  UIScale,
  ExtendedUIScale,
  UIScaleIncrements,
  UIScaleExtendedIncrements,
} from './common/types';

export type { InsetProps } from './common/ui/spacing/inset';

export {
  TaskAction,
  TaskCancelAction,
  TaskPrimaryAction,
} from './ui/task-actions';

export type { TaskActionName } from './ui/task-actions';
export { NarrowLayout } from './ui/narrow-layout';

export {
  TaskLayout,
  TaskGap,
  TaskH1,
  TaskH2,
  TaskH1Skeleton,
  TaskSection,
} from './ui/task-layout';

export {
  tryAgainAction,
  contactSupportAction,
  ErrorMessage,
} from './ui/error-message';

export type { ErrorAction } from './ui/error-message';
export { RevealContainer } from './ui/reveal-container';

export { Panel, EditablePanel } from './ui/panel';
export type {
  EditablePanelCommonProps,
  EditablePanelNoEditProps,
  EditablePanelWithEditProps,
  EditablePanelProps,
} from './ui/panel';
