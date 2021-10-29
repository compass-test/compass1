import React, { FC } from 'react';

import DownloadIcon from '@atlaskit/icon/glyph/download';
import Tooltip from '@atlaskit/tooltip';
import { AnalyticsButton } from '@atlassian/mpt-elements';

import { downloadAppsCsv } from './utils';

type Props = {
  apps?: Record<string, unknown>[];
  isLoading?: boolean;
  shouldShowUsage?: boolean;
};

const DownloadCsvButton: FC<Props> = ({
  apps = [],
  isLoading = false,
  shouldShowUsage = false,
}: Props) => {
  return (
    <Tooltip content="Download the CSV to get a copy of everything here, plus additional helpful fields for you to complete">
      <AnalyticsButton
        analyticsId="downloadAppAssessmentCSVButton"
        iconBefore={<DownloadIcon label="Download CSV file" />}
        isDisabled={isLoading || apps.length === 0}
        onClick={() => downloadAppsCsv(apps, shouldShowUsage)}
      >
        Download CSV file
      </AnalyticsButton>
    </Tooltip>
  );
};

export default DownloadCsvButton;
