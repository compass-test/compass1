import React, { useEffect, useMemo } from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';

import AnalyticsChannelContext from '../../common/AnalyticsChannelContext';
import IntlContext from '../../common/IntlContext';
import type ShareToSlackConfig from '../../common/ShareToSlackConfig';
import type {
  AtlassianProduct,
  ShareToSlackActions,
  ShareToSlackState,
} from '../../common/types';

import ShareToSlackFlagsProvider from './flags/ShareToSlackFlagsProvider';
import ShareToSlackForm from './forms/ShareToSlackForm';
import SlackConsentPrimer from './forms/SlackConsentPrimer';
import SlackDisabledForm from './forms/SlackDisabledForm';
import Loading from './Loading';
import useShareToSlackModel from './useShareToSlackModel';

export type ShareToSlackProps = ShareToSlackConfig & {
  className?: string;
  channel?: string; // analytics channel
  onClose: () => void; // provided by extensible share button
};

// Component provided to the extensible Share button
function ShareToSlack({
  intl,
  showFlag,
  className,
  channel,
  onClose,
  ...config
}: ShareToSlackProps & InjectedIntlProps) {
  const analyticsChannel = useMemo(() => ({ channel }), [channel]);

  return (
    <IntlContext.Provider value={{ intl }}>
      <ShareToSlackFlagsProvider showFlag={showFlag}>
        <AnalyticsChannelContext.Provider value={analyticsChannel}>
          <ShareToSlackInner
            {...config}
            className={className}
            onClose={onClose}
          />
        </AnalyticsChannelContext.Provider>
      </ShareToSlackFlagsProvider>
    </IntlContext.Provider>
  );
}

type InnerProps = Omit<ShareToSlackConfig, 'showFlag'> &
  Pick<ShareToSlackProps, 'className' | 'onClose'>;

function ShareToSlackInner({ className, onClose, ...config }: InnerProps) {
  const model = useShareToSlackModel(config);

  // Abort any pending requests on close
  useEffect(() => () => model.abort(), []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (model.page === 'none') {
      onClose();
    }
  }, [model.page]); // eslint-disable-line react-hooks/exhaustive-deps

  // Show the loading screen when teams are loading.
  const page =
    model.page === 'share' && model.isLoadingTeams ? 'loading' : model.page;

  return selectContent({
    ...model,
    page,
    product: config.product,
    className,
    onClose,
  });
}

type Args = ShareToSlackState &
  ShareToSlackActions &
  Pick<ShareToSlackProps, 'onClose'> & {
    className?: string;
    product: AtlassianProduct;
  };

function selectContent({
  className,
  product,
  page,
  onClose,
  onAddTeam,
  ...restArgs
}: Args) {
  switch (page) {
    case 'loading':
      return <Loading className={className} />;

    case 'consentPrimer':
      return (
        <SlackConsentPrimer
          className={className}
          product={product}
          onConfirm={onAddTeam}
          onCancel={onClose}
        />
      );

    case 'slackDisabled':
      return (
        <SlackDisabledForm
          className={className}
          product={product}
          onClose={onClose}
        />
      );

    case 'share':
      return (
        <ShareToSlackForm
          className={className}
          product={product}
          onAddTeam={onAddTeam}
          {...restArgs}
        />
      );
  }

  return null;
}

export default injectIntl(ShareToSlack);
