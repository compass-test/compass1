import React from 'react';

import { screen, waitFor } from '@testing-library/dom';
import { fireEvent, render } from '@testing-library/react';

import { mockDataManager } from '@atlassian/dragonfruit-external-component-management';
import {
  CompassLinkType,
  MAX_COMPASS_LINKS_PER_SECTION,
} from '@atlassian/dragonfruit-graphql';
import { getFakeLinks } from '@atlassian/dragonfruit-graphql/mocks';

import { LinkListTemplate } from './examples';

const MOCK_LINKS = getFakeLinks(CompassLinkType.DOCUMENT, 2);

describe('LinkList', () => {
  it('shows empty state when there are no links', async () => {
    render(<LinkListTemplate links={[]} />);

    // Find the empty state button
    const emptyStateButton = await screen.findByText(
      'Add documentation like runbooks, internal process docs, or specifications',
    );
    expect(emptyStateButton as HTMLButtonElement).toBeInTheDocument();
  });

  it('shows links when they are provided', async () => {
    render(<LinkListTemplate links={MOCK_LINKS} />);

    await waitFor(() => {
      expect(screen.getByText(MOCK_LINKS[0].url)).toBeInTheDocument();
      expect(screen.getByText(MOCK_LINKS[1].url)).toBeInTheDocument();
    });
  });

  it('opens the AddLinkForm when the add link button is pressed', async () => {
    render(<LinkListTemplate links={MOCK_LINKS} />);

    // Click the add link button
    const addLinkButton = await screen.findByText('Add document');
    fireEvent.click(addLinkButton);

    // Check the form has been opened
    const form = screen.getByRole('form');
    expect(form as HTMLElement).toBeInTheDocument();
  });

  it('closes the AddLinkForm when the cancel button is pressed', async () => {
    render(<LinkListTemplate links={MOCK_LINKS} />);

    // Click the add link button
    const addLinkButton = await screen.findByText('Add document');
    fireEvent.click(addLinkButton);
    const form = screen.getByRole('form');
    expect(form as HTMLElement).toBeInTheDocument();

    // Click the cancel button
    const cancelButton = await screen.findByText('Cancel');
    fireEvent.click(cancelButton);

    // Check the form not open anymore
    expect(form as HTMLElement).not.toBeInTheDocument();
  });

  it('shows a flag when the limit of links is reached', async () => {
    const links = getFakeLinks(
      CompassLinkType.DOCUMENT,
      MAX_COMPASS_LINKS_PER_SECTION,
    );
    render(<LinkListTemplate links={links} />);

    // Click the add link button
    const addLinkButton = screen.getByText('Add document');
    fireEvent.click(addLinkButton);

    // Check the flag triggers
    await waitFor(() => {
      const title = screen.getByText('Documentation link limit reached');
      expect(title).toBeInTheDocument();
    });
  });

  it('does not display add link button when limit of links is reached in sidebar view', () => {
    const links = getFakeLinks(
      CompassLinkType.ON_CALL,
      MAX_COMPASS_LINKS_PER_SECTION,
    );
    render(<LinkListTemplate links={links} position="sidebar" />);

    // There should be no add link while in card view.
    expect(screen.queryByText('Add document')).not.toBeInTheDocument();
  });

  it('shows disabled state for add document link when component is externally managed', async () => {
    render(
      <LinkListTemplate links={MOCK_LINKS} dataManager={mockDataManager} />,
    );

    // add link should be replaced by the disabled message
    const addLink = screen.queryByText('Add document');
    expect(addLink).toBeNull();

    const disabledMessage = screen.getByText('Edit in compass.yml');
    expect(disabledMessage).toBeInTheDocument();
  });
});
