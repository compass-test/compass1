import React, { useState } from 'react';

import { observer } from 'mobx-react-lite';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import styled from 'styled-components';

import Button, { ButtonGroup } from '@atlaskit/button';
import LoadingButton from '@atlaskit/button/loading-button';
import PageHeading from '@atlaskit/page-header';
import { ListProjectForms } from '@atlassian/proforma-common-core/jira-common';
import {
  ProjectApi,
  ProjectFormApi,
  TemplateFormApi,
} from '@atlassian/proforma-common-core/jira-common-apis';
import {
  usePfAnalyticsUtils,
  usePfBrowserUtils,
  useProjectId,
  useTemplateFormApi,
} from '@atlassian/proforma-common-core/jira-common-context';
import { ModuleContextV3 } from '@atlassian/proforma-common-core/jira-common-stores';
import { AnalyticsEventName } from '@atlassian/proforma-common-core/jira-common-utils';

import {
  IntlProjectFormsMessages,
  ProjectFormsMessages,
} from './ProjectFormsMessages.intl';
import { Description, HeadingContainer } from './styled';

export interface ProjectFormsSettings {
  projectId: number;
  projectDisabled: boolean;
  formListPageSize?: string;
  requestTypes: boolean;
}

export interface ProjectFormsApis {
  templateFormApi: TemplateFormApi;
  projectFormApi: ProjectFormApi;
  projectApi: ProjectApi;
}

export interface ProjectFormsModuleContext
  extends ModuleContextV3<ProjectFormsApis> {}

interface ProjectFormsProps {
  requestTypes?: boolean;
}

export const ProjectForms = injectIntl(
  observer<InjectedIntlProps & ProjectFormsProps>(({ intl, requestTypes }) => {
    const [isCreatingForm, setIsCreatingForm] = useState<boolean>(false);

    const analyticsUtils = usePfAnalyticsUtils();
    const browserUtils = usePfBrowserUtils();
    const templateFormApi = useTemplateFormApi();
    const projectId = useProjectId();

    const createForm = () => {
      const d = intl.formatDate(new Date(), {});
      const name = intl.formatMessage(
        IntlProjectFormsMessages[ProjectFormsMessages.NewForm],
        {
          date: d,
        },
      );

      // Call APi top create form
      setIsCreatingForm(true);
      templateFormApi
        .createTemplateFormForProject(projectId, name)
        .then(response => {
          analyticsUtils.track(AnalyticsEventName.CreateForm, { projectId });
          browserUtils.goToUrl(response.nextUrl);
        })
        .finally(() => {
          setIsCreatingForm(false);
        });
    };

    const learnMore = () => {
      browserUtils.goToUrl('/');
    };

    const headingActions = (
      <ButtonGroup>
        <LoadingButton
          testId="proforma-project-create-form"
          target="_top"
          appearance="primary"
          onClick={createForm}
          isLoading={isCreatingForm}
        >
          <FormattedMessage
            {...IntlProjectFormsMessages[ProjectFormsMessages.CreateForm]}
          />
        </LoadingButton>
      </ButtonGroup>
    );

    const bottomBar = (
      <Description>
        <FormattedMessage
          {...IntlProjectFormsMessages[ProjectFormsMessages.Description]}
        />
        <Button appearance="link" onClick={learnMore}>
          <FormattedMessage
            {...IntlProjectFormsMessages[ProjectFormsMessages.LearnMore]}
          />
        </Button>
      </Description>
    );

    return (
      <ProjectFormsWrapper>
        <HeadingContainer>
          <PageHeading actions={headingActions} bottomBar={bottomBar}>
            <FormattedMessage
              {...IntlProjectFormsMessages[ProjectFormsMessages.Forms]}
            />
          </PageHeading>
        </HeadingContainer>
        <ListProjectForms requestTypes={requestTypes} />
      </ProjectFormsWrapper>
    );
  }),
);

const ProjectFormsWrapper = styled.div`
  max-width: 1000px;
`;
