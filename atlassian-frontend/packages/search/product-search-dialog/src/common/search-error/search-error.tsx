import React from 'react';
import { asyncComponent } from 'react-async-component';
import { EmptyState, LinkComponentProps } from '@atlassian/search-dialog';
import { I18nTemplatedLink } from '../../common/i18n-templated-link';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { messages } from '../../messages';
import { Button } from './search-error.styled';

const Image = asyncComponent({
  resolve: () =>
    import(
      /* webpackChunkName: "@atlaskit-internal_product-search-dialog/async-chunk/search-error-image" */ './image'
    ),
});

interface Props {
  onRetry: () => void;
}

export class SearchError extends React.Component<Props & InjectedIntlProps> {
  getContent = () => {
    const { onRetry, intl } = this.props;

    const linkComponent = (props: LinkComponentProps) => (
      <Button
        {...props}
        role="button"
        tabIndex={0}
        onClick={() => onRetry()}
        onKeyDown={(event: React.KeyboardEvent) =>
          event.key === 'Enter' ? onRetry() : undefined
        }
      />
    );

    return (
      <I18nTemplatedLink
        href={''}
        linkComponent={linkComponent}
        i18nTemplateString={intl.formatMessage(
          messages.common_error_state_failed_search_body,
        )}
      />
    );
  };

  render() {
    const { intl } = this.props;
    return (
      <EmptyState
        title={intl.formatMessage(
          messages.common_error_state_failed_search_heading,
        )}
        Image={Image}
        content={this.getContent()}
      />
    );
  }
}

export default injectIntl(SearchError);
