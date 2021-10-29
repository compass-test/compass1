import React, { FC, useState } from 'react';

import Button from '@atlaskit/button';
import {
  AtlassianInternalWarning,
  code,
  DevPreviewWarning,
  Example,
  md,
  Props,
} from '@atlaskit/docs';

import JiraMigrationTasklistInitialState from '../examples/14-jira-migration-tasklist-initial-state';
import JiraMigrationTasklistOnlySelectedProjects from '../examples/15-jira-migration-tasklist-only-selected-projects';
import JiraMigrationTasklistProjectsAndUsersGroupsSelected from '../examples/16-jira-migration-tasklist-projects-and-users-groups-selected';
import JiraMigrationTasklistSkipProjects from '../examples/17-jira-migration-tasklist-skip-projects';
import JiraMigrationTasklistARInitial from '../examples/18-jira-migration-tasklist-advanced-roadmaps-initial-state';
import JiraMigrationTasklistARAllSelected from '../examples/19-jira-migration-tasklist-advanced-roadmaps-all-selected';
import JiraMigrationTasklistSkipProjectsReferencedUsersAndGroupsSelectedError from '../examples/20-jira-migration-tasklist-skip-projects-users-and-groups-error';
import JiraMigrationTasklistProjectsSelectedUsersAndGroupsDisabled from '../examples/21-jira-migration-tasklist-projects-selected-users-and-groups-disabled';
import JiraMigrationTasklistAttachmentsOnlyUsersAndGroupsSelectedError from '../examples/24-jira-migration-tasklist-attachments-only-referenced-users-selected-error';
import JiraMigrationTasklistARAttachmentsOnlyPlansAndUsersAndGroupsSelectedError from '../examples/25-jira-migration-tasklist-attachments-only-advanced-roadmaps-plans-users-selected-error';
import JiraMigrationTasklistAttachmentsOnly from '../examples/27-jira-migration-tasklist-attachments-only';
import JiraMigrationTasklistARConfigOnlyUsersAndGroupsSelectedError from '../examples/28-jira-migration-tasklist-advanced-roadmaps-config-only-plans-selected-error';
import JiraMigrationTasklistARAttachmentsOnly from '../examples/30-jira-migration-tasklist-advanced-roadmaps-attachments-only';
import JiraMigrationTasklistARConfigOnly from '../examples/31-jira-migration-tasklist-advanced-roadmaps-config-only';
import JiraMigrationTaskListInitialStateCustomers from '../examples/41-jira-migration-tasklist-initial-state-with-customers';
import JiraMigrationTaskListProjectsUsersGroupsCustomersSelected from '../examples/42-jira-migration-tasklist-projects-users-groups-and-customers-selected';
import JiraMigrationTaskListProjectsCustomersSelected from '../examples/43-jira-migration-tasklist-only-selected-projects-with-customers';
import JiraMigrationTaskListSkipProjectsCustomersError from '../examples/44-jira-migration-tasklist-skip-projects-customers-error';
import JiraMigrationTaskListSkipProjectsUsersGroupsCustomersError from '../examples/45-jira-migration-tasklist-skip-projects-referenced-users-groups-customers-error';
import JiraMigrationTaskListAttachmentsOnlyCustomersError from '../examples/46-jira-migration-tasklist-attachments-only-projects-referenced-customers-error';

const withToggle = (Comp: FC<{ onClose: () => void }>): FC => {
  return () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        {open && <Comp onClose={() => setOpen(false)} />}
        <Button appearance="primary" onClick={() => setOpen(true)}>
          Show Page
        </Button>
      </>
    );
  };
};

