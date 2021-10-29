import React from 'react';

import EmptyState from '@atlaskit/empty-state';
import { Content } from '@atlaskit/page-layout';
import { ErrorIcon } from '@atlassian/dragonfruit-common-ui/assets';
import { useTenantInfo } from '@atlassian/dragonfruit-tenant-context';
import {
  buildComponentAri,
  ComponentDetailPageUrlParam,
  useIntl,
} from '@atlassian/dragonfruit-utils';
import { ReportErrors } from '@atlassian/error-handling';

import { ANALYTICS_PACKAGE_NAME } from './constants';
import { ComponentDetailsPage } from './ui';
import messages from './ui/messages';

const COMPONENT_NAME = 'componentDetails';

type Props = {
  componentResourceId: string;
  pageType?: ComponentDetailPageUrlParam | null;
  extensionId?: string | null;
};

export const ComponentDetails: React.FC<Props> = ({
  componentResourceId,
  ...rest
}) => {
  const { formatMessage } = useIntl();

  const { workspaceId, cloudId } = useTenantInfo();
  let componentId;
  try {
    componentId = buildComponentAri({
      componentResourceId,
      workspaceId,
      cloudId,
    });
  } catch (e) {
    return (
      <Content>
        <EmptyState
          header={formatMessage(messages.errorStateHeading)}
          description={formatMessage(messages.invalidUrlErrorMessage)}
          imageUrl={ErrorIcon}
        />
      </Content>
    );
  }

  return (
    <ReportErrors id={COMPONENT_NAME} packageName={ANALYTICS_PACKAGE_NAME}>
      <ComponentDetailsPage componentId={componentId} {...rest} />
    </ReportErrors>
  );
};
