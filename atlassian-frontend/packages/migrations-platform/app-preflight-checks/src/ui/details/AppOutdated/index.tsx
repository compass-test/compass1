import React, { FC, useMemo } from 'react';

import { FormattedMessage } from 'react-intl';

import { ButtonGroup } from '@atlaskit/button';
import OpenIcon from '@atlaskit/icon/glyph/open';
import { AnalyticsButton, ExternalLink } from '@atlassian/mpt-elements';

import { messages } from '../../../i18n';
import * as S from '../../styled';
import { pluralize } from '../../utils';

import { AppOutdatedProps, OutdatedAppDetails } from './types';

const AppOutdatedDetails: FC<AppOutdatedProps> = ({
  outdatedApps,
  appAssessmentUrl,
  onRemoveApps,
}: AppOutdatedProps) => {
  const memoisedOnClick = useMemo(() => {
    const appKeys = outdatedApps.map((app) => app.key);
    return () => {
      onRemoveApps(appKeys);
    };
  }, [outdatedApps, onRemoveApps]);
  return (
    <>
      <S.Description>
        <FormattedMessage {...messages.appOutdatedDescription} />
      </S.Description>
      <S.List>
        <S.ListRow>
          <FormattedMessage
            {...messages.appOutdatedListItem01}
            values={{
              message: <strong>Server version with migration path</strong>,
            }}
          />
        </S.ListRow>
        <S.ListRow>
          <FormattedMessage
            {...messages.appOutdatedListItem02}
            values={{
              message: <strong>Change my decision in App Assessment</strong>,
            }}
          />
        </S.ListRow>
        <S.ListRow>
          <FormattedMessage
            {...messages.appOutdatedListItem03}
            values={{
              message: (
                <strong>
                  Remove {outdatedApps.length}{' '}
                  {pluralize(outdatedApps.length, 'app')} from this migration
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
          iconAfter={<OpenIcon label="Give app data migration consent" />}
        >
          <FormattedMessage {...messages.appOutdatedChangeLabel} />
        </AnalyticsButton>
        <AnalyticsButton
          analyticsId="removeOutdatedAppsFromMigration"
          onClick={memoisedOnClick}
          role="button"
        >
          <FormattedMessage
            {...messages.appOutdatedRemoveLabel}
            values={{ count: outdatedApps.length }}
          />
        </AnalyticsButton>
      </ButtonGroup>
      <S.Table>
        <thead>
          <tr>
            <th>
              <FormattedMessage
                {...messages.appOutdatedCurrentServerVersionHeading}
              />
            </th>
            <th>
              <FormattedMessage
                {...messages.appOutdatedServerVersionWithMigrationPathHeading}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {outdatedApps.map(
            ({
              name,
              version,
              url,
              versionWithMigration,
              key,
            }: OutdatedAppDetails) => {
              return (
                <tr key={key}>
                  <td>{`${name} ${version}`}</td>
                  <td>
                    <ExternalLink
                      href={url}
                    >{`${name} ${versionWithMigration}`}</ExternalLink>
                  </td>
                </tr>
              );
            },
          )}
        </tbody>
      </S.Table>
    </>
  );
};

export default AppOutdatedDetails;