export default md`
  ${(
    <>
      <div style={{ marginBottom: '0.5rem' }}>
        <AtlassianInternalWarning />
      </div>
      <div style={{ marginTop: '0.5rem' }}>
        <DevPreviewWarning />
      </div>
    </>
  )}

  ## Overview

  Display tasks and current selections for a Jira migration

  ## Usage
  ${code`import { JiraMigrationTasklist } from '@atlassian/mpt-migration-details';`}

  ## Examples
  ${(
    <Example
      Component={withToggle(JiraMigrationTasklistInitialState)}
      title="Initial state"
      packageName="@atlassian/mpt-migration-details"
      source={require('!!raw-loader!../examples/14-jira-migration-tasklist-initial-state')}
    />
  )}

  ${(
    <Example
      Component={withToggle(JiraMigrationTasklistOnlySelectedProjects)}
      title="Only selected projects"
      packageName="@atlassian/mpt-migration-details"
      source={require('!!raw-loader!../examples/15-jira-migration-tasklist-only-selected-projects')}
    />
  )}

  ${(
    <Example
      Component={withToggle(
        JiraMigrationTasklistProjectsAndUsersGroupsSelected,
      )}
      title="Projects and users and groups selected"
      packageName="@atlassian/mpt-migration-details"
      source={require('!!raw-loader!../examples/16-jira-migration-tasklist-projects-and-users-groups-selected.tsx')}
    />
  )}

  ${(
    <Example
      Component={withToggle(JiraMigrationTasklistSkipProjects)}
      title="Projects selection skipped"
      packageName="@atlassian/mpt-migration-details"
      source={require('!!raw-loader!../examples/17-jira-migration-tasklist-skip-projects.tsx')}
    />
  )}

  ${(
    <Example
      Component={withToggle(JiraMigrationTasklistAttachmentsOnly)}
      title="Attachments only"
      packageName="@atlassian/mpt-migration-details"
      source={require('!!raw-loader!../examples/27-jira-migration-tasklist-attachments-only')}
    />
  )}


  ${(
    <Example
      Component={withToggle(
        JiraMigrationTasklistSkipProjectsReferencedUsersAndGroupsSelectedError,
      )}
      title="Error - projects skipped but referenced users and groups selected"
      packageName="@atlassian/mpt-migration-details"
      source={require('!!raw-loader!../examples/20-jira-migration-tasklist-skip-projects-users-and-groups-error.tsx')}
    />
  )}

  ${(
    <Example
      Component={withToggle(
        JiraMigrationTasklistAttachmentsOnlyUsersAndGroupsSelectedError,
      )}
      title="Error - attachments only but users and groups selected"
      packageName="@atlassian/mpt-migration-details"
      source={require('!!raw-loader!../examples/24-jira-migration-tasklist-attachments-only-referenced-users-selected-error')}
    />
  )}

  ${(
    <Example
      Component={withToggle(
        JiraMigrationTasklistProjectsSelectedUsersAndGroupsDisabled,
      )}
      title="Projects selected but users and groups disabled "
      packageName="@atlassian/mpt-migration-details"
      source={require('!!raw-loader!../examples/21-jira-migration-tasklist-projects-selected-users-and-groups-disabled.tsx')}
    />
  )}

  ${(
    <Example
      Component={withToggle(JiraMigrationTasklistARInitial)}
      title="With Advanced Roadmaps - initial state"
      packageName="@atlassian/mpt-migration-details"
      source={require('!!raw-loader!../examples/18-jira-migration-tasklist-advanced-roadmaps-initial-state.tsx')}
    />
  )}

  ${(
    <Example
      Component={withToggle(JiraMigrationTasklistARAllSelected)}
      title="With Advanced Roadmaps - all selected"
      packageName="@atlassian/mpt-migration-details"
      source={require('!!raw-loader!../examples/19-jira-migration-tasklist-advanced-roadmaps-all-selected.tsx')}
    />
  )}

  ${(
    <Example
      Component={withToggle(JiraMigrationTasklistARAttachmentsOnly)}
      title="With Advanced Roadmaps - attachments only"
      packageName="@atlassian/mpt-migration-details"
      source={require('!!raw-loader!../examples/30-jira-migration-tasklist-advanced-roadmaps-attachments-only')}
    />
  )}

  ${(
    <Example
      Component={withToggle(JiraMigrationTasklistARConfigOnly)}
      title="With Advanced Roadmaps - config only"
      packageName="@atlassian/mpt-migration-details"
      source={require('!!raw-loader!../examples/31-jira-migration-tasklist-advanced-roadmaps-config-only')}
    />
  )}

  ${(
    <Example
      Component={withToggle(
        JiraMigrationTasklistARAttachmentsOnlyPlansAndUsersAndGroupsSelectedError,
      )}
      title="With Advanced Roadmaps - Error - attachments only but plans and users and groups selected"
      packageName="@atlassian/mpt-migration-details"
      source={require('!!raw-loader!../examples/25-jira-migration-tasklist-attachments-only-advanced-roadmaps-plans-users-selected-error')}
    />
  )}

  ${(
    <Example
      Component={withToggle(
        JiraMigrationTasklistARConfigOnlyUsersAndGroupsSelectedError,
      )}
      title="With Advanced Roadmaps - Error - config only but users and groups selected"
      packageName="@atlassian/mpt-migration-details"
      source={require('!!raw-loader!../examples/28-jira-migration-tasklist-advanced-roadmaps-config-only-plans-selected-error')}
    />
  )}

  ${(
    <Example
      Component={withToggle(JiraMigrationTaskListInitialStateCustomers)}
      title="Initial state customers"
      packageName="@atlassian/mpt-migration-details"
      source={require('!!raw-loader!../examples/41-jira-migration-tasklist-initial-state-with-customers')}
    />
  )}

  ${(
    <Example
      Component={withToggle(
        JiraMigrationTaskListProjectsUsersGroupsCustomersSelected,
      )}
      title="Projects, Users, Groups and Customers selected"
      packageName="@atlassian/mpt-migration-details"
      source={require('!!raw-loader!../examples/42-jira-migration-tasklist-projects-users-groups-and-customers-selected')}
    />
  )}

  ${(
    <Example
      Component={withToggle(JiraMigrationTaskListProjectsCustomersSelected)}
      title="Projects and Customers Selected"
      packageName="@atlassian/mpt-migration-details"
      source={require('!!raw-loader!../examples/43-jira-migration-tasklist-only-selected-projects-with-customers')}
    />
  )}

  ${(
    <Example
      Component={withToggle(JiraMigrationTaskListSkipProjectsCustomersError)}
      title="Skip Projects and Referenced Customers Selected Error"
      packageName="@atlassian/mpt-migration-details"
      source={require('!!raw-loader!../examples/44-jira-migration-tasklist-skip-projects-customers-error')}
    />
  )}

  ${(
    <Example
      Component={withToggle(
        JiraMigrationTaskListSkipProjectsUsersGroupsCustomersError,
      )}
      title="Skip Projects and Referenced Users, Groups and Customers Selected Error"
      packageName="@atlassian/mpt-migration-details"
      source={require('!!raw-loader!../examples/45-jira-migration-tasklist-skip-projects-referenced-users-groups-customers-error')}
    />
  )}

  ${(
    <Example
      Component={withToggle(JiraMigrationTaskListAttachmentsOnlyCustomersError)}
      title="Attachments only Referenced Customers Selected Error"
      packageName="@atlassian/mpt-migration-details"
      source={require('!!raw-loader!../examples/46-jira-migration-tasklist-attachments-only-projects-referenced-customers-error')}
    />
  )}

  ${(
    <Props
      props={require('!!extract-react-types-loader!../extract-react-types/jira-migration-tasklist.tsx')}
    />
  )}

`;
