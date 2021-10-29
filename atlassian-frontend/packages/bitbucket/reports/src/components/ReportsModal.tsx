import React, { useEffect, useMemo, useState } from 'react';

import add_milliseconds from 'date-fns/addMilliseconds';
import format from 'date-fns/format';
import { InView } from 'react-intersection-observer';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  FormattedMessage,
  FormattedRelative,
  InjectedIntlProps,
  injectIntl,
} from 'react-intl'; // eslint-disable-line import/no-extraneous-dependencies

// eslint-disable-next-line import/no-extraneous-dependencies
import {
  createAndFireEvent,
  withAnalyticsContext,
  withAnalyticsEvents,
  WithAnalyticsEventsProps,
} from '@atlaskit/analytics-next'; // eslint-disable-line import/no-extraneous-dependencies
import Button, { ButtonGroup, Theme as ButtonTheme } from '@atlaskit/button';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import DashboardIcon from '@atlaskit/icon/glyph/dashboard';
import ModalDialog, {
  ModalBody,
  ModalHeader,
  ModalTitle,
  useModal,
} from '@atlaskit/modal-dialog';
import SectionMessage from '@atlaskit/section-message';
// eslint-disable-next-line import/no-extraneous-dependencies
import Spinner from '@atlaskit/spinner';

import { Annotation, Report, ReportResult } from '../types';
import {
  name as packageName,
  version as packageVersion,
} from '../version.json';

import messages from './i18n';
import ReportsAnnotationItem from './ReportsAnnotationItem';
import ReportsLockedScreen from './ReportsLockedScreen';
import ReportsResultItem from './ReportsResultItem';
import {
  HeadExpanderCell,
  HeadLinkCell,
  HeadPathCell,
  HeadResultCell,
  HeadSeverityCell,
  HeadSummaryCell,
  ModalContent,
  ModalSidebar,
  ModalWrapper,
  prToggleTheme,
  PrToggleWrapper,
  ReporterDate,
  ReporterDetails,
  ReporterInfo,
  ReporterLogo,
  ReporterMetadataItem,
  ReporterMetadataWrapper,
  ReporterTitle,
  SpinnerContainer,
} from './styled';

const Header = injectIntl(({ intl }: InjectedIntlProps) => {
  const { onClose } = useModal();
  return (
    <ModalHeader>
      <ModalTitle>{intl.formatMessage(messages.modalHeader)}</ModalTitle>
      <Button onClick={onClose} appearance="subtle-link" spacing="none">
        <CrossIcon label={intl.formatMessage(messages.modalClose)} />
      </Button>
    </ModalHeader>
  );
});

type PrToggleProps = {
  annotations: Annotation[];
  currentPullRequestAnnotationsForReport?: Annotation[];
  isPrAnnotationsSelected: boolean;
  selectPrAnnotations: (selectPrAnnotation: boolean) => void;
} & InjectedIntlProps;

export const PrToggle = injectIntl(
  ({
    annotations,
    currentPullRequestAnnotationsForReport,
    isPrAnnotationsSelected,
    selectPrAnnotations,
    intl,
  }: PrToggleProps) => {
    if (
      !currentPullRequestAnnotationsForReport ||
      currentPullRequestAnnotationsForReport.length === 0
    ) {
      return null;
    }

    return (
      <PrToggleWrapper>
        <strong>{intl.formatMessage(messages.prAnnotationsLabel)}:</strong>
        <ButtonTheme.Provider value={prToggleTheme}>
          <ButtonGroup>
            <Button
              spacing="compact"
              onClick={() => selectPrAnnotations(true)}
              isSelected={isPrAnnotationsSelected}
            >
              {intl.formatMessage(messages.prAnnotationsThisPr)} (
              {currentPullRequestAnnotationsForReport.length})
            </Button>
            <Button
              spacing="compact"
              onClick={() => selectPrAnnotations(false)}
              isSelected={!isPrAnnotationsSelected}
            >
              {intl.formatMessage(messages.prAnnotationsAll)} (
              {annotations.length})
            </Button>
          </ButtonGroup>
        </ButtonTheme.Provider>
      </PrToggleWrapper>
    );
  },
);

type AnnotationsTableProps = {
  annotations: Annotation[];
  currentPullRequestAnnotations?: Annotation[];
  closeDialog: () => void;
  getSourceUrl: (path: string) => string;
} & InjectedIntlProps;

