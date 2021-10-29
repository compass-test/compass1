import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';

import { ItemCardContent } from '../../../ui/checklist-section/tab-container/item-card';

import { CreateProjectItemCardContent } from '../../../ui/checklist-section/tab-container/item-card/create-project';

describe('<CreateProjectItemCardContent />', () => {
  const target = mount(
    <IntlProvider locale="en">
      <CreateProjectItemCardContent />
    </IntlProvider>,
  ).find(CreateProjectItemCardContent);

  it('should render an ItemCardContent', () => {
    expect(target.find(ItemCardContent)).toHaveLength(1);
  });
});
