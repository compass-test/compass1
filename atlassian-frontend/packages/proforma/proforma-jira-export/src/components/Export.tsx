import React, { FC, useRef, useState } from 'react';

import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import Button from '@atlaskit/button';
import PageHeading from '@atlaskit/page-header';
import { SelectOption } from '@atlassian/proforma-common-core/form-system-models';
import { NoticeType } from '@atlassian/proforma-common-core/jira-common';
import {
  usePfAnalyticsUtils,
  usePfBrowserUtils,
} from '@atlassian/proforma-common-core/jira-common-context';
import { ExportFormat } from '@atlassian/proforma-common-core/jira-common-models';
import { AnalyticsEventName } from '@atlassian/proforma-common-core/jira-common-utils';

import { SearchFormResponsesExportRequest } from '../models/ExportRequest';

import { ExportConfig } from './ExportConfig';
import { ExportMessage, IntlExportMessages } from './ExportMessages.intl';
import { ExportProgress } from './ExportProgress';

import { ExportApis } from './index';

interface ExportProps {
  apis: ExportApis;
  issueKeys: string[];
}

export const Export: FC<ExportProps> = ({ apis, issueKeys }) => {
  const [projectId, setProjectId] = useState<number>();
  const [templateForm, setTemplateForm] = useState<SelectOption<number>>();
  const [format, setFormat] = useState<ExportFormat>(ExportFormat.Xlsx);
  const [exportRequest, setExportState] = useState<
    SearchFormResponsesExportRequest | undefined
  >();
  const displayedNoIssueWarning = useRef<boolean>(false);

  const browserUtils = usePfBrowserUtils();
  const analyticsUtils = usePfAnalyticsUtils();

  const handleUpdateProject = (projectId: number): void => {
    setTemplateForm(undefined);
    setProjectId(projectId);
  };

  const handleStartExport = () => {
    if (projectId && templateForm) {
      analyticsUtils.track(
        AnalyticsEventName.ExportAllResponsesWithJiraFields,
        {
          exportType: format,
        },
      );
      setExportState(
        new SearchFormResponsesExportRequest(
          format,
          projectId,
          templateForm.value,
          issueKeys,
        ),
      );
    } else {
      // eslint-disable-next-line no-console
      console.warn(
        'Attempted to start the export without the project key and template form selected.',
      );
    }
  };

  const handleCancelExport = () => {
    window.close();
  };

  if (!displayedNoIssueWarning.current && issueKeys.length === 0) {
    window.setTimeout(
      () =>
        browserUtils.showNotice(
          NoticeType.WarningSearchRequestExportWithNoIssues,
          undefined,
          undefined,
          true,
        ),
      250,
    );
    displayedNoIssueWarning.current = true; // Otherwise this notice gets displayed every time the page is refreshed. e.g. everytime an option is selected.
  }

  return (
    <div>
      <PageHeading
        actions={
          <BackToJiraButtonWrapper>
            <Button onClick={handleCancelExport}>
              <FormattedMessage
                {...IntlExportMessages[ExportMessage.ReturnToJira]}
              />
            </Button>
          </BackToJiraButtonWrapper>
        }
      >
        <FormattedMessage {...IntlExportMessages[ExportMessage.PageHeading]} />
      </PageHeading>
      <ContentWrapper>
        {exportRequest === undefined ? (
          <ExportConfig
            projectId={projectId}
            templateFormId={templateForm && templateForm.value}
            format={format}
            searchProjects={(pageSize, search) =>
              apis.projectApi.search(pageSize, search)
            }
            loadProjectForms={projectId =>
              apis.projectFormApi.getForms(projectId)
            }
            updateProject={handleUpdateProject}
            updateProjectForm={setTemplateForm}
            updateFormat={setFormat}
            startExport={handleStartExport}
            cancelExport={handleCancelExport}
          />
        ) : (
          <ExportProgress
            exportRequest={exportRequest}
            onClose={() => setExportState(undefined)}
            exportApi={apis.exportApi}
          />
        )}
      </ContentWrapper>
    </div>
  );
};

const BackToJiraButtonWrapper = styled.span`
  margin-right: 20px;
`;

const ContentWrapper = styled.div`
  max-width: 750px;
  margin: 0 auto;
`;
