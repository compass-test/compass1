import React, { useCallback, useEffect, useMemo, useState } from 'react';
import CoordinationClient from '@atlassiansox/engagekit/dist/esm/coordination/coordination-client';
import InlineOnboarding from '../../common/onboarding/inline-onboarding';
import { Products } from '../../common/product-context';
import { useClients } from '../../confluence/clients';
import styled from 'styled-components';
// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { gridSize } from '@atlaskit/theme';

interface OnboardingProps {
  primaryProduct: Products;
  activeProduct: Products;
}

const InlineDialogWrapper = styled.div`
  padding: ${`${gridSize() * 2}px`};
`;

const getMessageId = (primaryProduct: Products): string => {
  switch (primaryProduct) {
    case Products.confluence:
      return 'confluence-cross-prod-inline';
    default:
      return ''; //ignore
  }
};

const useCoordinationClient = (
  client: any,
  messageId: string,
): [boolean, () => void] => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    client.start(messageId).then(setIsVisible);
  }, [client, messageId]);

  const stop = useCallback(() => {
    client.stop(messageId);
    setIsVisible(false);
  }, [client, setIsVisible, messageId]);

  return [isVisible, stop];
};

const DialogInlineOnboarding = React.memo(
  ({ primaryProduct, activeProduct }: OnboardingProps) => {
    const { cloudId: confluenceCloudId } = useClients();

    const stargateUrl = '/gateway/api';
    const messageId = getMessageId(primaryProduct);

    const client = useMemo(
      () => new CoordinationClient(confluenceCloudId, stargateUrl),
      [confluenceCloudId, stargateUrl],
    );

    const [isVisible, onStop] = useCoordinationClient(client, messageId);

    if (isVisible && activeProduct !== primaryProduct) {
      // if user has switched the tab.
      onStop();
      return null;
    }

    if (!isVisible) {
      // if user has seen and pressed `Got it`.
      return null;
    }

    return (
      <InlineDialogWrapper>
        <InlineOnboarding onClose={onStop} />{' '}
      </InlineDialogWrapper>
    );
  },
);

export default DialogInlineOnboarding;
