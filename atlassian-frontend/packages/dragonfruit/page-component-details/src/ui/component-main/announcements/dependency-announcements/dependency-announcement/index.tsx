import React, { useState } from 'react';

import LoadingButton from '@atlaskit/button/loading-button';
import { useFlags } from '@atlaskit/flag';
import CheckCircleIcon from '@atlaskit/icon/glyph/check-circle';
import * as colors from '@atlaskit/theme/colors';
import { BaseErrorFlagProps } from '@atlassian/dragonfruit-common-ui';
import { AnnouncementItem } from '@atlassian/dragonfruit-components';
import {
  checkCompassMutationSuccess,
  CompassAnnouncement,
  CompassAnnouncementAcknowledgement,
  CompassComponent,
  useAcknowledgeAnnouncement,
} from '@atlassian/dragonfruit-graphql';
import { Modify, useIntl } from '@atlassian/dragonfruit-utils';

import messages from './messages';
import { AcknowledgedStatus, AcknowledgedStatusText } from './styled';

export type DependencyAnnouncementProps = {
  announcement: Modify<
    CompassAnnouncement,
    {
      component?: Pick<CompassComponent, 'id' | 'type' | 'name'> | null;
    }
  >;
  acknowledgingComponentId: CompassComponent['id'];
};

export function DependencyAnnouncement(props: DependencyAnnouncementProps) {
  const { announcement, acknowledgingComponentId } = props;

  const { formatMessage } = useIntl();
  const [mutate] = useAcknowledgeAnnouncement();

  const acknowledgements = announcement.acknowledgements ?? [];
  const isAcknowledged =
    acknowledgements.find((item: CompassAnnouncementAcknowledgement) => {
      return item.component?.id === acknowledgingComponentId;
    })?.hasAcknowledged ?? false;

  const [alreadyAcknowledged, setAlreadyAcknowledged] = useState<boolean>(
    isAcknowledged,
  );

  const [submitting, setSubmitting] = useState<boolean>(false);

  const { showFlag } = useFlags();

  function acknowledge() {
    setSubmitting(true);
    mutate({
      componentId: acknowledgingComponentId,
      announcementId: announcement.id,
    })
      .then((mutationResult) => {
        // Throws MutationError if mutation unsuccessful
        checkCompassMutationSuccess(
          mutationResult?.data?.compass?.acknowledgeAnnouncement,
        );
        setAlreadyAcknowledged(true);
        setSubmitting(false);
      })
      .catch((error) => {
        showFlag({
          ...BaseErrorFlagProps,
          id: 'acknowledgeAnnouncementFailure',
          title: 'Error',
          description: 'Something went wrong.',
        });
        setSubmitting(false);
      });
  }

  const action = alreadyAcknowledged ? (
    <AcknowledgedStatus>
      <AcknowledgedStatusText
        data-testId={'dependency-announcement.status.acknowledged'}
      >
        {formatMessage(messages.acknowledged)}
      </AcknowledgedStatusText>
      <CheckCircleIcon label="" primaryColor={colors.G300} />
    </AcknowledgedStatus>
  ) : (
    <LoadingButton
      appearance="primary"
      onClick={acknowledge}
      isLoading={submitting}
      testId={
        submitting
          ? 'dependency-announcement.status.acknowledging'
          : 'dependency-announcement.status.waiting'
      }
    >
      {formatMessage(messages.acknowledge)}
    </LoadingButton>
  );

  return (
    <AnnouncementItem
      targetDate={new Date(announcement.targetDate)}
      title={announcement.title ?? ''}
      sourceComponent={announcement.component!}
      description={announcement.description ?? ''}
      acknowledgementAction={action}
    />
  );
}
