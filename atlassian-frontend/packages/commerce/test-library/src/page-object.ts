/* eslint-disable import/no-extraneous-dependencies */

import { screen } from '@testing-library/dom';
import { fireEvent } from '@testing-library/react';

import { byText, FindBy } from './locators';
import { findElement, getElement, queryElement } from './queries';
import { waitTillPresent, waitTillRemoved, waitUntil } from './wait-queries';

class PageObject<T extends Record<string, FindBy>> {
  constructor(private selectors: T, private scope?: HTMLElement | keyof T) {}

  async type(target: keyof T, value: string) {
    const element = await this.findElement(target);
    await pageActions.type(element, value);
  }

  async click(target: keyof T) {
    await pageActions.click(await this.findElement(target));
  }

  async blur(target: keyof T) {
    await pageActions.blur(await this.findElement(target));
  }

  async keyDown(target: keyof T) {
    await pageActions.keyDown(await this.findElement(target));
  }

  async select(target: keyof T, value: string) {
    await pageActions.select(await this.findElement(target), value);
  }

  async fillSelectSearch(target: keyof T, value: string) {
    await pageActions.fillSelectSearch(await this.findElement(target), value);
  }

  async textContent(target: keyof T) {
    return (await this.findElement(target)).textContent;
  }

  async attributeValue(target: keyof T, attribute: string) {
    return (await this.findElement(target)).getAttribute(attribute);
  }

  async hasAttribute(target: keyof T, attribute: string) {
    const element = await this.findElement(target);
    return element.hasAttribute(attribute);
  }

  async fieldError(label: string) {
    const selector = byText(new RegExp(label, 'i'), { selector: 'label' });
    await waitTillPresent(selector);

    const errorSelector =
      //
      getElement(selector, await this.html())
        .getAttribute('id')
        ?.replace(`label`, 'error')
        .trim();

    const error = (
      await findElement(selector, await this.html())
    ).parentElement!.querySelector(`[id*='${errorSelector}']`);

    return error!.textContent;
  }

  async waitTillPresent(target: keyof T) {
    return waitTillPresent(this.selectors[target], await this.html());
  }

  async waitTillRemoved(target: keyof T) {
    await waitTillRemoved(this.selectors[target], await this.html());
  }

  async waitForElementToBeSettled(target: keyof T) {
    await waitUntil(() => {
      expect(this.getElement(target)).not.toHaveAttribute('data-has-overlay');
    });
  }

  async findElement(target: keyof T) {
    return findElement(this.selectors[target], await this.html());
  }

  getElement(target: keyof T) {
    const selector = this.selectors[target];
    const root = this.scope
      ? this.scope instanceof HTMLElement
        ? this.scope
        : getElement(this.selectors[this.scope])!
      : screen;

    return getElement(selector, root);
  }

  queryElement(target: keyof T) {
    const selector = this.selectors[target];
    const root = this.scope
      ? this.scope instanceof HTMLElement
        ? this.scope
        : queryElement(this.selectors[this.scope])!
      : screen;

    return queryElement(selector, root);
  }

  async html() {
    if (this.scope) {
      if (this.scope instanceof HTMLElement) {
        return this.scope;
      }
      await waitTillPresent(this.selectors[this.scope]);
      return getElement(this.selectors[this.scope]);
    }

    return screen;
  }
}

export const createPageObject = <T extends Record<string, FindBy>, K>(
  page: Page<T, K>,
): K => {
  if ('scope' in page && !page.scope) {
    throw new Error('PO is expected to be scoped');
  }

  let taskQueue: Promise<any> = Promise.resolve();

  const scheduleCallBack = <U>(callBack: (arg: U) => U | Promise<U>) => {
    return (taskQueue = taskQueue.then(callBack));
  };

  const then = <U>(callBack: (arg: Promise<U>) => U) => {
    callBack(taskQueue);
  };

  return page.actions(
    new PageObject(page.selectors, page.scope),
    scheduleCallBack,
    then,
    page.selectors,
  );
};

export interface Page<T extends Record<string, FindBy>, K> {
  selectors: T;
  actions: (
    po: PageObject<T>,
    scheduleCallback: <U>(callBack: (value: U) => U | Promise<U>) => Promise<U>,
    then: <U>(callBack: (arg: Promise<U>) => U) => void,
    selectors: T,
  ) => K;
  scope?: HTMLElement | keyof T;
}

export const pageActions = {
  async type(target: Element | FindBy, value: string) {
    fireEvent.change(await asElement(target), { target: { value: value } });
  },

  async select(target: Element | FindBy, value: string) {
    fireEvent.keyDown(await asElement(target), { key: 'ArrowDown' });
    fireEvent.click(screen.getByText(value));
  },

  async fillSelectSearch(target: Element | FindBy, value: string) {
    const element = await asElement(target);
    this.keyDown(element);
    this.type(element.closest('input')!, value);
  },

  async keyDown(target: Element | FindBy) {
    fireEvent.keyDown(await asElement(target), { key: 'ArrowDown' });
  },

  async click(target: Element | FindBy) {
    fireEvent.click(await asElement(target));
  },

  async blur(target: Element | FindBy) {
    fireEvent.blur(await asElement(target));
  },
};

const asElement = async (target: Element | FindBy) =>
  target instanceof Element ? target : await findElement(target);
