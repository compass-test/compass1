import { IconProps } from '@atlassian/performance-portal-common';

export interface SpotlightProps extends JSX.ElementChildrenAttribute {
  unit: string;
  label: string;
  loading?: boolean;
  primaryColor: string;
  Icon: React.ComponentType<IconProps>;
}
