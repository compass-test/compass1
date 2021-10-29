import React from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { IntlProvider } from 'react-intl';

import { annotations } from './common/annotations-mock';
import { reports } from './common/reports-mock';
import { Annotation, Report } from './types';

import ReportsModal, {
  OutdatedAnnotationsModal,
  ReportsAnnotationItemWithoutAnalytics as ReportsAnnotationItem,
  ReportsLockedScreen,
  ReportsResultItem,
} from './index';

export const ReportModal = () => (
  <IntlProvider locale="en">
    <div style={{ width: '650px' }}>
      <ReportsModal
        codeInsightsAnnotations={annotations.map((a) => ({
          ...a,
          result: undefined,
        }))}
        codeInsightsReports={reports}
        isLoading={false}
        selectedReportIndex={0}
        setSelectedReport={(selectedReport) => {}}
        getSourceUrl={(path) => path}
        closeDialog={() => {}}
      />
    </div>
  </IntlProvider>
);

export const ReportModalPullRequest = () => (
  <IntlProvider locale="en">
    <div style={{ width: '650px' }}>
      <ReportsModal
        codeInsightsAnnotations={annotations.map((a) => ({
          ...a,
          result: undefined,
        }))}
        currentPullRequestAnnotations={annotations
          .map((a) => ({
            ...a,
            result: undefined,
          }))
          .slice(0, 2)}
        codeInsightsReports={reports}
        isLoading={false}
        selectedReportIndex={1}
        setSelectedReport={(selectedReport) => {}}
        getSourceUrl={(path) => path}
        closeDialog={() => {}}
      />
    </div>
  </IntlProvider>
);

export const ReportModalLargeDataset = () => (
  <IntlProvider locale="en">
    <div style={{ width: '650px' }}>
      <ReportsModal
        codeInsightsAnnotations={[...Array(1000)].map((x, i) => ({
          ...annotations[0],
          uuid: `${annotations[0]}-${i}`,
          result: undefined,
        }))}
        currentPullRequestAnnotations={annotations.map((a, i) => ({
          ...a,
          uuid: `${annotations[0]}-${i}`,
          result: undefined,
        }))}
        codeInsightsReports={reports}
        isLoading={false}
        selectedReportIndex={1}
        setSelectedReport={(selectedReport) => {}}
        getSourceUrl={(path) => path}
        closeDialog={() => {}}
      />
    </div>
  </IntlProvider>
);

export const ReportModalPendingState = () => (
  <IntlProvider locale="en">
    <div style={{ width: '650px' }}>
      <ReportsModal
        codeInsightsAnnotations={[]}
        codeInsightsReports={reports}
        isLoading={false}
        selectedReportIndex={2}
        setSelectedReport={(selectedReport) => {}}
        getSourceUrl={(path) => path}
        closeDialog={() => {}}
      />
    </div>
  </IntlProvider>
);

export const ReportModalNoAnnotationsState = () => (
  <IntlProvider locale="en">
    <div style={{ width: '650px' }}>
      <ReportsModal
        codeInsightsAnnotations={[]}
        codeInsightsReports={reports}
        isLoading={false}
        selectedReportIndex={3}
        setSelectedReport={(selectedReport) => {}}
        getSourceUrl={(path) => path}
        closeDialog={() => {}}
      />
    </div>
  </IntlProvider>
);

export const OutdatedAnnotations = () => (
  <IntlProvider locale="en">
    <div style={{ width: '650px' }}>
      <OutdatedAnnotationsModal
        outdatedAnnotations={annotations}
        getSourceUrl={(path) => path}
        closeDialog={() => {}}
      />
    </div>
  </IntlProvider>
);

export const ResultItem = () => (
  <IntlProvider locale="en">
    <div style={{ width: '200px' }}>
      {reports.map((report: Report) => (
        <ReportsResultItem
          key={report.uuid}
          codeInsightsReport={report}
          openDialogWithSelectedReport={() => {}}
          isActive={false}
          isModalView={false}
        />
      ))}
      <ReportsResultItem
        key={reports[0].uuid}
        codeInsightsReport={reports[0]}
        openDialogWithSelectedReport={() => {}}
        isActive={true}
        isModalView={false}
      />
      {reports.map((report: Report) => (
        <ReportsResultItem
          key={report.uuid}
          codeInsightsReport={report}
          openDialogWithSelectedReport={() => {}}
          isActive={false}
          isModalView={true}
        />
      ))}
      <ReportsResultItem
        key={reports[0].uuid}
        codeInsightsReport={reports[0]}
        openDialogWithSelectedReport={() => {}}
        isActive={true}
        isModalView={true}
      />
    </div>
  </IntlProvider>
);

export const AnnotationItem = () => (
  <IntlProvider locale="en">
    <div style={{ width: '650px' }}>
      <table>
        <tbody>
          {annotations.map((annotation: Annotation) => (
            <ReportsAnnotationItem
              getSourceUrl={(() => {}) as any}
              codeInsightsAnnotation={annotation}
              hasDetails
              hasPath
              hasResult
              hasSeverity={false}
            />
          ))}
        </tbody>
      </table>
      <table>
        <tbody>
          {annotations.map((annotation: Annotation) => (
            <ReportsAnnotationItem
              getSourceUrl={(() => {}) as any}
              codeInsightsAnnotation={annotation}
              hasDetails
              hasPath
              hasResult={false}
              hasSeverity
            />
          ))}
        </tbody>
      </table>
      <table>
        <tbody>
          {annotations.map((annotation: Annotation) => (
            <ReportsAnnotationItem
              getSourceUrl={(() => {}) as any}
              codeInsightsAnnotation={annotation}
              hasDetails={false}
              hasPath={false}
              hasResult={false}
              hasSeverity={false}
            />
          ))}
        </tbody>
      </table>
    </div>
  </IntlProvider>
);

export const LockedScreen = () => (
  <IntlProvider locale="en">
    <div style={{ width: '650px' }}>
      <ReportsLockedScreen />
    </div>
  </IntlProvider>
);

export default {
  title: 'bitbucket-reports',
};
