import React from 'react';

import { screen, waitFor } from '@testing-library/dom';
import { fireEvent, render, wait } from '@testing-library/react';

import { CompassLink, CompassLinkType } from '@atlassian/dragonfruit-graphql';

import {
  SmartLinkWithDeleteTemplate,
  SmartLinkWithNetworkErrorTemplate,
} from './examples';

const mockLink: CompassLink = {
  id: 'link-id',
  type: CompassLinkType.DOCUMENT,
  url: 'https://g.com',
  name: 'Fake Link',
};

describe('SmartLinkWithDelete', () => {
  describe('when smart link is not disabled', () => {
    it('renders a delete button on hover and can be deleted', async () => {
      const mockDeleteMutationFn = jest.fn();
      const resolvers = () => ({
        Mutation: {
          compass: () => ({
            deleteComponentLink: mockDeleteMutationFn,
          }),
        },
      });
      const { baseElement } = render(
        <SmartLinkWithDeleteTemplate
          link={mockLink}
          isDisabled={false}
          resolvers={resolvers}
        />,
      );

      // Hover over the link to reveal the delete button
      fireEvent.mouseOver(baseElement);

      // Find and click the delete button
      const deleteButton = baseElement.querySelector('button');
      if (!deleteButton) {
        throw Error();
      }
      fireEvent.click(deleteButton);
      screen.debug(deleteButton);

      // Click the button on the modal to delete
      const confirmDeleteButton = await screen.findByRole('button', {
        name: 'Remove',
      });
      fireEvent.click(confirmDeleteButton);

      // Assert that the delete mutation was fired
      await wait(() => expect(mockDeleteMutationFn).toBeCalledTimes(1));
    });
  });

  describe('when smart link is disabled', () => {
    it('does not render a delete button on hover', async () => {
      const { baseElement } = render(
        <SmartLinkWithDeleteTemplate link={mockLink} isDisabled={true} />,
      );

      // Hover over the link
      fireEvent.mouseOver(baseElement);

      // Check that there is no delete button
      const deleteButton = baseElement.querySelector('button');
      expect(deleteButton).toBeNull();
    });
  });

  describe('when there is a network error', () => {
    it('shows an error flag upon deletion', async () => {
      const { baseElement } = render(
        <SmartLinkWithNetworkErrorTemplate
          link={mockLink}
          isDisabled={false}
        />,
      );

      // Hover over the link to reveal the delete button
      fireEvent.mouseOver(baseElement);

      // Find and click the delete button
      const deleteButton = baseElement.querySelector('button');
      if (!deleteButton) {
        throw Error();
      }
      fireEvent.click(deleteButton);

      // Click the button on the modal to delete
      const confirmDeleteButton = await screen.findByRole('button', {
        name: 'Remove',
      });
      fireEvent.click(confirmDeleteButton);

      // Assert that the error flag was shown
      await waitFor(() => {
        const title = screen.getByText('Error removing document link');
        expect(title).toBeInTheDocument();
      });
    });
  });
});
