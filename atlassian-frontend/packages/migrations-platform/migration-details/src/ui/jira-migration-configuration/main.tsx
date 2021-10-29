import React, { FC, ReactNode } from 'react';

import { FormattedHTMLMessage } from 'react-intl';

import EditIcon from '@atlaskit/icon/glyph/edit';
import Tooltip from '@atlaskit/tooltip';
import {
  AnalyticsButton,
  ExternalLink,
  VerticalHeadingsTable,
} from '@atlassian/mpt-elements';
import { useIntl, withCustomIntlProvider } from '@atlassian/mpt-utils';

import {
  CloudProduct,
  CustomersConfig,
  ProjectsConfig,
  UsersAndGroupsConfig,
} from '../../common/types';
import { fetchLanguageFile } from '../../utils/i18n';
import CloudPlanContent from '../jira-migration-configuration/ui/cloud-plan-content';

import messages from './messages';
import { Caption, HeaderWrapper, Wrapper } from './styled';
import { ProjectsContent } from './ui';
import CustomersContent from './ui/customers-content';
import UsersAndGroupsContent from './ui/users-and-groups-content';
import { groupMembershipMessage, projectsConfigurationMessage } from './utils';
export type Props = {
  migrationName: string;
  // Url of source site
  sourceUrl?: string;
  // Source url header text
  sourceUrlHeader?: string;
  // Url of destination site
  destinationUrl?: string;
  // Destination url header text
  destinationUrlHeader?: string;
  // Cloud products on destination site
  destinationCloudProducts: CloudProduct[];
  // Cloud products header text
  destinationCloudPlanHeader?: string;
  // Selected options for projects to migrate, if any - stats and configuration
  projectsConfig?: ProjectsConfig;
  // Selected options for what users and groups to migrate, if any
  usersAndGroupsConfig?: UsersAndGroupsConfig;
  // Type of migration
  isCloudMigration?: boolean;
  // Edit migration button's tooltip message
  editMigrationLabel?: string;
  // Method to edit configuration
  onEdit?: () => void;
  // Number of app data included in migration, if any
  appData?: number;
  // Number of customers included in the migration, if it includes JSM migration
  customersConfig?: CustomersConfig;
};

const JiraMigrationConfiguration: FC<Props> = ({
  migrationName,
  sourceUrl,
  sourceUrlHeader,
  destinationUrl,
  destinationUrlHeader,
  destinationCloudProducts,
  destinationCloudPlanHeader,
  projectsConfig,
  usersAndGroupsConfig,
  isCloudMigration,
  editMigrationLabel,
  onEdit,
  appData,
  customersConfig,
}) => {
  const { intl } = useIntl();
  let rows: { header: string; content: ReactNode }[] = [
    {
      header: intl.formatMessage(messages.migrationNameHeader),
      content: migrationName,
    },
  ];

  if (sourceUrl && sourceUrl !== '') {
    rows.push({
      header: sourceUrlHeader || intl.formatMessage(messages.sourceUrlHeader),
      content: <ExternalLink href={sourceUrl}>{sourceUrl}</ExternalLink>,
    });
  }

  if (destinationUrl && destinationUrl !== '') {
    rows.push({
      header:
        destinationUrlHeader ||
        intl.formatMessage(messages.destinationUrlHeader),
      content: (
        <ExternalLink href={destinationUrl}>{destinationUrl}</ExternalLink>
      ),
    });
  }

  if (destinationCloudProducts.length > 0) {
    rows.push({
      header:
        destinationCloudPlanHeader ||
        intl.formatMessage(messages.destinationCloudPlanHeader, {
          count: destinationCloudProducts.length,
        }),
      content: (
        <CloudPlanContent destinationCloudProducts={destinationCloudProducts} />
      ),
    });
  }

  if (projectsConfig && projectsConfig.numberOfProjects > 0) {
    if (projectsConfig.projectStatsOfJSM && projectsConfig.projectStatsOfJira) {
      rows.push({
        header: intl.formatMessage(messages.projectsHeader),
        content: (
          <ProjectsContent
            projectStatsOfJSM={projectsConfig.projectStatsOfJSM}
            projectStatsOfJira={projectsConfig.projectStatsOfJira}
          />
        ),
      });
    } else {
      rows.push({
        header: intl.formatMessage(messages.projectsHeader),
        content: projectsConfigurationMessage(intl, projectsConfig),
      });
    }
  }

  if (usersAndGroupsConfig) {
    rows.push({
      header: intl.formatMessage(messages.usersAndGroupsHeader),
      content: isCloudMigration ? (
        intl.formatMessage(messages.cloudMigrationUsersAndGroupsContent)
      ) : (
        <UsersAndGroupsContent usersAndGroupsConfig={usersAndGroupsConfig} />
      ),
    });

    rows.push({
      header: intl.formatMessage(messages.groupMembershipHeader),
      content: isCloudMigration ? (
        <FormattedHTMLMessage
          {...messages.cloudMigrationGroupMembershipContent}
          values={{
            url:
              'https://support.atlassian.com/user-management/docs/create-and-update-groups/',
          }}
        />
      ) : (
        groupMembershipMessage(
          intl,
          usersAndGroupsConfig.shouldPreserveMemberships,
        )
      ),
    });
  }

  if (customersConfig) {
    rows.push({
      header: intl.formatMessage(messages.customersHeader),
      content: <CustomersContent customersConfig={customersConfig} />,
    });
  }

  if (appData) {
    rows.push({
      header: intl.formatMessage(messages.appDataHeader),
      content: intl.formatMessage(messages.appDataContent, {
        count: appData,
      }),
    });
  }

  return (
    <Wrapper>
      <HeaderWrapper>
        <Caption>{intl.formatMessage(messages.configurationCaption)}</Caption>
        {onEdit && (
          <Tooltip
            content={
              editMigrationLabel ||
              intl.formatMessage(messages.editMigrationTooltip)
            }
            position="top"
            testId="editMigrationTooltip"
          >
            <AnalyticsButton
              onClick={onEdit}
              analyticsId="editMigrationConfigButton"
              iconBefore={
                <EditIcon
                  label={intl.formatMessage(messages.editMigration)}
                  size="medium"
                />
              }
            >
              <span>{intl.formatMessage(messages.editMigration)}</span>
            </AnalyticsButton>
          </Tooltip>
        )}
      </HeaderWrapper>
      <VerticalHeadingsTable rows={rows} />
    </Wrapper>
  );
};

export default withCustomIntlProvider(
  JiraMigrationConfiguration,
  fetchLanguageFile,
);
