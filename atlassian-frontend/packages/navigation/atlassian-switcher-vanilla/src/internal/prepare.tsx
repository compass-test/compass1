import { UIAnalyticsEvent } from '@atlaskit/analytics-next';
import { AtlassianSwitcherProps } from '@atlassian/switcher/types';
import { prefetch } from '@atlassian/switcher/prefetch';
import { render, InstanceHandlers } from './render';

type SwitcherWrapperMethods = {
  prefetch: () => void;
  renderAt: (container: HTMLElement) => InstanceHandlers;
};

export const prepareAtlassianSwitcher = (
  switcherProps: AtlassianSwitcherProps,
  analyticsListener: (event: UIAnalyticsEvent, channel?: string) => void,
): SwitcherWrapperMethods => {
  if (!analyticsListener) {
    throw new Error('Atlassian switcher: Missing analytics listener');
  }

  let hasPrefetched = false;

  return {
    prefetch: (): void => {
      if (hasPrefetched) {
        return;
      }
      prefetch(switcherProps);
      hasPrefetched = true;
    },
    renderAt: (container) => {
      return render(switcherProps, analyticsListener, container);
    },
  };
};
