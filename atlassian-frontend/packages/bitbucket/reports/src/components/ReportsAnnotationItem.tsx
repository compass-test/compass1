import React, { useState } from 'react';

import AnimateHeight from 'react-animate-height';
// eslint-disable-next-line import/no-extraneous-dependencies
import { InjectedIntlProps, injectIntl } from 'react-intl';

// eslint-disable-next-line import/no-extraneous-dependencies
import {
  createAndFireEvent,
  withAnalyticsContext,
  withAnalyticsEvents,
  WithAnalyticsEventsProps,
} from '@atlaskit/analytics-next'; // eslint-disable-line import/no-extraneous-dependencies
import Button from '@atlaskit/button/custom-theme-button';
import Icon from '@atlaskit/icon';
import PriorityCriticalIcon from '@atlaskit/icon-priority/glyph/priority-critical';
import PriorityHighestIcon from '@atlaskit/icon-priority/glyph/priority-highest';
import PriorityLowIcon from '@atlaskit/icon-priority/glyph/priority-low';
import PriorityMediumIcon from '@atlaskit/icon-priority/glyph/priority-medium';
import ResultPassedIcon from '@atlaskit/icon/glyph/check-circle';
import ChevronRightIcon from '@atlaskit/icon/glyph/chevron-right-large';
import ResultFailedIcon from '@atlaskit/icon/glyph/jira/failed-build-status';
import ShortcutIcon from '@atlaskit/icon/glyph/shortcut';
// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { colors } from '@atlaskit/theme';
import Tooltip from '@atlaskit/tooltip';

import { Annotation, AnnotationResult, AnnotationSeverity } from '../types';
import {
  name as packageName,
  version as packageVersion,
} from '../version.json';

import ResultSkippedIconGlyph from './assets/SkippedIcon';
import messages from './i18n';
import {
  AnnotationExpander,
  AnnotationIconWrapper,
  AnnotationRow,
  AnnotationSummary,
  BodyCell,
  BodyExpanderCell,
  BodyLinkCell,
  BodyPathCell,
  BodyResultCell,
  BodySeverityCell,
  DetailsCell,
  DetailsWrapper,
  ExternalLink,
  ResultText,
  ResultWrapper,
  SeverityInfo,
  UnknownIcon,
} from './styled';

const SUMMARY_LENGTH_WITHOUT_TOOLTIP = 30;

export const AnnotationResultIcon = injectIntl(
  ({ result, intl }: { result: AnnotationResult } & InjectedIntlProps) => {
    switch (result) {
      case AnnotationResult.Passed:
        return (
          <ResultPassedIcon
            label={intl.formatMessage(messages.resultPassedIcon)}
            primaryColor={colors.G300}
          />
        );
      case AnnotationResult.Failed:
        return (
          <ResultFailedIcon
            label={intl.formatMessage(messages.resultFailedIcon)}
            primaryColor={colors.R400}
          />
        );
      case AnnotationResult.Skipped:
        return (
          <Icon
            label={intl.formatMessage(messages.resultSkippedIcon)}
            primaryColor={colors.Y300}
            glyph={ResultSkippedIconGlyph}
          />
        );
      case AnnotationResult.Ignored:
        return (
          <UnknownIcon title={intl.formatMessage(messages.resultIgnoredIcon)} />
        );
      default:
        return null;
    }
  },
);

export const AnnotationSeverityIcon = injectIntl(
  ({
    severity,
    intl,
  }: { severity?: AnnotationSeverity } & InjectedIntlProps) => {
    switch (severity) {
      case AnnotationSeverity.Critical:
        return (
          <PriorityCriticalIcon
            label={intl.formatMessage(messages.severityCriticalIcon)}
            size="small"
          />
        );
      case AnnotationSeverity.High:
        return (
          <PriorityHighestIcon
            label={intl.formatMessage(messages.severityHighIcon)}
            size="small"
          />
        );
      case AnnotationSeverity.Medium:
        return (
          <PriorityMediumIcon
            label={intl.formatMessage(messages.severityMediumIcon)}
            size="small"
          />
        );
      case AnnotationSeverity.Low:
        return (
          <PriorityLowIcon
            label={intl.formatMessage(messages.severityLowIcon)}
            size="small"
          />
        );
      default:
        return null;
    }
  },
);

type Props = WithAnalyticsEventsProps &
  InjectedIntlProps & {
    getSourceUrl: (path: string) => string;
    codeInsightsAnnotation: Annotation;
    hasDetails: boolean;
    hasPath: boolean;
    hasResult: boolean;
    hasSeverity: boolean;
    isPrAnnotationsSelected?: boolean;
    onCloseDialog?: () => void;
    onPathClick?: () => void;
    onExternalAnnotationClick?: () => void;
  };

