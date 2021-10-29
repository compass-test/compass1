import React, { useCallback } from 'react';

import { useUpdateTeamCheckin } from '@atlassian/dragonfruit-graphql';
import { useTenantInfo } from '@atlassian/dragonfruit-tenant-context';

import { TeamCheckinForm } from '../../common/ui/team-checkin-form';

import { useFlags } from './flags';

interface TeamCheckin {
  id: string;
  mood: string;
  response1?: string;
  response2?: string;
  response3?: string;
}

interface Props {
  teamCheckin: TeamCheckin;
  onError?: (err: Error) => void;
  onFailure?: () => void;
  onSuccess?: () => void;
  onCancel?: () => void;
  testId?: string;
}

type onSubmitType = React.ComponentProps<typeof TeamCheckinForm>['onSubmit'];

export const TeamCheckinEditForm: React.FC<Props> = ({
  teamCheckin,
  onError,
  onFailure,
  onSuccess,
  onCancel,
  testId,
}) => {
  const { showSuccessFlag, showErrorFlag } = useFlags();
  const [mutate] = useUpdateTeamCheckin();
  const { cloudId } = useTenantInfo();

  const { id, ...forwardProps } = teamCheckin;

  const onSubmit: onSubmitType = useCallback(
    async data => {
      try {
        const result = await mutate({
          cloudId,
          id,
          mood: Number.parseInt(data.mood),
          response1: data.response1,
          response2: data.response2,
          response3: data.response3,
        });

        if (result.data?.compass?.updateTeamCheckin?.success) {
          showSuccessFlag();
          onSuccess?.();
        } else {
          showErrorFlag();
          onFailure?.();
        }
      } catch (err) {
        showErrorFlag();
        onError?.(err as Error);
      }
    },
    [
      mutate,
      cloudId,
      id,
      onError,
      onFailure,
      onSuccess,
      showSuccessFlag,
      showErrorFlag,
    ],
  );

  // We're not immediately interested in consuming `e` externally, so this
  // wrapped function has been created to satisfy TypeScript while maintaining
  // the assumptions inherent to `TeamCheckinForm`.
  const onCancelWrapped = useCallback(
    (e: React.MouseEvent) => {
      onCancel?.();
    },
    [onCancel],
  );

  return (
    <TeamCheckinForm
      mode="edit"
      teamCheckin={forwardProps}
      onCancel={onCancelWrapped}
      onSubmit={onSubmit}
      testId={testId}
    />
  );
};
