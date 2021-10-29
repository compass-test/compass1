import {
  ErrorFlagIcon,
  InfoFlagIcon,
  SuccessFlagIcon,
  WarningFlagIcon,
} from './ui/flag-icon';

export {
  ContentSection,
  ContentSectionEmptyState,
  StarredStatusButton,
} from './ui';

export { Dependencies } from './ui/assets';

export { MainContainer } from './ui/main-container';
export { RightSidebarContainer } from './ui/right-sidebar-container';

export { lineClamp } from './ui/styled';

export { InlineWrapper, InlineReadView } from './common/ui';
export { default as InlineTextArea } from './ui/inline-text-area';
export type { InlineTextAreaProps } from './ui/inline-text-area';
export { ConfirmationModal, DeleteModal, useModalControls } from './ui/modals';
export { FocusState } from './ui/focus-state';
export { useInlineEdit } from './services/use-inline-edit';

export {
  ErrorFlagIcon,
  InfoFlagIcon,
  SuccessFlagIcon,
  WarningFlagIcon,
} from './ui/flag-icon';

export { FormFieldWrapper } from './ui/form/field-wrapper';

export { DefaultList } from './ui/default-list';
export { List } from './ui/list';

export { default as SmartLinkWithFallback } from './common/ui/smart-link';
export { SmartLinkDelete } from './ui/smart-link-delete';
export { SmartLinkListItem } from './ui/smart-link-list';

export { Card, CardBody } from './common/ui/card';
export { PageWrapper } from './ui/page-wrapper';
export { Disclosure } from './common/ui/disclosure';
export { Divider } from './common/ui/divider';

export { BreadcrumbsLink } from './ui/breadcrumbs-link';

export const BaseSuccessFlagProps = {
  icon: SuccessFlagIcon,
  isAutoDismiss: true,
};

export const BaseWarningFlagProps = {
  icon: WarningFlagIcon,
  isAutoDismiss: true,
};

export const BaseErrorFlagProps = {
  icon: ErrorFlagIcon,
  isAutoDismiss: true,
};

export const BaseInfoFlagProps = {
  icon: InfoFlagIcon,
  isAutoDismiss: false,
};

export { default as LoadingView } from './ui/loading-view';

export {
  AvatarContentAction,
  actionButtonTheme,
  ContentTypeDecorator,
  LinkWrapper,
  TextOverflowWrapper,
} from './ui/avatar-content-action';
