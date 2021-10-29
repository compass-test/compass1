import React, { FC, useEffect, useRef, useState } from 'react';

import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import Button from '@atlaskit/button';
import ProgressBar, { SuccessProgressBar } from '@atlaskit/progress-bar';
import {
  CommonMessage,
  IntlCommonMessages,
  NoticeType,
} from '@atlassian/proforma-common-core/jira-common';
import {
  usePfBrowserUtils,
  usePfErrorUtils,
} from '@atlassian/proforma-common-core/jira-common-context';

import { ExportApi } from '../apis/ExportApi';
import { SearchFormResponsesExportRequest } from '../models/ExportRequest';

import {
  ExportProgressMessage,
  IntlExportProgressMessages,
} from './ExportProgressMessages.intl';

interface ExportProgressProps {
  exportRequest: SearchFormResponsesExportRequest;
  onClose: () => void;
  exportApi: ExportApi;
}

export const ExportProgress: FC<ExportProgressProps> = ({
  exportRequest,
  onClose,
  exportApi,
}) => {
  const [progress, setExportProgress] = useState<number>(0);
  const getStatusUrl = useRef<string>();
  const updateExportProgressInterval = useRef<any>();
  const [downloadUrl, setDownloadUrl] = useState<string>();

  const browserUtils = usePfBrowserUtils();
  const errorUtils = usePfErrorUtils();

  useEffect(() => {
    exportApi.start(exportRequest).then(response => {
      getStatusUrl.current = response.getStatusUrl;
      updateExportProgressInterval.current = setInterval(
        updateExportProgress,
        500,
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateExportProgress = async () => {
    if (!getStatusUrl.current) {
      errorUtils.reportError(
        new Error('Failed to check export status, cannot find `getStatusUrl`.'),
      );
      return;
    }
    await exportApi
      .getStatus(getStatusUrl.current)
      .then(exportStatus => {
        if (!exportStatus || exportStatus.failureMessage) {
          handleExportFailure(/*exportStatus.failureMessage*/); // TODO: Once the failure messages are sanitised for the UI in `ExportActor.scala`, uncomment to display the message.
        } else if (exportStatus.downloadUrl) {
          clearInterval(updateExportProgressInterval.current);
          setExportProgress(100);
          setDownloadUrl(exportApi.createDownloadUrl(exportStatus.downloadUrl));
        } else {
          setExportProgress(exportStatus.progress);
        }
      })
      .catch(ex => {
        handleExportFailure(ex.message); // NOTE: `ex.message` will be provided by a `CustomerApiError`.
      });
  };

  const handleExportFailure = (failureMessage?: string) => {
    clearInterval(updateExportProgressInterval.current);
    getStatusUrl.current = undefined;
    setExportProgress(0);
    browserUtils.showNotice(
      NoticeType.ErrorSearchRequestExportFailed,
      undefined,
      failureMessage,
      true,
    );
  };

  const goBack = () => {
    clearInterval(updateExportProgressInterval.current);
    onClose();
  };

  let jwtQueryParameter = browserUtils.getJwtQueryParameter();
  jwtQueryParameter =
    jwtQueryParameter.length === 0 ? '' : `?${jwtQueryParameter}`;

  return (
    <div>
      <h1>
        <FormattedMessage
          {...IntlExportProgressMessages[ExportProgressMessage.ExportingForms]}
        />
      </h1>
      <ContentSection>
        <div>
          <FormattedMessage
            {...IntlExportProgressMessages[
              ExportProgressMessage.ExportingFormsDesc
            ]}
          />
        </div>
        <ProgressBarWrapper>
          {downloadUrl ? (
            <SuccessProgressBar value={100} />
          ) : (
            <ProgressBar value={progress} />
          )}
        </ProgressBarWrapper>

        <DownloadBtnWrapper>
          {!!downloadUrl && (
            <Button
              appearance="primary"
              href={`${downloadUrl}${jwtQueryParameter}`}
            >
              <FormattedMessage
                {...IntlExportProgressMessages[
                  ExportProgressMessage.DownloadExport
                ]}
              />
            </Button>
          )}
        </DownloadBtnWrapper>
      </ContentSection>

      <GoBackBtnWrapper>
        <Button onClick={goBack}>
          <FormattedMessage {...IntlCommonMessages[CommonMessage.Back]} />
        </Button>
      </GoBackBtnWrapper>
    </div>
  );
};

const ContentSection = styled.div`
  margin-left: 30px;
  margin-top: 10px;
`;

const ProgressBarWrapper = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;

const DownloadBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const GoBackBtnWrapper = styled.div`
  margin-top: 20px;
`;
