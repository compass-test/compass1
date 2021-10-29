import React from 'react';

import { shallow } from 'enzyme';

import InlineMoreInfoTooltip from '../../InlineMoreInfoTooltip';

describe('InlineMoreInfoTooltip', () => {
  test('renders correctly', () => {
    const component = shallow(
      <InlineMoreInfoTooltip>some text</InlineMoreInfoTooltip>,
    );
    expect(component).toMatchInlineSnapshot(`
      <styled.span>
        <InlineMessage
          title={
            <styled.span>
              More info
            </styled.span>
          }
          type="info"
        >
          some text
        </InlineMessage>
      </styled.span>
    `);
  });
});