const ReportsAnnotationItem = React.memo(
  injectIntl(
    ({
      codeInsightsAnnotation,
      getSourceUrl,
      hasDetails,
      hasPath,
      hasResult,
      hasSeverity,
      onPathClick,
      isPrAnnotationsSelected,
      onExternalAnnotationClick,
      onCloseDialog,
      intl,
    }: Props) => {
      const {
        link,
        path,
        line,
        severity,
        result,
        summary,
        details,
      } = codeInsightsAnnotation;

      // AFP-2511 TODO: Fix automatic suppressions below
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [isExpanded, setExpanded] = useState(false);
      const numberOfColumns =
        1 +
        (hasDetails ? 1 : 0) +
        (hasPath ? 1 : 0) +
        (hasSeverity ? 1 : 0) +
        (hasResult ? 1 : 0);

      return (
        <>
          <AnnotationRow>
            {hasDetails && (
              <BodyExpanderCell>
                {details && (
                  <AnnotationExpander isExpanded={isExpanded}>
                    <Button
                      onClick={() => setExpanded(!isExpanded)}
                      appearance="subtle-link"
                      spacing="none"
                      iconBefore={
                        <ChevronRightIcon
                          size="small"
                          label={intl.formatMessage(
                            isExpanded ? messages.collapse : messages.expand,
                          )}
                        />
                      }
                    />
                  </AnnotationExpander>
                )}
              </BodyExpanderCell>
            )}
            {hasResult && (
              <BodyResultCell>
                {result && (
                  <ResultWrapper>
                    <AnnotationIconWrapper>
                      <AnnotationResultIcon result={result} />
                    </AnnotationIconWrapper>
                    <ResultText>
                      {intl.formatMessage(
                        // @ts-ignore TODO: fix noImplicitAny error here
                        messages[
                          {
                            PASSED: 'resultPassedIcon',
                            FAILED: 'resultFailedIcon',
                            SKIPPED: 'resultSkippedIcon',
                            IGNORED: 'resultIgnoredIcon',
                          }[result]
                        ],
                      )}
                    </ResultText>
                  </ResultWrapper>
                )}
              </BodyResultCell>
            )}
            {hasSeverity && (
              <BodySeverityCell>
                {severity && (
                  <SeverityInfo>
                    <AnnotationIconWrapper>
                      <AnnotationSeverityIcon
                        severity={codeInsightsAnnotation.severity}
                      />
                    </AnnotationIconWrapper>
                    {intl.formatMessage(
                      // @ts-ignore TODO: fix noImplicitAny error here
                      messages[
                        {
                          LOW: 'severityLowIcon',
                          MEDIUM: 'severityMediumIcon',
                          HIGH: 'severityHighIcon',
                          CRITICAL: 'severityCriticalIcon',
                        }[severity]
                      ],
                    )}
                  </SeverityInfo>
                )}
              </BodySeverityCell>
            )}
            <BodyCell>
              {summary && summary.length > SUMMARY_LENGTH_WITHOUT_TOOLTIP ? (
                <Tooltip content={summary} position="mouse">
                  <AnnotationSummary>{summary}</AnnotationSummary>
                </Tooltip>
              ) : (
                <AnnotationSummary>{summary}</AnnotationSummary>
              )}
            </BodyCell>
            {hasPath && (
              <BodyPathCell>
                {path && (
                  <Tooltip content={path}>
                    <Button
                      spacing="none"
                      appearance="link"
                      href={
                        isPrAnnotationsSelected
                          ? `#L${path}${line ? `T${line}` : ''}`
                          : `${getSourceUrl(path)}${
                              line ? `#lines-${line}` : ''
                            }`
                      }
                      target={isPrAnnotationsSelected ? '_self' : '_blank'}
                      rel="nofollow"
                      onClick={() => {
                        if (onPathClick) {
                          onPathClick();
                        }
                        if (isPrAnnotationsSelected && onCloseDialog) {
                          onCloseDialog();
                        }
                      }}
                    >
                      {path}
                      {line ? `:${line}` : null}
                    </Button>
                  </Tooltip>
                )}
              </BodyPathCell>
            )}
            <BodyLinkCell>
              {link && (
                <Tooltip content={intl.formatMessage(messages.externalLink)}>
                  <ExternalLink>
                    <Button
                      appearance="link"
                      href={link}
                      iconBefore={
                        <ShortcutIcon
                          label={intl.formatMessage(messages.externalLink)}
                          size="small"
                        />
                      }
                      spacing="none"
                      target="_blank"
                      rel="nofollow"
                      onClick={() => {
                        if (onExternalAnnotationClick) {
                          onExternalAnnotationClick();
                        }
                      }}
                    />
                  </ExternalLink>
                </Tooltip>
              )}
            </BodyLinkCell>
          </AnnotationRow>
          {details && (
            <tr>
              <DetailsCell />
              <DetailsCell colSpan={numberOfColumns}>
                <AnimateHeight
                  duration={200}
                  easing="linear"
                  height={!isExpanded ? 0 : 'auto'}
                >
                  <DetailsWrapper>{details && <p>{details}</p>}</DetailsWrapper>
                </AnimateHeight>
              </DetailsCell>
            </tr>
          )}
        </>
      );
    },
  ),
);

export { ReportsAnnotationItem as ReportsAnnotationItemWithoutAnalytics };
const createAndFireEventOnBitbucket = createAndFireEvent('bitbucket');

export default withAnalyticsContext({
  attributes: {
    componentName: 'reports',
    packageName,
    packageVersion,
  },
})(
  withAnalyticsEvents({
    onPathClick: createAndFireEventOnBitbucket({
      action: 'clicked',
      actionSubject: 'button',
      actionSubjectId: 'viewAnnotationPathLink',
    }),
    onExternalAnnotationClick: createAndFireEventOnBitbucket({
      action: 'clicked',
      actionSubject: 'button',
      actionSubjectId: 'viewExternalAnnotationLink',
    }),
  })(ReportsAnnotationItem),
);
