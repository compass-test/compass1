import React, { useCallback } from 'react';
import Button from '@atlaskit/button';
import EmptyState from '@atlaskit/empty-state';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import styled from 'styled-components';
import { useEmbeddedPage } from '../../../controllers/embedded-page';
import errorImage from '../../../view/empty-state/icons/error.svg';
import { useCreateEmbeddedPage } from '../../../controllers/embedded-page/utils';
import messages from './messages';
import { connectUIAnalytics } from '../../../common/analytics/util';
import { UIAnalyticsEvent } from '@atlaskit/analytics-next';

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
`;

interface Props {
  spaceKey: string | null;
  onCloseModal: () => void;
}

interface AnalyticsProps {
  onCloseClick: (analyticsEvent: UIAnalyticsEvent) => void;
  onTryAgainClick: (analyticsEvent: UIAnalyticsEvent) => void;
}

const CreatePageError = ({
  spaceKey,
  onCloseModal,
  onCloseClick,
  onTryAgainClick,
  intl: { formatMessage },
}: Props & InjectedIntlProps & AnalyticsProps) => {
  const { pageCreate } = useEmbeddedPage();
  const handleClose = useCallback(
    (_: React.MouseEvent, analyticsEvent: UIAnalyticsEvent) => {
      onCloseModal();
      onCloseClick(
        analyticsEvent.update({
          embeddedPageAction: true,
        }),
      );
    },
    [onCloseClick, onCloseModal],
  );
  const createEmbeddedPage = useCreateEmbeddedPage(spaceKey);
  const handleTryAgain = useCallback(
    async (_: React.MouseEvent, analyticsEvent: UIAnalyticsEvent) => {
      if (pageCreate) {
        onTryAgainClick(
          analyticsEvent.update({
            embeddedPageAction: true,
          }),
        );
        await createEmbeddedPage(
          pageCreate.parentContentId,
          pageCreate.isRoot,
          pageCreate.blueprint,
        );
      }
    },
    [createEmbeddedPage, onTryAgainClick, pageCreate],
  );
  return (
    <Wrapper>
      <EmptyState
        imageUrl={errorImage}
        imageWidth={71}
        header={formatMessage(messages.title)}
        description={<FormattedMessage {...messages.description} />}
        primaryAction={
          <Button appearance="primary" onClick={handleTryAgain}>
            {formatMessage(messages.tryAgain)}
          </Button>
        }
        secondaryAction={
          <Button onClick={handleClose}>{formatMessage(messages.close)}</Button>
        }
      />
    </Wrapper>
  );
};

export default connectUIAnalytics<Props>({
  onCloseClick: 'createEmbeddedPageErrorClose',
  onTryAgainClick: 'createEmbeddedPageErrorTryAgain',
})(injectIntl<Props & AnalyticsProps>(CreatePageError));
