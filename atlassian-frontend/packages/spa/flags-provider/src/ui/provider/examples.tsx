import React from 'react';

// This shouldn't be a violation. Looks like a build tooling issues
// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import Button from '@atlaskit/button/custom-theme-button';

import { FlagProps } from '../../common/types';
import { useFlags } from '../../controllers/flags';

import { withFlagsProvider } from './index';

const Consumer: React.FC<Partial<FlagProps>> = (props) => {
  const { showFlag } = useFlags();
  const onClick = (): void => {
    showFlag({
      title: 'title',
      description: 'description',
      ...props,
    });
  };
  return <Button onClick={onClick}>add flag</Button>;
};

export const Default: React.FC = () => <Consumer />;

export const AutoDismissFlags: React.FC = () => <Consumer isAutoDismiss />;

export const ErrorAppearanceFlags: React.FC = () => (
  <Consumer appearance="error" />
);

export const InfoAppearanceFlags: React.FC = () => (
  <Consumer appearance="info" />
);

export const WarningAppearanceFlags: React.FC = () => (
  <Consumer appearance="warning" />
);

export default { decorators: [withFlagsProvider] };
