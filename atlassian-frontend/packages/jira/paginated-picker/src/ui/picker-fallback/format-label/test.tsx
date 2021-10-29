import React from 'react';

import { shallow } from 'enzyme';
import { IntlProvider } from 'react-intl';

import Badge from '@atlaskit/badge';

import { SingleOption } from '../../../common/types';

import { formatLabel } from './main';
import { Container, LabelValueWrapper } from './styled';

describe('formatLabel', () => {
  it('should return label when no value', () => {
    expect(formatLabel('some label')).toBe('some label');
  });

  it('should return label when value array is empty', () => {
    expect(formatLabel('some label', [])).toBe('some label');
  });

  it('should format label when value length is 1', () => {
    const options: SingleOption[] = [
      {
        label: 'option 1',
        value: '1',
        optionType: 'option',
      },
    ];

    const label = shallow(<div>{formatLabel('some label', options)}</div>);
    expect(label.find(Container).find('strong').text()).toBe('some label:');
    expect(label.find(LabelValueWrapper).dive().text()).toBe('option 1');
  });

  it('should format label when value length is more than 1', () => {
    const options: SingleOption[] = [
      {
        label: 'option 1',
        value: '1',
        optionType: 'option',
      },
      {
        label: 'option 2',
        value: '2',
        optionType: 'option',
      },
      {
        label: 'option 3',
        value: '3',
        optionType: 'option',
      },
    ];

    const label = shallow(
      <IntlProvider locale="en">
        {formatLabel('some label', options)}
      </IntlProvider>,
    );

    expect(label.find(Container).find('strong').text()).toBe('some label:');
    expect(
      label.find(LabelValueWrapper).dive().text().startsWith('option 1'),
    ).toBeTruthy();
    expect(label.find(Badge).children().text()).toBe('+2');
  });
});
