import React, {
  ComponentType,
  ReactNode,
  useContext,
  createContext,
} from 'react';

import noop from 'lodash/noop';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import Button from '@atlaskit/button';
import { FadeIn, StaggeredEntrance, useResizingHeight } from '@atlaskit/motion';
import { fireUIAnalytics } from '@atlassian/analytics-bridge';

import { getComponentTestId } from '../../util';
import { messages } from './messages';

const actionSubjectIds = {
  showMore: 'jsmGettingStartedPanelChecklistShowMoreButton',
  showLess: 'jsmGettingStartedPanelChecklistShowLessButton',
};

export const ExpansionContext = createContext({
  isExpanded: true,
  toggleExpanded: noop,
});
export const Expander: ComponentType<{
  children: ReactNode[];
}> = ({ children }) => {
  const { isExpanded } = useContext(ExpansionContext);
  const resizingHeight = useResizingHeight();
  return (
    <div {...resizingHeight}>
      {isExpanded && (
        <StaggeredEntrance>
          {children.map((item, index) => (
            // Use key={index} to avoid repeating the fade animation on each tab selection.
            <FadeIn key={index}>
              {(props) => <div {...props}>{item}</div>}
            </FadeIn>
          ))}
        </StaggeredEntrance>
      )}
    </div>
  );
};

export const ExpansionButton = injectIntl(({ intl }: InjectedIntlProps) => {
  const { isExpanded, toggleExpanded } = useContext(ExpansionContext);

  const message = isExpanded ? messages.showLess : messages.showMore;
  const analyticsId = isExpanded
    ? actionSubjectIds.showLess
    : actionSubjectIds.showMore;

  return (
    <Button
      appearance="subtle-link"
      onClick={(_, analyticsEvent) => {
        fireUIAnalytics(analyticsEvent, analyticsId);
        toggleExpanded();
      }}
      testId={getComponentTestId('headerExpansionButton')}
    >
      {intl.formatMessage(message)}
    </Button>
  );
});
