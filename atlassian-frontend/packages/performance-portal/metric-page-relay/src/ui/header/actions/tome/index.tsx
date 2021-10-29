import React, { useCallback } from 'react';

import { graphql, useFragment } from 'react-relay';

import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import Button from '@atlaskit/button';
import { sendUIEvent } from '@atlassian/performance-portal-analytics';
import { TomeIcon } from '@atlassian/performance-portal-common';
import { TomeModal } from '@atlassian/performance-portal-metric-tome';

// eslint-disable-next-line @atlassian/tangerine/import/no-parent-imports
import { useModalOpenState } from '../utils';

import type { tomeFragment$key } from './__generated__/tomeFragment.graphql';

type Props = {
  data: tomeFragment$key;
};

export const Tome = (props: Props) => {
  const data = useFragment(
    graphql`
      fragment tomeFragment on Metric {
        id
      }
    `,
    props.data,
  );

  const { createAnalyticsEvent } = useAnalyticsEvents();

  const [renderModal, openModal] = useModalOpenState(
    (isOpen, closeModalCallback) => {
      return (
        <TomeModal
          isOpen={isOpen}
          closeModalHandler={closeModalCallback}
          experienceId={data.id}
        />
      );
    },
  );

  const onClick = useCallback(() => {
    const analyticsEvent = createAnalyticsEvent({
      action: 'clicked',
      actionSubject: 'tomeModal',
      source: 'metric',
    });
    sendUIEvent(analyticsEvent);
    openModal();
  }, [createAnalyticsEvent, openModal]);

  return (
    <>
      <Button onClick={onClick} iconBefore={<TomeIcon />}></Button>
      {renderModal()}
    </>
  );
};
