import React, { useState } from 'react';

import { FormattedMessage } from 'react-intl';

import { UIAnalyticsEvent } from '@atlaskit/analytics-next';
import { Checkbox } from '@atlaskit/checkbox';
import Lozenge from '@atlaskit/lozenge';
import { fireUIAnalytics } from '@atlassian/analytics-bridge';

import { messages } from '../../../messages';
import {
  EditionChangeLifecycleProps,
  ProductSubscriptionChangeInfo,
} from '../../../types';
import { GOOGLE_WORKSPACE_PROJECT, ScreenType } from '../../constants';
import { productDisplayName, siteUrlForProduct } from '../../utils/helpers';

import CheckCircle from './assets/check-circle-outline.svg';
import {
  ChecklistBox,
  ListItemComponentStyling,
  LozengeWrapper,
  ProductAndLozengeWrapper,
  ProductLabelWrapper,
  ProductLozengeAndSiteWrapper,
  SiteWrapper,
} from './styled';

type ListComponentProps = {
  style: ChecklistStyle;
  resolvedSiteUrl: string;
  isChecked: boolean;
  subscription: ProductSubscriptionChangeInfo;
  onChange: any;
  index: number;
  isLast: boolean;
};

const ListItemComponent = ({
  style,
  resolvedSiteUrl,
  isChecked,
  subscription,
  onChange,
  index,
  isLast,
}: ListComponentProps): React.ReactElement => {
  return (
    //@ts-ignore
    <ListItemComponentStyling isLast={isLast}>
      {style === ChecklistStyle.CHECKBOX ? (
        <Checkbox onChange={onChange} value={index} isChecked={isChecked} />
      ) : (
        <img src={CheckCircle} />
      )}
      <ProductLozengeAndSiteWrapper>
        <ProductAndLozengeWrapper>
          <ProductLabelWrapper
            //@ts-ignore
            isConfirmationScreen={style === ChecklistStyle.CONFIRMATION}
          >
            {productDisplayName(subscription.product)}
          </ProductLabelWrapper>
          &nbsp;
          {
            /* If subscription completed, show the Trial Started text */
            subscription.upgradeCompleted ? (
              <>
                <ProductLabelWrapper
                  //@ts-ignore
                  isConfirmationScreen={style === ChecklistStyle.CONFIRMATION}
                >
                  <FormattedMessage {...messages.googleWorkspaceStandardText} />
                </ProductLabelWrapper>
                <LozengeWrapper>
                  <Lozenge appearance={'inprogress'} isBold>
                    <FormattedMessage
                      {...messages.googleWorkspaceStandardTrialStartedText}
                    />
                  </Lozenge>
                </LozengeWrapper>
              </>
            ) : /* If subscription completed, show the Trial Started text */
            subscription.upgradeRequired ? (
              <>
                <ProductLabelWrapper
                  //@ts-ignore
                  isConfirmationScreen={style === ChecklistStyle.CONFIRMATION}
                >
                  <FormattedMessage {...messages.googleWorkspaceFreeText} />
                </ProductLabelWrapper>
                <LozengeWrapper>
                  <Lozenge appearance={'inprogress'}>
                    <FormattedMessage
                      {...messages.googleWorkspaceRequireStandardTrialText}
                    />
                  </Lozenge>
                </LozengeWrapper>
              </>
            ) : (
              <ProductLabelWrapper
                //@ts-ignore
                isConfirmationScreen={style === ChecklistStyle.CONFIRMATION}
              >
                <FormattedMessage {...messages.googleWorkspaceStandardText} />
              </ProductLabelWrapper>
            )
          }
        </ProductAndLozengeWrapper>
        <SiteWrapper>{resolvedSiteUrl}</SiteWrapper>
      </ProductLozengeAndSiteWrapper>
    </ListItemComponentStyling>
  );
};

export enum ChecklistStyle {
  CHECKBOX,
  CONFIRMATION,
}

export interface ChecklistProps {
  checklistStyle: ChecklistStyle;
  currentSelectedSubscriptions?: ProductSubscriptionChangeInfo[];
  onSelectionChange?: (
    newSelectedSubscriptions: ProductSubscriptionChangeInfo[],
  ) => void;
}

export const ConfirmableChecklist: React.FC<
  EditionChangeLifecycleProps & ChecklistProps
> = ({
  siteUrl,
  subscriptions,
  checklistStyle,
  currentSelectedSubscriptions = [],
  onSelectionChange = () => {},
}): React.ReactElement => {
  // TODO: Pass this state back to the component caller!
  let initialState: boolean[] = [];
  subscriptions.forEach(key => {
    initialState.push(
      currentSelectedSubscriptions.some(
        selectedSub => selectedSub.product === key.product,
      ),
    );
  });
  const [checkboxListState, setCheckboxListState] = useState(initialState);

  const onChange = (event: any, analyticsEvent: UIAnalyticsEvent): void => {
    const indexOfCheckboxClicked = event.currentTarget.value;
    let newCheckboxListState = checkboxListState;
    newCheckboxListState[indexOfCheckboxClicked] = !newCheckboxListState[
      indexOfCheckboxClicked
    ];

    const newSelectedSubscriptions: ProductSubscriptionChangeInfo[] = [];
    newCheckboxListState.forEach((checked, index) => {
      if (checked && subscriptions[index]) {
        newSelectedSubscriptions.push(subscriptions[index]);
      }
    });

    if (analyticsEvent) {
      fireUIAnalytics(analyticsEvent, 'accessProduct', {
        selectedProducts: newSelectedSubscriptions
          .map(sub => sub.product)
          .join(','),
        sourceScreen: ScreenType.GOOGLE_WORKSPACE_PRODUCT_ACCESS_SELECTION,
        chromaExperiment: GOOGLE_WORKSPACE_PROJECT,
      });
    }

    setCheckboxListState(newCheckboxListState);

    onSelectionChange(newSelectedSubscriptions);
  };

  return (
    <ChecklistBox>
      {subscriptions.map((sub, index) => {
        return (
          <ListItemComponent
            // Confluence site is 'https://blah.atlassian.net/wiki,
            // Jira sites are just the top level
            style={checklistStyle}
            resolvedSiteUrl={siteUrlForProduct(siteUrl, sub.product)}
            isChecked={checkboxListState[index]}
            subscription={sub}
            onChange={onChange}
            index={index}
            isLast={index === subscriptions.length - 1}
            key={index}
          />
        );
      })}
    </ChecklistBox>
  );
};
