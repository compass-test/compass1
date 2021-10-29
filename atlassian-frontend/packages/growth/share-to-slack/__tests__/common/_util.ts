import { act, findByTestId, findByText } from '@testing-library/react';
import { Simulate } from 'react-dom/test-utils';

export function resolveLater<V>(value: V | (() => V)): Promise<V> {
  return new Promise<V>((resolve) => {
    setTimeout(() => {
      resolve(typeof value === 'function' ? (value as () => V)() : value);
    });
  });
}

export function rejectLater<V>(error: string): Promise<V> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(error);
    });
  });
}

export async function ticks(count: number) {
  for (let i = 0; i < count; ++i) {
    await new Promise((resolve) => setTimeout(resolve));
  }
}

export async function findBySelector(
  element: Element,
  selector: string,
  timeout = 2000,
): Promise<Element> {
  for (let i = 0; i < timeout; ++i) {
    const result = element.querySelector(selector);

    if (result) {
      return result;
    }

    await ticks(1);
  }

  throw new Error(
    `Timed out while searching for element with selector ${selector}`,
  );
}

export function openSelectMenu(selectElement: Element, name: string) {
  act(() => {
    const input = selectElement.querySelector('input');
    Simulate.mouseDown(input!);
  });

  return selectElement.querySelector(`[name="${name}"]`)!
    .previousElementSibling as HTMLElement;
}

export async function openTeamSelectMenu(container: HTMLElement) {
  return openSelectMenu((await findTeamsSelect(container))!, 'team');
}

export async function openConversationSelectMenu(container: HTMLElement) {
  return openSelectMenu(
    (await findConversationsSelect(container))!,
    'conversation',
  );
}

// Wouldn’t be needed if tsconfig used dom.iterable
export function nodeListToArray<N extends Node>(nodeList: NodeListOf<N>): N[] {
  const result: N[] = [];

  nodeList.forEach((node) => void result.push(node));

  return result;
}

export async function findTeamsSelect(container: HTMLElement) {
  return (await findByTestId(container, 'share-to-slack-teams'))
    .firstElementChild;
}

export async function findConversationsSelect(container: HTMLElement) {
  return (await findByTestId(container, 'share-to-slack-conversations'))
    .firstElementChild;
}

export async function getChannels(conversationsMenu: HTMLElement) {
  return nodeListToArray(
    (await findByText(conversationsMenu, 'Channels'))!.nextElementSibling!
      .childNodes,
  ).map(({ textContent }) => textContent!.substr(1));
}

export async function getDirectMessages(conversationsMenu: HTMLElement) {
  return nodeListToArray(
    (await findByText(conversationsMenu, 'Direct messages'))!
      .nextElementSibling!.childNodes,
  ).map(({ textContent }) => textContent!);
}
