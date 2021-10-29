import React, { useCallback } from 'react';

import { useCreateTeamCheckin } from '@atlassian/dragonfruit-graphql';
import { useTenantInfo } from '@atlassian/dragonfruit-tenant-context';

import { TeamCheckinForm } from '../../common/ui/team-checkin-form';

import { useFlags } from './flags';

interface Props {
  teamId: string;
  onError?: (err: Error) => void;
  onFailure?: () => void;
  onSuccess?: () => void;
  onCancel?: () => void;
  testId?: string;
}

type onSubmitType = React.ComponentProps<typeof TeamCheckinForm>['onSubmit'];

export const TeamCheckinCreateForm: React.FC<Props> = ({
  teamId,
  onError,
  onFailure,
  onSuccess,
  onCancel,
  testId,
}) => {
  const { showSuccessFlag, showErrorFlag } = useFlags();
  const [mutate] = useCreateTeamCheckin();
  const { cloudId } = useTenantInfo();

  const onSubmit: onSubmitType = useCallback(
    async data => {
      try {
        const result = await mutate({
          cloudId,
          teamId,
          mood: Number.parseInt(data.mood),
          response1: data.response1,
          response2: data.response2,
          response3: data.response3,
        });

        if (result.data?.compass?.createTeamCheckin?.success) {
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
      teamId,
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
      mode="create"
      onCancel={onCancelWrapped}
      onSubmit={onSubmit}
      testId={testId}
    />
  );
};
