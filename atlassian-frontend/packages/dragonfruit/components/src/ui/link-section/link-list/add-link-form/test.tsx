import React from 'react';

import { screen } from '@testing-library/dom';
import { fireEvent, render } from '@testing-library/react';

import { UI_JIRA_PROJECTS_DROPDOWN } from '@atlassian/dragonfruit-feature-flags';
import { CompassLinkType } from '@atlassian/dragonfruit-graphql';

import { AddLinkFormTemplate } from './examples';

const findSubmitButton = (baseElement: HTMLElement) => {
  // In pollinator test we look for the button on the section
  return baseElement.querySelector('button[type=submit]');
};

const setUrl = (text: string) => {
  // In pollinator this is not needed, the form is focused on the input automatically
  fireEvent.change(screen.getByLabelText(/URL/i), {
    target: { value: text },
  });
};

const setLinkText = (text: string) => {
  // In pollinator we look for an input of with name "linkText" but wasn't possible here
  fireEvent.change(screen.getByLabelText(/Link text/i), {
    target: { value: text },
  });
};

describe('Add Link Form', () => {
  it('should disable submit button by default', async () => {
    const { baseElement } = render(<AddLinkFormTemplate />);

    const button = findSubmitButton(baseElement);
    expect(button).toBeDisabled();
  });

  describe.each`
    isValidUrl | canSubmit
    ${true}    | ${true}
    ${false}   | ${false}
  `('when URL is valid: $isValidUrl', ({ isValidUrl, canSubmit }) => {
    it('should enable the submit button: $canSubmit', () => {
      const { baseElement } = render(<AddLinkFormTemplate />);

      // Input form data
      const inputUrl = isValidUrl ? 'http://www.atlassian.com' : 'Invalid URL';
      setUrl(inputUrl);
      setLinkText('Atlassian');

      const submitButton = findSubmitButton(baseElement);

      if (canSubmit) {
        expect(submitButton).toBeEnabled();
      } else {
        expect(submitButton).toBeDisabled();
      }
    });
  });

  it('should call onCancel when the "Cancel" button is clicked', async () => {
    const onCancelFn = jest.fn();
    render(<AddLinkFormTemplate onCancel={onCancelFn} />);

    const button = await screen.findByRole('button', { name: 'Cancel' });
    fireEvent.click(button);

    expect(onCancelFn).toHaveBeenCalledTimes(1);
  });

  describe('project search field', () => {
    it('shows the old project field with feature flag disabled', async () => {
      const { findByText } = render(
        <AddLinkFormTemplate linkType={CompassLinkType.PROJECT} />,
      );

      const oldProjectField = await findByText(/URL/i);
      expect(oldProjectField).toBeInTheDocument();
    });

    it('shows the new project search field with feature flag enabled', async () => {
      const { findByText } = render(
        <AddLinkFormTemplate
          linkType={CompassLinkType.PROJECT}
          flags={{
            [UI_JIRA_PROJECTS_DROPDOWN]: true,
          }}
        />,
      );

      const newProjectField = await findByText(/URL or Jira project/i);
      expect(newProjectField).toBeInTheDocument();
    });
  });
});
