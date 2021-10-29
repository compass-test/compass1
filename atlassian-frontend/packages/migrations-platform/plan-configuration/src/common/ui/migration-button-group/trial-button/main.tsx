import React, { FC, useEffect, useState } from 'react';

import { FormattedMessage } from 'react-intl';

import { AnalyticsButton } from '@atlassian/mpt-elements';

import messages from './messages';

export type Props = {
  productName: string;
  getUrl: () => Promise<string>;
  analyticsId?: string;
};

const TrialButton: FC<Props> = ({
  productName,
  getUrl,
  analyticsId = 'get-cloud-button',
}) => {
  const [url, setUrl] = useState<string>();

  // Get the trial url for the button
  useEffect(() => {
    getUrl().then(setUrl);
  }, [getUrl]);

  return (
    <AnalyticsButton
      href={url}
      analyticsId={analyticsId}
      appearance="subtle"
      target="_blank"
      rel="noopener noreferrer"
      isDisabled={!url}
    >
      <FormattedMessage
        {...messages.migrationFieldText}
        values={{ productName }}
      />
    </AnalyticsButton>
  );
};

export default TrialButton;
