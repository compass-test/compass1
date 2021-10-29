import React, { Component } from 'react';
import Button from '@atlaskit/button/custom-theme-button';
import {
  fireOperationalAnalytics,
  fireUIAnalytics,
} from '@atlassian/analytics-bridge';
import {
  withAnalyticsEvents,
  CreateUIAnalyticsEvent,
  UIAnalyticsEvent,
} from '@atlaskit/analytics-next';
import {
  ErrorStateContainer,
  DescriptionContainer,
  ErrorStateTitleContainer,
} from '../styled';
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';
import { Errors } from '../types';
import messages from '../messages';

// This is not recommended. Avoid doing this
import emptyImg from '../assets/empty.png';
import errorImg from '../assets/error.png';

type ErrorStateProps = {
  type: Errors;
  spaceKey?: string;
  readOnly?: boolean;
  createAnalyticsEvent?: CreateUIAnalyticsEvent;
};

const errorTypeToMessages = (type: Errors) => {
  if (type === 'error') {
    return {
      title: messages.errorTitle,
      description: messages.errorDescription,
    };
  }

  return {
    title: messages.emptyTitle,
    description: messages.emptyDescription,
  };
};

export class ErrorStateBase extends Component<
  ErrorStateProps & InjectedIntlProps
> {
  static defaultProps = {
    readOnly: false,
  };

  componentDidMount() {
    const { createAnalyticsEvent, type, readOnly } = this.props;

    if (createAnalyticsEvent) {
      if (type === Errors.Error) {
        fireOperationalAnalytics(
          createAnalyticsEvent({}),
          'confluencePageTree errorStateShown',
        );
      } else if (type === Errors.Empty) {
        fireOperationalAnalytics(
          createAnalyticsEvent({}),
          'confluencePageTree emptyStateShown',
          {
            readOnly,
          },
        );
      }
    }
  }

  render() {
    const { type, readOnly, spaceKey } = this.props;
    const { title, description } = errorTypeToMessages(type);
    const imgMap = {
      error: errorImg,
      empty: emptyImg,
    };
    let createPageHref = '';
    if (spaceKey) {
      createPageHref = `/wiki/spaces/${spaceKey}/overview?createDialog=true&createDialogSpaceKey=${spaceKey}`;
    }

    return (
      <ErrorStateContainer>
        <img src={imgMap[type]} alt="" />
        <ErrorStateTitleContainer>
          <FormattedMessage {...title} />
        </ErrorStateTitleContainer>
        <DescriptionContainer>
          <FormattedMessage {...description} />
        </DescriptionContainer>
        {type === Errors.Empty ? (
          <Button
            appearance="primary"
            isDisabled={readOnly}
            href={createPageHref}
            target="_blank"
            onClick={(_: any, analyticsEvent: UIAnalyticsEvent) => {
              fireUIAnalytics(
                analyticsEvent,
                'confluencePageTreeEmptyStateCreateButton',
              );
            }}
          >
            <FormattedMessage {...messages.create} />
          </Button>
        ) : null}
      </ErrorStateContainer>
    );
  }
}

export const ErrorState = withAnalyticsEvents()(injectIntl(ErrorStateBase));
