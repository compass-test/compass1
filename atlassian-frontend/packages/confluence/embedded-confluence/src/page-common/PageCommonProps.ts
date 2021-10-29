import type { NavigationPolicy } from '../navigationPolicy';

export type ParentProductEntityIds = {
  parentProductContentContainerId?: string;
  parentProductContentId?: string;
};

export type PageCommonProps = ParentProductEntityIds & {
  hostname?: string;
  navigationPolicy?: NavigationPolicy;
  spaceKey?: string;
};
