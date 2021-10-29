// eslint-disable-next-line import/no-extraneous-dependencies
import { defineMessages } from 'react-intl';

export default defineMessages({
  modalHeader: {
    id: 'bitbucket.reports.modalHeader',
    description: 'Label for a modal dialog header.',
    defaultMessage: 'Reports',
  },
  outdatedModalHeader: {
    id: 'bitbucket.reports.outdatedModalHeader',
    description: 'Label for an outdated annotations modal dialog header.',
    defaultMessage: 'Outdated annotations',
  },
  outdatedModalMessage: {
    id: 'bitbucket.reports.outdatedModalMessage',
    description:
      'Label for an outdated annotations modal dialog header message.',
    defaultMessage: `The annotations are possibly outdated because this file has been changed on the target branch.
       Update your branch with changes from the target branch to get annotations for this file.`,
  },
  new: {
    id: 'bitbucket.reports.new',
    description: 'Label for new lozenge.',
    defaultMessage: 'new',
  },
  labelError: {
    id: 'bitbucket.reports.labelError',
    description: 'Label for sidebar icon with failed code insights reports.',
    defaultMessage: 'Report error',
  },
  header: {
    id: 'bitbucket.reports.header',
    description:
      'Header with number of code insights reports in a pull request',
    defaultMessage: `{total, plural, 
        one {{formattedCount} report} 
        other {{formattedCount} reports}}`,
  },
  emptyStateImage: {
    id: 'bitbucket.reports.emptyStateImage',
    description:
      'Label for image appearing when there are no code insights reports.',
    defaultMessage: 'Learn more about reports',
  },
  emptyStateMessage: {
    id: 'bitbucket.reports.emptyStateyMessage',
    description:
      'Message appearing when there are no code insights reports and pipelines are set up.',
    defaultMessage:
      'Get visibility into your code with code insights. Set up a pipe or an integration to start viewing the reports.',
  },
  learnMore: {
    id: 'bitbucket.reports.learnMore',
    description:
      'Link pointing to documentation how to set up code insights reports.',
    defaultMessage: 'Learn more',
  },
  emptyStateDiscoveryLearnMore: {
    id: 'bitbucket.reports.emptyStateDiscoveryLearnMore',
    description:
      'Link pointing to pipes discovery dialog with pre-selected code-insights tag.',
    defaultMessage: 'Set up a pipe',
  },
  emptyStatePipelinesLearnMore: {
    id: 'bitbucket.reports.emptyStatePipelinesLearnMore',
    description: 'Link pointing to enable pipelines.',
    defaultMessage: 'Set up a pipeline',
  },
  premiumResultIcon: {
    id: 'bitbucket.reports.premiumResultIcon',
    description: 'Text for premium code insights icon',
    defaultMessage: 'Premium',
  },
  passedResultIcon: {
    id: 'bitbucket.reports.passedResultIcon',
    description: 'Text for passed code insights icon',
    defaultMessage: 'Passed',
  },
  failedResultIcon: {
    id: 'bitbucket.reports.failedResultIcon',
    description: 'Text for failed code insights icon',
    defaultMessage: 'Failed',
  },
  pendingResultIcon: {
    id: 'bitbucket.reports.pendingResultIcon',
    description: 'Text for pending code insights icon',
    defaultMessage: 'Pending',
  },
  unknownResultIcon: {
    id: 'bitbucket.reports.unknownResultIcon',
    description: 'Text for unknown code insights icon',
    defaultMessage: 'Unknown',
  },
  skippedResultIcon: {
    id: 'bitbucket.reports.skippedResultIcon',
    description: 'Text for skipped code insights icon',
    defaultMessage: 'Skipped',
  },
  ignoredResultIcon: {
    id: 'bitbucket.reports.ignoredResultIcon',
    description: 'Text for ignored code insights icon',
    defaultMessage: 'Ignored',
  },
  modalClose: {
    id: 'bitbucket.reports.modalClose',
    description: 'Text for close modal icon',
    defaultMessage: 'Close Modal',
  },
  reporterMeta: {
    id: 'bitbucket.reports.reporterMeta',
    description: 'Text for reporter metadata',
    defaultMessage: '{reporter} reported {date}',
  },
  resultHeader: {
    id: 'bitbucket.reports.resultHeader',
    description: 'Text for result header',
    defaultMessage: 'Result',
  },
  severityHeader: {
    id: 'bitbucket.reports.severityHeader',
    description: 'Text for severity header',
    defaultMessage: 'Severity',
  },
  summaryHeader: {
    id: 'bitbucket.reports.summaryHeader',
    description: 'Text for summary header',
    defaultMessage: 'Summary',
  },
  fileHeader: {
    id: 'bitbucket.reports.fileHeader',
    description: 'Text for file header',
    defaultMessage: 'File',
  },
  mediumSeverityIssues: {
    id: 'bitbucket.reports.mediumSeverityIssues',
    description: 'Text for total number of issues in report.',
    defaultMessage: 'Medium severity {issues}',
  },
  lowSeverityIssues: {
    id: 'bitbucket.reports.lowSeverityIssues',
    description: 'Text for total number of issues in report.',
    defaultMessage: 'Low severity {issues}',
  },
  collapse: {
    id: 'bitbucket.reports.collapse',
    description: 'Label for collapse annotation icon',
    defaultMessage: 'Collapse',
  },
  expand: {
    id: 'bitbucket.reports.expand',
    description: 'Label for expand annotation icon',
    defaultMessage: 'Expand',
  },
  externalLink: {
    id: 'bitbucket.reports.externalLink',
    description: 'Label for icon linking to external report',
    defaultMessage: 'Open report',
  },
  pendingReportMessage: {
    id: 'bitbucket.reports.pendingReportMessage',
    description: 'Placeholder text for when report is in PENDING state.',
    defaultMessage: 'This report is not ready. Please check back in a while.',
  },
  noAnnotationsReportMessage: {
    id: 'bitbucket.reports.noAnnotations',
    description: 'Placeholder text for when report has no annotations.',
    defaultMessage: 'There were no annotations provided in this report.',
  },
  reportMetadataTrue: {
    id: 'bitbucket.reports.reportMetadataTrue',
    description: 'Label for truthy boolean report data value',
    defaultMessage: 'Yes',
  },
  reportMetadataFalse: {
    id: 'bitbucket.reports.reportMetadataFalse',
    description: 'Label for falsy boolean report data value',
    defaultMessage: 'No',
  },
  lockedReportIcon: {
    id: 'bitbucket.reports.lockedReportIcon',
    description: 'Icon for locked report',
    defaultMessage: 'Report locked',
  },
  lockedReportHeading: {
    id: 'bitbucket.reports.lockedReportHeading',
    description: 'Heading for locked report',
    defaultMessage: 'You’ve reached a limit of 3 free reports',
  },
  lockedReportUpgradeHeading: {
    id: 'bitbucket.reports.lockedReportUpgradeHeading',
    description: 'Heading to upgrade to see locked reports',
    defaultMessage: 'Upgrade to view all reports',
  },
  lockedReportUpgradeMessage: {
    id: 'bitbucket.reports.lockedReportUpgradeMessage',
    description: 'Message to upgrade to see locked reports',
    defaultMessage:
      'Upgrade to Bitbucket standard to view all reports for this pull request.',
  },
  seePlans: {
    id: 'bitbucket.reports.seePlans',
    description: 'Label on the upgrade plan button',
    defaultMessage: 'See plans',
  },
  resultPassedIcon: {
    id: 'bitbucket.reports.resultPassedIcon',
    description: 'Text for passed code insights icon',
    defaultMessage: 'Passed',
  },
  resultFailedIcon: {
    id: 'bitbucket.reports.resultFailedIcon',
    description: 'Text for failed code insights icon',
    defaultMessage: 'Failed',
  },
  resultSkippedIcon: {
    id: 'bitbucket.reports.skippedRresultSkippedIconesultIcon',
    description: 'Text for skipped code insights icon',
    defaultMessage: 'Skipped',
  },
  resultIgnoredIcon: {
    id: 'bitbucket.reports.resultIgnoredIcon',
    description: 'Text for ignored code insights icon',
    defaultMessage: 'Ignored',
  },
  severityCriticalIcon: {
    id: 'bitbucket.reports.severityCriticalIcon',
    description: 'Icon text for annotation with critical severity',
    defaultMessage: 'Critical',
  },
  severityHighIcon: {
    id: 'bitbucket.reports.severityHighIcon',
    description: 'Icon text for annotation with high severity',
    defaultMessage: 'High',
  },
  severityMediumIcon: {
    id: 'bitbucket.reports.severityMediumIcon',
    description: 'Icon text for annotation with medium severity',
    defaultMessage: 'Medium',
  },
  severityLowIcon: {
    id: 'bitbucket.reports.severityLowIcon',
    description: 'Icon text for annotation with low severity',
    defaultMessage: 'Low',
  },
  prAnnotationsLabel: {
    id: 'bitbucket.reports.prAnnotationsLabel',
    description: 'Text for pull request annotation toggle',
    defaultMessage: 'Annotations',
  },
  prAnnotationsThisPr: {
    id: 'bitbucket.reports.prAnnotationsThisPr',
    description: 'Text for this pull request annotations toggle button',
    defaultMessage: 'This pull request',
  },
  prAnnotationsAll: {
    id: 'bitbucket.reports.prAnnotationsAll',
    description: 'Text for all annotations toggle button',
    defaultMessage: 'All',
  },
});
