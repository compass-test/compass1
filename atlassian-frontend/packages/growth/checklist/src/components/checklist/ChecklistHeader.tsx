// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { colors } from '@atlaskit/theme';
import { UIAnalyticsEvent } from '@atlaskit/analytics-next';
import Button from '@atlaskit/button/standard-button';
import MediaServicesFitToPageIcon from '@atlaskit/icon/glyph/media-services/fit-to-page';
import { HeaderWrapper, DismissButtonWrapper } from './styled';

export interface ChecklistHeaderProps {
  header?: React.ReactNode;
  onClose: (
    e: React.MouseEvent<HTMLElement>,
    analyticsEvent: UIAnalyticsEvent,
  ) => void;
}

export default ({ header, onClose }: ChecklistHeaderProps) => {
  return (
    <HeaderWrapper>
      <div>{header && header}</div>
      <DismissButtonWrapper>
        <Button
          testId="checklist-header-dismiss-link"
          onClick={onClose}
          iconBefore={
            <MediaServicesFitToPageIcon
              label="dismiss"
              primaryColor={colors.N0}
            />
          }
        />
      </DismissButtonWrapper>
    </HeaderWrapper>
  );
};
