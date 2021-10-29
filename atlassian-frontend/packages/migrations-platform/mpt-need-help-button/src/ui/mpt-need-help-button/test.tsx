import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import WithCommunityLink from '../../../examples/00-with-community-link';
import WithDocumentationLink from '../../../examples/02-with-documentation-link';

import { messages } from './messages';

describe('<NeedHelpButton />', () => {
  it('should render a dropdown', () => {
    const { getByText } = render(<WithCommunityLink />);
    expect(() => getByText(`messages.community.defaultMessage`)).toThrow();
    fireEvent.click(getByText(messages.dropdownName.defaultMessage as string));
    expect(getByText(messages.community.defaultMessage as string)).toBeTruthy();
  });
  it('should render a dropdown with documentation link', () => {
    const { getByText } = render(<WithDocumentationLink />);
    fireEvent.click(getByText(messages.dropdownName.defaultMessage as string));
    expect(
      getByText(messages.documentation.defaultMessage as string),
    ).toBeTruthy();
  });
});
