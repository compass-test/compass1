import React, { FC, useMemo } from 'react';

import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';

import { AnalyticsScreen } from '@atlassian/mpt-analytics';
import {
  LinkCard,
  productConstants,
  ProductKey,
  ProductStatsCard,
  ProductStatsCardProps,
} from '@atlassian/mpt-cards';
import { AnalyticsLink } from '@atlassian/mpt-elements';
import { pluralize } from '@atlassian/mpt-utils';

import assessAppsImage from '../../common/assets/assess-apps.svg';
import migrateDataImage from '../../common/assets/migrate-data.svg';
import prepareAppsImage from '../../common/assets/prepare-apps.svg';
import { homePageConstants } from '../../common/constants';
import * as S from '../../common/ui/styled';

import { messages } from './messages';

type Props = ProductStatsCardProps & {
  productKey: ProductKey;
  headerButtons?: React.ReactNode | React.ReactNode[];
  // this is temporary until we release App migration,
  appsMigrationEapEnabled?: boolean;
  onClickAssessApps?: () => void;
  onClickPrepareApps?: () => void;
  onClickMigrateData?: () => void;
};

const HomePageInterim: FC<Props & InjectedIntlProps> = ({
  intl,
  productKey,
  appsMigrationEapEnabled,
  onClickAssessApps,
  onClickPrepareApps,
  onClickMigrateData,
  headerButtons,
  children,
  ...cardProps
}) => {
  const product = productConstants[productKey];
  const constants = homePageConstants[productKey];
  const literals = useMemo(
    () => ({
      migrateCardDesc: `Migrate users, groups, ${pluralize(
        0,
        product.containersUnit,
      )} ${appsMigrationEapEnabled ? ' and apps ' : ''} to ${
        product.name
      } cloud in stages, or all at once.`,
      migrationAssistantLinkTitle: `${product.name} Cloud Migration Assistant`,
    }),
    [product, appsMigrationEapEnabled],
  );

  return (
    <AnalyticsScreen name="Home">
      <div>
        {headerButtons && <S.Buttons>{headerButtons}</S.Buttons>}
        <S.H1>
          <FormattedMessage {...messages.migrationHomePageInterimHeading} />
        </S.H1>
        <p>
          <FormattedMessage {...messages.migrationHomePageInterimDescription} />
        </p>
        <S.Main>
          <S.MainCards>
            {onClickAssessApps && (
              <>
                <S.H2>
                  <FormattedMessage
                    {...messages.migrationHomePageInterimAssessAppsHeading}
                  />
                </S.H2>
                <LinkCard
                  onClick={onClickAssessApps}
                  imageUrl={assessAppsImage}
                  title={intl.formatMessage(
                    messages.migrationHomePageInterimAssessAppsTitle,
                  )}
                  analyticsId="assessYourAppsLink"
                >
                  <FormattedMessage
                    {...messages.migrationHomePageInterimAssessAppsDescription}
                  />
                </LinkCard>
              </>
            )}
            {onClickPrepareApps && (
              <>
                <S.H2>
                  <FormattedMessage
                    {...messages.migrationHomePageInterimPrepareAppsHeading}
                  />
                </S.H2>
                <LinkCard
                  onClick={onClickPrepareApps}
                  imageUrl={prepareAppsImage}
                  title={intl.formatMessage(
                    messages.migrationHomePageInterimPrepareAppsTitle,
                  )}
                  analyticsId="prepareYourAppsLink"
                >
                  {appsMigrationEapEnabled ? (
                    <FormattedMessage
                      {...messages.migrationHomePageInterimPrepareAppsDescriptionEAP}
                    />
                  ) : (
                    <FormattedMessage
                      {...messages.migrationHomePageInterimPrepareAppsDescription}
                    />
                  )}
                </LinkCard>
              </>
            )}
            {onClickMigrateData && (
              <>
                <S.H2>Migrate</S.H2>
                <LinkCard
                  onClick={onClickMigrateData}
                  imageUrl={migrateDataImage}
                  title={intl.formatMessage(
                    messages.migrationHomePageInterimMigrateDataTitle,
                  )}
                  analyticsId="migrateDataLink"
                >
                  {literals.migrateCardDesc}
                </LinkCard>
              </>
            )}
            {children}
          </S.MainCards>
          <S.MainSide>
            <section>
              <S.H2>
                <FormattedMessage
                  {...messages.migrationHomePageInterimAboutYourProductHeading}
                />
              </S.H2>
              <ProductStatsCard productKey={productKey} {...cardProps} />
            </section>
            <section>
              <S.H2>
                <FormattedMessage
                  {...messages.migrationHomePageInterimAdditionalResourcesHeading}
                />
              </S.H2>
              <S.LinksList>
                <dt>
                  <AnalyticsLink
                    href={constants.planYourMigrationUrl}
                    target="_blank"
                    analyticsId="prepareForMigrationLink"
                  >
                    <FormattedMessage
                      {...messages.migrationHomePageInterimPrepareMigrationDescription}
                    />
                  </AnalyticsLink>
                </dt>
                <dd>
                  <FormattedMessage
                    {...messages.migrationHomePageInterimBestPracticeGuideDescription}
                  />
                </dd>
                <dt>
                  <AnalyticsLink
                    href={constants.migrationAssistantUrl}
                    target="_blank"
                    analyticsId="migrationAssistantLink"
                  >
                    {literals.migrationAssistantLinkTitle}
                  </AnalyticsLink>
                </dt>
                <dd>
                  <FormattedMessage
                    {...messages.migrationHomePageInterimGuideForPlanningDescription}
                  />
                </dd>
              </S.LinksList>
            </section>
          </S.MainSide>
        </S.Main>
      </div>
    </AnalyticsScreen>
  );
};

export default injectIntl(HomePageInterim);
