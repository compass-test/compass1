import React from 'react';

import { useRouter } from 'react-resource-router';

import { CompassComponentDetailViewFragment } from '@atlassian/dragonfruit-graphql';
import { ComponentDetailPageUrlParam } from '@atlassian/dragonfruit-utils';

import { ScorecardsSidebar } from './scorecards-sidebar';

type RightSidebarProps = {
  component: CompassComponentDetailViewFragment;
};

export function RightSidebar(props: RightSidebarProps) {
  const { component } = props;

  const [{ match }] = useRouter();

  const page = match.params.componentPage;

  // If there's no sub-page then we're on the component details homepage/overview
  if (
    page === undefined ||
    page === ComponentDetailPageUrlParam.DEPENDENCIES ||
    page === ComponentDetailPageUrlParam.ANNOUNCEMENTS ||
    page === ComponentDetailPageUrlParam.JIRA
  ) {
    return <ScorecardsSidebar component={component} />;
  }

  // Unmatched, render nothing
  return null;
}
