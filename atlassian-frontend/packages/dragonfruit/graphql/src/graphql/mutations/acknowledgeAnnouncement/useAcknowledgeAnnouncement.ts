import {
  CompassAcknowledgeAnnouncementInput,
  useAcknowledgeAnnouncementMutation,
} from '../../../__generated__/graphql';

export function useAcknowledgeAnnouncement() {
  const [mutate] = useAcknowledgeAnnouncementMutation();

  function handleMutate(
    input: CompassAcknowledgeAnnouncementInput,
    options?: Parameters<typeof mutate>[0],
  ) {
    return mutate({
      variables: { input },
      ...options,
    });
  }

  return [handleMutate];
}
