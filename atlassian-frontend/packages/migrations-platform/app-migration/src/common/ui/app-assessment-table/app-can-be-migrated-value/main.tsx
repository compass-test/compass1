import React, { FC } from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';

import Tooltip from '@atlaskit/tooltip';

import type { AppCloudCapability } from '../../../../common/types';
import Status from '../../status-with-link-value';

import messages from './messages';

export type Props = {
  appKey: string;
  canBeMigrated: AppCloudCapability;
  automatedPathUrlForNonEap?: string;
  contactVendorUrl?: string;
  migrationPathInstructionsUrl?: string;
  migrationRoadmapRequest?: string;
  upgradeAppUrl?: string;
  reliabilityAppUrl?: string;
  reliabilityState?: 'alpha' | 'beta';
};

const AppCanBeMigratedValue: FC<InjectedIntlProps & Props> = ({
  intl,
  appKey,
  canBeMigrated,
  automatedPathUrlForNonEap,
  contactVendorUrl,
  migrationPathInstructionsUrl,
  migrationRoadmapRequest,
  upgradeAppUrl,
  reliabilityAppUrl,
  reliabilityState,
}) => {
  // Handle Migration Roadmap Request 'Track request'
  const migrationPathExists: AppCloudCapability[] = [
    'yes',
    'install_only',
    'upgrade',
    'manual',
  ];
  if (migrationRoadmapRequest && !migrationPathExists.includes(canBeMigrated)) {
    return (
      <Status
        appearance="unknown"
        linkText={intl.formatMessage(messages.trackRequest)}
        linkProps={{
          href: migrationRoadmapRequest,
          analyticsId: 'migrationSeeRoadmapRequestLink',
          analyticsAttributes: { appKey },
        }}
      />
    );
  }

  switch (canBeMigrated) {
    case 'yes':
    case 'install_only':
      let secondaryLink;

      // Handle EAP signup link
      if (automatedPathUrlForNonEap) {
        secondaryLink = {
          secondarylinkText: intl.formatMessage(messages.signUpForEap),
          secondarylinkProps: {
            analyticsAttributes: { appKey },
            analyticsId: 'migrationSigneUpEAP',
            href: automatedPathUrlForNonEap,
          },
        };
      }

      // Handle app reliability stage
      if (reliabilityAppUrl && reliabilityState) {
        const reliabilityProps = {
          alpha: {
            text: messages.appReliabilityStageOne,
            tooltip: messages.appReliabilityStageOneTooltip,
            appearance: 'subtleSuccess' as const,
            analyticsId: 'migrationStage1Link',
          },
          beta: {
            text: messages.appReliabilityStageTwo,
            tooltip: messages.appReliabilityStageTwoTooltip,
            appearance: 'success' as const,
            analyticsId: 'migrationStage2Link',
          },
        };

        secondaryLink = {
          secondarylinkText: (
            <Tooltip
              content={intl.formatMessage(
                reliabilityProps[reliabilityState].tooltip,
              )}
            >
              <div>
                {intl.formatMessage(reliabilityProps[reliabilityState].text)}
              </div>
            </Tooltip>
          ),
          secondarylinkProps: {
            analyticsAttributes: { appKey },
            analyticsId: reliabilityProps[reliabilityState].analyticsId,
            href: reliabilityAppUrl,
          },
          appearance: reliabilityProps[reliabilityState].appearance,
        };
      }

      return (
        <Status
          appearance="success"
          linkText={intl.formatMessage(messages.automatedPath)}
          linkProps={
            migrationPathInstructionsUrl
              ? {
                  href: migrationPathInstructionsUrl,
                  analyticsId: 'migrationSeePathwayLink',
                  analyticsAttributes: { appKey },
                }
              : undefined
          }
          {...secondaryLink}
        />
      );

    case 'manual':
      return (
        <Status
          appearance="subtleSuccess"
          linkText={intl.formatMessage(messages.viewPath)}
          linkProps={
            migrationPathInstructionsUrl
              ? {
                  href: migrationPathInstructionsUrl,
                  analyticsId: 'migrationSeePathwayLink',
                  analyticsAttributes: { appKey },
                }
              : undefined
          }
        />
      );

    case 'unknown':
      return (
        <Tooltip content={intl.formatMessage(messages.contactVendorTooltip)}>
          <Status
            appearance="subtleError"
            linkText={intl.formatMessage(messages.contactVendor)}
            linkProps={
              contactVendorUrl
                ? {
                    href: contactVendorUrl,
                    analyticsId: 'migrationContactVendorLink',
                    analyticsAttributes: { appKey },
                  }
                : undefined
            }
          />
        </Tooltip>
      );

    case 'upgrade':
      return (
        <Tooltip content={intl.formatMessage(messages.upgradeAppTooltip)}>
          <Status
            appearance="warning"
            linkText={intl.formatMessage(messages.upgradeApp)}
            linkProps={
              upgradeAppUrl
                ? {
                    href: upgradeAppUrl,
                    analyticsId: 'migrationUpgradeAppLink',
                    analyticsAttributes: { appKey },
                  }
                : undefined
            }
          />
        </Tooltip>
      );
    case 'discarded':
    default:
      return <Status appearance="error" />;
  }
};

export default injectIntl(AppCanBeMigratedValue);
