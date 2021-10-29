import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';

import { ItemCardContent } from '../../../ui/checklist-section/tab-container/item-card';

import { AutomationRulesItemCardContent } from '../../../ui/checklist-section/tab-container/item-card/automation-rules';

describe('<AutomationRulesItemCardContent />', () => {
  const target = mount(
    <IntlProvider locale="en">
      <AutomationRulesItemCardContent />
    </IntlProvider>,
  ).find(AutomationRulesItemCardContent);

  it('should render an ItemCardContent', () => {
    expect(target.find(ItemCardContent)).toHaveLength(1);
  });
});