export const AnnotationsTable = React.memo(
  injectIntl(
    ({
      annotations,
      currentPullRequestAnnotations,
      getSourceUrl,
      closeDialog,
      intl,
    }: AnnotationsTableProps) => {
      const totalIssues = annotations.length;
      if (totalIssues === 0) {
        return null;
      }

      const hasDetails = annotations.some((a) => !!a.details);
      const hasPath = annotations.some((a) => !!a.path);
      const hasResult = annotations.some((a) => !!a.result);
      const hasSeverity = annotations.some((a) => !!a.severity);

      // AFP-2511 TODO: Fix automatic suppressions below
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const currentPullRequestAnnotationsForReport = useMemo(
        () =>
          (currentPullRequestAnnotations || []).filter(
            (annotation) =>
              annotations.findIndex((a) => a.uuid === annotation.uuid) !== -1,
          ),
        [annotations, currentPullRequestAnnotations],
      );

      // AFP-2511 TODO: Fix automatic suppressions below
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [isPrAnnotationsSelected, selectPrAnnotations] = useState(
        currentPullRequestAnnotationsForReport.length > 0,
      );

      const currentAnnotations = isPrAnnotationsSelected
        ? currentPullRequestAnnotationsForReport
        : annotations;

      return (
        <>
          <PrToggle
            annotations={annotations}
            currentPullRequestAnnotationsForReport={
              currentPullRequestAnnotationsForReport
            }
            isPrAnnotationsSelected={isPrAnnotationsSelected}
            selectPrAnnotations={selectPrAnnotations}
          />
          <table>
            <thead>
              <tr>
                {hasDetails && <HeadExpanderCell />}
                {hasResult && (
                  <HeadResultCell>
                    {intl.formatMessage(messages.resultHeader)}
                  </HeadResultCell>
                )}
                {hasSeverity && (
                  <HeadSeverityCell>
                    {intl.formatMessage(messages.severityHeader)}
                  </HeadSeverityCell>
                )}
                <HeadSummaryCell>
                  {intl.formatMessage(messages.summaryHeader)}
                </HeadSummaryCell>
                {hasPath && (
                  <HeadPathCell>
                    {intl.formatMessage(messages.fileHeader)}
                  </HeadPathCell>
                )}
                <HeadLinkCell />
              </tr>
            </thead>
            {currentAnnotations.map((annotation, i) => (
              <InView
                triggerOnce
                key={`code-insights-annotation-item-${i}${annotation.uuid}`}
              >
                {({ inView, ref }: any) =>
                  inView ? (
                    <tbody ref={ref}>
                      <ReportsAnnotationItem
                        codeInsightsAnnotation={annotation}
                        hasDetails={hasDetails}
                        hasPath={hasPath}
                        hasResult={hasResult}
                        hasSeverity={hasSeverity}
                        getSourceUrl={getSourceUrl}
                        onCloseDialog={closeDialog}
                        isPrAnnotationsSelected={isPrAnnotationsSelected}
                      />
                    </tbody>
                  ) : (
                    <tbody ref={ref}>
                      <tr style={{ height: '37px' }} />
                    </tbody>
                  )
                }
              </InView>
            ))}
          </table>
        </>
      );
    },
  ),
);

type FormattedMetadataProps = {
  data: {
    title: string;
    type:
      | 'BOOLEAN'
      | 'DATE'
      | 'DURATION'
      | 'LINK'
      | 'NUMBER'
      | 'PERCENTAGE'
      | 'TEXT';
    value: any;
  };
} & InjectedIntlProps;

export const FormattedMetadata = injectIntl(
  ({ data, intl }: FormattedMetadataProps) => {
    if (data.type === 'BOOLEAN') {
      return (
        <strong>
          {intl.formatMessage(
            data.value
              ? messages.reportMetadataTrue
              : messages.reportMetadataFalse,
          )}
        </strong>
      );
    } else if (data.type === 'DATE') {
      return (
        <strong>
          <FormattedRelative value={data.value} />
        </strong>
      );
    } else if (data.type === 'LINK' && data.value.text && data.value.href) {
      return (
        <a href={data.value.href} target="_blank" rel="nofollow">
          <strong>{data.value.text}</strong>
        </a>
      );
    } else if (data.type === 'DURATION') {
      return (
        <strong>
          {format(add_milliseconds(new Date(0), data.value), 'm[m] s[s]')}
        </strong>
      );
    } else if (data.type === 'PERCENTAGE') {
      return <strong>{data.value}%</strong>;
    }
    return <strong>{String(data.value)}</strong>;
  },
);

type Props = {
  closeDialog: () => void;
  codeInsightsAnnotations: Annotation[];
  currentPullRequestAnnotations?: Annotation[];
  codeInsightsReports: Report[];
  getSourceUrl: (path: string) => string;
  isLoading: boolean;
  onExternalReportClick?: () => void;
  onLoad?: () => void;
  onReportClick?: () => void;
  selectedReportIndex: number;
  setSelectedReport: (selectedReport: number) => void;
} & InjectedIntlProps &
  WithAnalyticsEventsProps;

