import React from 'react';

import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';

import Button from '@atlaskit/button';
import Lozenge from '@atlaskit/lozenge';

import confluenceFree from '../../../common/assets/confluence/confluence_free.svg';
import confluencePremium from '../../../common/assets/confluence/confluence_premium.svg';
import confluenceStandard from '../../../common/assets/confluence/confluence_standard.svg';
import jsmFree from '../../../common/assets/jira-service-management/jsm_free.svg';
import jsmPremium from '../../../common/assets/jira-service-management/jsm_premium.svg';
import jsmStandard from '../../../common/assets/jira-service-management/jsm_standard.svg';
import jswFree from '../../../common/assets/jira-software/jsw_free.svg';
import jswPremium from '../../../common/assets/jira-software/jsw_premium.svg';
import jswStandard from '../../../common/assets/jira-software/jsw_standard.svg';
import { Plan, SupportedProduct } from '../../../common/types';
import {
  StyledFeatureRow,
  StyledHeaderRowCell,
  StyledPlanImageContainer,
  StyledTextHeader,
} from '../../../common/ui/styled';

import messages, { planMessages } from './messages';

interface PlansHeaderProps {
  plan?: Plan;
  product: SupportedProduct;
  currentPlan: Plan;
  highlightedPlan: Plan;
  onPlanChangeButtonClick: (edition: Plan, product: SupportedProduct) => void;
}

interface PlanCellProps extends PlansHeaderProps {
  plan: Plan;
  onPlanChangeButtonClick: (edition: Plan) => void;
}

const productPlanToImage = (product?: SupportedProduct, plan?: Plan) => {
  if (!plan || !product) {
    return <span />;
  }

  const productPlan = `${product}-${plan}`;
  const productPlanMap: { [index: string]: string } = {
    'confluence-free': confluenceFree,
    'confluence-premium': confluencePremium,
    'confluence-standard': confluenceStandard,
    'jira-servicedesk-free': jsmFree,
    'jira-servicedesk-premium': jsmPremium,
    'jira-servicedesk-standard': jsmStandard,
    'jira-software-free': jswFree,
    'jira-software-premium': jswPremium,
    'jira-software-standard': jswStandard,
  };

  if (productPlanMap[productPlan]) {
    return <img src={productPlanMap[productPlan]} height={125} />;
  } else {
    return <span />;
  }
};

const PlanCell: React.FC<PlanCellProps & InjectedIntlProps> = ({
  intl,
  plan,
  product,
  currentPlan,
  highlightedPlan,
  onPlanChangeButtonClick,
}) => {
  const isHighlighted = plan === highlightedPlan;
  const isCurrent = plan === currentPlan;

  const planValues = Object.values(Plan);
  const planIndex = planValues.indexOf(plan);
  const currentPlanIndex = planValues.indexOf(currentPlan);
  const isLowerThanCurrent = planIndex < currentPlanIndex;

  let mostPopularLabel = intl.formatMessage(
    isHighlighted && isCurrent ? messages.selected : messages.recommended,
  );

  return (
    <StyledHeaderRowCell
      isHighlighted={isHighlighted}
      mostPopularLabel={mostPopularLabel}
    >
      <StyledTextHeader>
        <FormattedMessage {...planMessages[plan]} />
      </StyledTextHeader>
      <StyledPlanImageContainer>
        {productPlanToImage(product, plan)}
      </StyledPlanImageContainer>
      {isCurrent ? (
        <Lozenge appearance="moved">
          <FormattedMessage {...messages.currentPlan} />
        </Lozenge>
      ) : isLowerThanCurrent ? (
        <Button onClick={() => onPlanChangeButtonClick(plan)}>
          <FormattedMessage
            {...messages.downgradeButton}
            values={{ plan: intl.formatMessage(planMessages[plan]) }}
          />
        </Button>
      ) : (
        <Button
          appearance={isHighlighted ? 'primary' : undefined}
          onClick={() => onPlanChangeButtonClick(plan)}
        >
          {plan === 'premium' ? (
            <FormattedMessage {...messages.tryFreeButton30} />
          ) : plan === 'standard' ? (
            <FormattedMessage {...messages.tryFreeButton14} />
          ) : (
            <FormattedMessage {...messages.tryFreeButton} />
          )}
        </Button>
      )}
    </StyledHeaderRowCell>
  );
};

const IntlPlanCell = injectIntl(PlanCell);

export const PlansHeaderRow: React.FC<PlansHeaderProps> = ({
  currentPlan,
  highlightedPlan,
  product,
  onPlanChangeButtonClick,
}) => {
  return (
    <StyledFeatureRow isHeader>
      <div />
      {Object.values(Plan).map(plan => (
        <IntlPlanCell
          plan={plan}
          product={product}
          highlightedPlan={highlightedPlan}
          currentPlan={currentPlan}
          onPlanChangeButtonClick={edition =>
            onPlanChangeButtonClick(edition, product)
          }
        />
      ))}
    </StyledFeatureRow>
  );
};

export default PlansHeaderRow;
