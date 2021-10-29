import React, { useCallback, useMemo } from 'react';

import Drawer from '@atlaskit/drawer';

import { ContentOverride } from './content-override';
import { MediumCross } from './medium-cross';
import { SidebarOverride } from './sidebar-override';

interface Props {
  onClose?: () => void;
  isOpen?: boolean;
  testId?: string;
}

export const FocusState: React.FC<Props> = ({
  onClose,
  isOpen = false,
  testId,
  children,
}) => {
  const Icon = useMemo(() => {
    const iconTestId = testId && `${testId}.cancel`;

    const Icon: React.FC = () => {
      return <MediumCross testId={iconTestId} />;
    };

    return Icon;
  }, [testId]);

  const overrides = useMemo(
    () => ({
      Sidebar: {
        component: SidebarOverride,
      },
      Content: {
        component: ContentOverride,
      },
    }),
    [],
  );

  const wrappedOnClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  return (
    <Drawer
      width="full"
      icon={Icon}
      isOpen={isOpen}
      onClose={wrappedOnClose}
      shouldUnmountOnExit={false}
      overrides={overrides}
      testId={testId}
    >
      {children}
    </Drawer>
  );
};
