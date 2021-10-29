import React, { FC, useMemo } from 'react';

import { FormattedMessage } from 'react-intl';

import { ButtonGroup } from '@atlaskit/button';
import OpenIcon from '@atlaskit/icon/glyph/open';
import { AnalyticsButton, ExternalLink } from '@atlassian/mpt-elements';

import { messages } from '../../../i18n';
import * as S from '../../styled';
import { pluralize } from '../../utils';

type Apps = {
  name: string;
  url: string;
  key: string;
};

type Props = {
  listOfOccurrences: Apps[];
  appAssessmentUrl: string;
  onRemoveApps: (appKeys: string[]) => void;
};

const AppsNotInstalledOnCloud: FC<Props> = ({
  listOfOccurrences,
  appAssessmentUrl,
  onRemoveApps,
}: Props) => {
  const memoisedOnClick = useMemo(() => {
    const appKeys = listOfOccurrences.map((app) => app.key);
    return () => {
      onRemoveApps(appKeys);
    };
  }, [listOfOccurrences, onRemoveApps]);
  return (
    <>
      <S.Description>
        <FormattedMessage {...messages.appsNotInstalledOnCloudDescription} />
      </S.Description>
      <S.List>
        <S.ListRow>
          <FormattedMessage
            {...messages.appsNotInstalledOnCloudListItem01}
            values={{
              message: <strong>Apps not installed on your cloud site</strong>,
            }}
          />
        </S.ListRow>
        <S.ListRow>
          <FormattedMessage
            {...messages.appsNotInstalledOnCloudListItem02}
            values={{
              message: <strong>Change my decision in App Assessment</strong>,
            }}
          />
        </S.ListRow>
        <S.ListRow>
          <FormattedMessage
            {...messages.appsNotInstalledOnCloudListItem03}
            values={{
              message: (
                <strong>
                  Remove {listOfOccurrences.length}{' '}
                  {pluralize(listOfOccurrences.length, 'app')} from this
                  migration
                </strong>
              ),
            }}
          />
        </S.ListRow>
      </S.List>

      <ButtonGroup>
        <AnalyticsButton
          analyticsId="changeDecisionInAppAssessment"
          href={appAssessmentUrl}
          target="_blank"
          iconAfter={<OpenIcon label="download" />}
        >
          <FormattedMessage {...messages.appsNotInstalledOnCloudChangeLabel} />
        </AnalyticsButton>
        <AnalyticsButton
          analyticsId="removeNotInstalledAppsFromMigration"
          onClick={memoisedOnClick}
          role="button"
        >
          <FormattedMessage
            {...messages.appsNotInstalledOnCloudRemoveLabel}
            values={{ count: listOfOccurrences.length }}
          />
        </AnalyticsButton>
      </ButtonGroup>
      {listOfOccurrences && (
        <S.Table>
          <thead>
            <tr>
              <th>
                <FormattedMessage
                  {...messages.appsNotInstalledOnCloudHeading}
                />
              </th>
            </tr>
          </thead>
          <tbody data-testid="app-list">
            {listOfOccurrences.map(({ url, name, key }) => (
              <tr key={key}>
                <td>
                  <ExternalLink href={url}>{name}</ExternalLink>
                </td>
              </tr>
            ))}
          </tbody>
        </S.Table>
      )}
    </>
  );
};

export default AppsNotInstalledOnCloud;
