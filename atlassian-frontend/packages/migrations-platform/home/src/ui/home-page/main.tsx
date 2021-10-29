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

import manageImage from '../../common/assets/migrate-data.svg';
import planMigrationImage from '../../common/assets/plan-migration.png';
import prepareAppsImage from '../../common/assets/prepare-apps.svg';
import { homePageConstants } from '../../common/constants';
import * as S from '../../common/ui/styled';

import { messages } from './messages';

type Props = ProductStatsCardProps & {
  productKey: ProductKey;
  headerButtons?: React.ReactNode | React.ReactNode[];
  onClickAssessApps?: () => void;
  onClickManage?: () => void;
};

const HomePage: FC<Props & InjectedIntlProps> = ({
  intl,
  productKey,
  onClickAssessApps,
  onClickManage,
  headerButtons,
  children,
  ...cardProps
}) => {
  const product = productConstants[productKey];
  const constants = homePageConstants[productKey];
  const literals = useMemo(
    () => ({
      migrateCardDesc: `Migrate users, groups and ${pluralize(
        0,
        product.containersUnit,
      )} to ${product.name} cloud in stages, or all at once.`,
      migrationAssistantLinkTitle: `${product.name} Cloud Migration Assistant`,
    }),
    [product],
  );

  return (
    <AnalyticsScreen name="Home">
      <div>
        {headerButtons && <S.Buttons>{headerButtons}</S.Buttons>}
        <S.H1>
          <FormattedMessage {...messages.migrationHomePageHeading} />
        </S.H1>
        <p>
          <FormattedMessage {...messages.migrationHomePageDescription} />
        </p>
        <S.Main>
          <S.MainCards>
            <S.H2>
              <FormattedMessage {...messages.migrationHomePagePlanHeading} />
            </S.H2>
            <LinkCard
              href={constants.planYourMigrationUrl}
              target="_blank"
              imageUrl={planMigrationImage}
              title={intl.formatMessage(
                messages.migrationHomePagePlanLinkTitle,
              )}
              analyticsId="planYourMigrationLink"
            >
              <FormattedMessage
                {...messages.migrationHomePagePlanLinkDescription}
              />
            </LinkCard>
            {onClickAssessApps && (
              <>
                <S.H2>
                  <FormattedMessage
                    {...messages.migrationHomePageAssessInstallLinkHeading}
                  />
                </S.H2>
                <LinkCard
                  onClick={onClickAssessApps}
                  imageUrl={prepareAppsImage}
                  title={intl.formatMessage(
                    messages.migrationHomePageAssessInstallLinkTitle,
                  )}
                  analyticsId="assessAndInstallLink"
                >
                  <FormattedMessage
                    {...messages.migrationHomePageAssessInstallLinkDescription}
                  />
                </LinkCard>
              </>
            )}
            {onClickManage && (
              <>
                <S.H2>
                  <FormattedMessage
                    {...messages.migrationHomePageManageMigrationLinkHeading}
                  />
                </S.H2>
                <LinkCard
                  onClick={onClickManage}
                  imageUrl={manageImage}
                  title={intl.formatMessage(
                    messages.migrationHomePageManageMigrationLinkTitle,
                  )}
                  analyticsId="manageMigrationLink"
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
                  {...messages.migrationHomePageAboutYourProductHeading}
                />
              </S.H2>
              <ProductStatsCard productKey={productKey} {...cardProps} />
            </section>
            <section>
              <S.H2>
                <FormattedMessage
                  {...messages.migrationHomePageAdditionalResourcesHeading}
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
                      {...messages.migrationHomePagePrepareMigrationDescription}
                    />
                  </AnalyticsLink>
                </dt>
                <dd>
                  <FormattedMessage
                    {...messages.migrationHomePageBestPracticeGuideDescription}
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
                    {...messages.migrationHomePageGuideForPlanningDescription}
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

export default injectIntl(HomePage);
