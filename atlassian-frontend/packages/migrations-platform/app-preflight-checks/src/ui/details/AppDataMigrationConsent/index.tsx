import React, { FC, useMemo } from 'react';

import { FormattedMessage } from 'react-intl';

import { ButtonGroup } from '@atlaskit/button';
import OpenIcon from '@atlaskit/icon/glyph/open';
import { AnalyticsButton } from '@atlassian/mpt-elements';

import { messages } from '../../../i18n';
import * as S from '../../styled';

type App = {
  name: string;
  key: string;
};

type Props = {
  listOfOccurrences: App[];
  consentUrl: string;
  onRemoveApps: (appKeys: string[]) => void;
};

const AppDataMigrationConsent: FC<Props> = ({
  listOfOccurrences,
  consentUrl,
  onRemoveApps,
}: Props) => {
  const memoisedOnClick = useMemo(() => {
    const appKeys = listOfOccurrences.map((app) => app.key);
    return () => {
      onRemoveApps(appKeys);
    };
  }, [onRemoveApps, listOfOccurrences]);

  return (
    <>
      <S.Description>
        <FormattedMessage {...messages.appDataMigrationConsentDescription} />
      </S.Description>
      <ButtonGroup>
        <AnalyticsButton
          analyticsId="giveAppDataMigrationConsent"
          href={consentUrl}
          target="_blank"
          iconAfter={<OpenIcon label="Give app data migration consent" />}
        >
          <FormattedMessage {...messages.appDataMigrationConsentGiveLabel} />
        </AnalyticsButton>
        <AnalyticsButton
          analyticsId="removeAppDataMigrationConsent"
          onClick={memoisedOnClick}
          role="button"
        >
          <FormattedMessage
            {...messages.appDataMigrationConsentRemoveLabel}
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
                  {...messages.appDataMigrationConsentHeading}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {listOfOccurrences.map(({ name, key }) => (
              <tr key={key}>
                <td>{name}</td>
              </tr>
            ))}
          </tbody>
        </S.Table>
      )}
    </>
  );
};

export default AppDataMigrationConsent;
