import React, { FC, useCallback, useState } from 'react';

import { FormattedMessage } from 'react-intl';

import { ModalTransition } from '@atlaskit/modal-dialog';
import { AnalyticsButton } from '@atlassian/mpt-elements';

import messages from './messages';
import MigrationGatewayModal from './migration-gateway-modal';

export type Props = {
  appearance: 'default' | 'primary';
  destination: string;
  analyticsId?: string;
  getUrl: () => Promise<string>;
  administrator?: string;
};

const ChoiceButton: FC<Props> = ({
  appearance,
  destination,
  analyticsId = 'choose-cloud-button',
  getUrl,
  administrator,
  children,
}) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const goToUrl = useCallback(async () => {
    setIsLoading(true);
    window.location.href = await getUrl();
  }, [getUrl]);

  return (
    <>
      <AnalyticsButton
        appearance={appearance}
        analyticsId={analyticsId}
        onClick={() => setOpen(true)}
      >
        {children || (
          <FormattedMessage
            {...messages.choiceButtonText}
            values={{ destination }}
          />
        )}
      </AnalyticsButton>
      <ModalTransition>
        {isOpen && (
          <MigrationGatewayModal
            destination={destination}
            administrator={administrator}
            isLoading={isLoading}
            onContinue={goToUrl}
            onClose={() => setOpen(false)}
          />
        )}
      </ModalTransition>
    </>
  );
};

export default ChoiceButton;