const ReportsModal = injectIntl(
  ({
    closeDialog,
    codeInsightsAnnotations,
    currentPullRequestAnnotations,
    codeInsightsReports,
    getSourceUrl,
    isLoading,
    onExternalReportClick,
    onLoad,
    onReportClick,
    selectedReportIndex,
    setSelectedReport,
    intl,
  }: Props) => {
    const selectedReport = codeInsightsReports[selectedReportIndex];

    useEffect(() => {
      if (onLoad) {
        onLoad();
      }
    }, [onLoad]);

    return (
      <ModalDialog onClose={closeDialog} width="x-large" height="80vh">
        <Header />
        <ModalBody>
          <ModalWrapper>
            <ModalSidebar>
              {codeInsightsReports.map((report, i) => (
                <ReportsResultItem
                  key={`code-insights-modal-item-${i}`}
                  codeInsightsReport={report}
                  openDialogWithSelectedReport={() => {
                    setSelectedReport(i);
                    if (onReportClick) {
                      onReportClick();
                    }
                  }}
                  isActive={selectedReportIndex === i}
                  isModalView
                />
              ))}
            </ModalSidebar>
            <ModalContent>
              <ReporterInfo>
                <ReporterLogo>
                  {selectedReport.logo_url ? (
                    <img
                      src={selectedReport.logo_url}
                      alt={selectedReport.reporter}
                      role="presentation"
                    />
                  ) : (
                    <DashboardIcon label={selectedReport.reporter} />
                  )}
                </ReporterLogo>
                <ReporterTitle>
                  {selectedReport.link ? (
                    <Button
                      spacing="none"
                      appearance="link"
                      href={selectedReport.link}
                      target="_blank"
                      rel="nofollow"
                      onClick={() => {
                        if (onExternalReportClick) {
                          onExternalReportClick();
                        }
                      }}
                    >
                      {selectedReport.title}
                    </Button>
                  ) : (
                    selectedReport.title
                  )}
                </ReporterTitle>
                <ReporterDate>
                  <FormattedMessage
                    {...messages.reporterMeta}
                    values={{
                      reporter: selectedReport.reporter,
                      date: selectedReport.updated_on ? (
                        <FormattedRelative value={selectedReport.updated_on} />
                      ) : (
                        ''
                      ),
                    }}
                  />
                </ReporterDate>
                {!selectedReport.is_locked && (
                  <ReporterDetails>{selectedReport.details}</ReporterDetails>
                )}
              </ReporterInfo>
              {!selectedReport.is_locked &&
              selectedReport.data &&
              selectedReport.data.length ? (
                <ReporterMetadataWrapper>
                  {selectedReport.data.map((data, key) => (
                    <ReporterMetadataItem
                      key={`code-insights-reporter-metadata-item-${key}`}
                    >
                      <dt>{data.title}</dt>
                      <dd>
                        <FormattedMetadata data={data} />
                      </dd>
                    </ReporterMetadataItem>
                  ))}
                </ReporterMetadataWrapper>
              ) : null}
              {selectedReport.is_locked ? (
                <ReportsLockedScreen />
              ) : isLoading ? (
                <SpinnerContainer>
                  <Spinner size="large" />
                </SpinnerContainer>
              ) : codeInsightsAnnotations.length === 0 ? (
                <SectionMessage appearance="information">
                  <p>
                    {intl.formatMessage(
                      selectedReport.result === ReportResult.Pending
                        ? messages.pendingReportMessage
                        : messages.noAnnotationsReportMessage,
                    )}
                  </p>
                </SectionMessage>
              ) : (
                <AnnotationsTable
                  annotations={codeInsightsAnnotations}
                  currentPullRequestAnnotations={currentPullRequestAnnotations}
                  getSourceUrl={getSourceUrl}
                  closeDialog={closeDialog}
                />
              )}
            </ModalContent>
          </ModalWrapper>
        </ModalBody>
      </ModalDialog>
    );
  },
);

export { ReportsModal as ReportsModalWithoutAnalytics };
const createAndFireEventOnBitbucket = createAndFireEvent('bitbucket');

export default withAnalyticsContext({
  attributes: {
    componentName: 'reports',
    packageName,
    packageVersion,
  },
})(
  withAnalyticsEvents({
    onReportClick: createAndFireEventOnBitbucket({
      action: 'clicked',
      actionSubject: 'button',
      actionSubjectId: 'selectReportButton',
    }),
    onExternalReportClick: createAndFireEventOnBitbucket({
      action: 'clicked',
      actionSubject: 'button',
      actionSubjectId: 'reporterLink',
    }),
  })(ReportsModal),
);
