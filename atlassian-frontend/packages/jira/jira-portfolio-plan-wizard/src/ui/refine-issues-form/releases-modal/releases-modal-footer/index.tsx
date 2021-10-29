import React from 'react';

import { FormattedMessage } from 'react-intl';

import Button from '@atlaskit/button';
import { ModalFooter, useModal } from '@atlaskit/modal-dialog';
import { fireUIAnalytics } from '@atlassian/analytics-bridge';

import { ReleaseSelectionMode } from '../../../../common/types';

import msgs from './messages';
import { ExcludedCountWrapper, InnerWrapper, Spacing } from './styled';

type Props = {
  onSubmit: () => void;
  numSelectedReleases: number;
  mode: ReleaseSelectionMode;
};

export default function ReleasesModalFooter({
  onSubmit,
  numSelectedReleases,
  mode,
}: Props) {
  const { onClose } = useModal();

  const excludeCountLabel =
    numSelectedReleases === 0 ? null : (
      <FormattedMessage
        {...msgs.selectedReleaseCountLabel}
        values={{ numSelectedReleases }}
      />
    );

  return (
    <ModalFooter>
      <InnerWrapper>
        <ExcludedCountWrapper>{excludeCountLabel}</ExcludedCountWrapper>
        <Button onClick={onClose} appearance="subtle" testId="cancel">
          <FormattedMessage {...msgs.modalClose} />
        </Button>
        <Spacing />
        <Button
          testId="apply"
          onClick={(_, analyticsEvent) => {
            fireUIAnalytics(
              analyticsEvent,
              mode === ReleaseSelectionMode.EXCLUDE
                ? 'excludeReleasesButton'
                : 'includeReleasesButton',
            );
            onSubmit();
          }}
          appearance="primary"
          isDisabled={!numSelectedReleases}
        >
          <FormattedMessage
            {...(mode === ReleaseSelectionMode.EXCLUDE
              ? msgs.modalExclude
              : msgs.modalInclude)}
          />
        </Button>
      </InnerWrapper>
    </ModalFooter>
  );
}
