import React, { Component, Fragment } from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import Flag, { AutoDismissFlag, FlagGroup } from '@atlaskit/flag';
import SuccessIcon from '@atlaskit/icon/glyph/check-circle';
import WarningIcon from '@atlaskit/icon/glyph/warning';
// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { colors } from '@atlaskit/theme';
import { ScreenTypes, AnalyticsSource } from '../../common/analytics/util';
import ViewTracker from '../../common/analytics/view-tracker';
import { Props } from './types';

export const messages = defineMessages({
  'generic-error-heading': {
    id: 'project-pages.generic-error.heading',
    defaultMessage: 'Well, this is awkward...',
    description: '',
  },
  'generic-error-description': {
    id: 'project-pages.generic-error.description',
    defaultMessage: 'Something went wrong. Please try again later.',
    description: '',
  },
  'generic-error-reload-button': {
    id: 'project-pages.generic-error.button.reload',
    defaultMessage: 'Reload page',
    description: '',
  },
  'generic-success-flag-heading-space': {
    id: 'project-pages.generic-success-flag.heading.space',
    defaultMessage: 'Space connected',
    description: '',
  },
  'generic-success-flag-heading-page': {
    id: 'project-pages.generic-success-flag.heading.page',
    defaultMessage: 'Page connected',
    description: '',
  },
  'generic-success-flag-description-space': {
    id: 'project-pages.generic-success-flag.description.space',
    defaultMessage:
      'Successfully connected with {connectedSpaceOrPageName} space.',
    description: '',
  },
  'generic-success-flag-description-page': {
    id: 'project-pages.generic-success-flag.description.page',
    defaultMessage:
      'Successfully connected with {connectedSpaceOrPageName} page.',
    description: '',
  },
});

const SuccessFlagViewTracker = AnalyticsSource(
  'successFlag',
  ScreenTypes.MODAL,
)(ViewTracker);

const ErrorFlagViewTracker = AnalyticsSource(
  'errorFlag',
  ScreenTypes.MODAL,
)(ViewTracker);

class Flags extends Component<Props> {
  render() {
    const {
      intl,
      hasErrors,
      onErrorDismiss,
      onSuccessDismiss,
      onReload,
      showSuccessFlag,
      connectedSpaceOrPageName,
      isConnectedToPage,
      title,
      description,
    } = this.props;
    // eslint-disable-next-line no-undef
    if (__SERVER__) {
      return null;
    }

    const SUCCESS_FLAG_ID = 'success';
    const ERROR_FLAG_ID = 'error';

    const handleDismiss = (id: string | number) => {
      if (id === SUCCESS_FLAG_ID) {
        onSuccessDismiss();
      }
      if (id === ERROR_FLAG_ID) {
        onErrorDismiss();
      }
    };

    const flags: any[] = [];
    if (hasErrors) {
      const primaryColor = colors.Y300;
      const actions = [
        {
          content: intl.formatMessage(messages['generic-error-reload-button']),
          onClick: () => onReload && onReload(),
        },
      ];

      flags.push(
        <Flag
          icon={
            <Fragment>
              <WarningIcon label="Warning" primaryColor={primaryColor} />
              <ErrorFlagViewTracker />
            </Fragment>
          }
          id="error"
          key="error"
          actions={actions}
          title={intl.formatMessage(messages['generic-error-heading'])}
          description={intl.formatMessage(
            messages['generic-error-description'],
          )}
        />,
      );
    }

    if (showSuccessFlag) {
      const primaryColor = colors.G300;

      flags.push(
        <AutoDismissFlag
          icon={
            <Fragment>
              <SuccessIcon label="Success" primaryColor={primaryColor} />
              <SuccessFlagViewTracker />
            </Fragment>
          }
          id="success"
          key="success"
          title={
            title ||
            intl.formatMessage(
              isConnectedToPage
                ? messages['generic-success-flag-heading-page']
                : messages['generic-success-flag-heading-space'],
              { connectedSpaceOrPageName },
            )
          }
          description={
            description ||
            intl.formatMessage(
              isConnectedToPage
                ? messages['generic-success-flag-description-page']
                : messages['generic-success-flag-description-space'],
              { connectedSpaceOrPageName },
            )
          }
        />,
      );
    }

    return <FlagGroup onDismissed={handleDismiss}>{flags}</FlagGroup>;
  }
}

export default injectIntl(Flags);
