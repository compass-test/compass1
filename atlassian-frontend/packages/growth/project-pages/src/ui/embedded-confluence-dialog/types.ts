import { NavigationPolicy } from '@atlassian/embedded-confluence/navigationPolicy';

export interface OwnProps {
  spaceKey: string | null;
  parentProduct: string;
}
export interface DispatchProps {}

export interface Props extends OwnProps, DispatchProps {}

// Edit/View leaf components
export interface PageDialogProps {
  contentId: string;
  spaceKey: string;
  parentProduct: string;
  navigationPolicy: NavigationPolicy;
}

export interface CloseModalOpts {
  closeOuterModal: boolean;
  updatePageTree: boolean;
}
