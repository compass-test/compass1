import React from 'react';

import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';

import { formattedSteps, steps } from './mocks';
import * as S from './styled';

import HowItWorks from './index';

describe('HowItWorks', () => {
  describe('Given there are steps on the HowItWorks page', () => {
    test('Should show a list of steps with Strings', () => {
      const wrapper = mount(
        <IntlProvider locale="en">
          <HowItWorks steps={steps} />
        </IntlProvider>,
      );

      expect(wrapper.find(S.StepList)).toHaveLength(1);
      expect(wrapper.find(S.Step)).toHaveLength(5);
    });

    test('Should show a list of steps with i18n messages', () => {
      const wrapper = mount(
        <IntlProvider locale="en">
          <HowItWorks steps={formattedSteps} />
        </IntlProvider>,
      );

      expect(wrapper.find(S.StepList)).toHaveLength(1);
      expect(wrapper.find(S.Step)).toHaveLength(4);
    });
  });

  describe('Given there are NO steps were provided', () => {
    it('should not render any list of steps', () => {
      const wrapper = mount(
        <IntlProvider locale="en">
          <HowItWorks steps={[]} />
        </IntlProvider>,
      );

      expect(wrapper.find(S.StepList)).toHaveLength(1);
      expect(wrapper.find(S.Step)).toHaveLength(0);
    });
  });
});
