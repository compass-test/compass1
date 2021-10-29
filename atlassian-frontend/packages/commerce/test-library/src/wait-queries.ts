/* eslint-disable import/no-extraneous-dependencies */
import { screen, waitFor } from '@testing-library/dom';

import { byText, FindBy, Scope } from './locators';
import { getElement, queryElement } from './queries';

export const waitUntil = (callback: () => any, timeout?: number) =>
  waitFor(callback, { timeout: timeout });

export const waitTillPresent = (target: FindBy, scope: Scope = screen) =>
  waitFor(() => {
    expect(getElement(target, scope)).toBeInTheDocument();
  });

export const waitForLoadingToDisappear = async () =>
  await waitTillRemoved(byText('loading...'));

export const waitTillRemoved = (target: FindBy, scope: Scope = screen) =>
  waitFor(() => expect(queryElement(target, scope)).not.toBeInTheDocument());
