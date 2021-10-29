import { byRole, byTestId } from '../locators';
import { createPageObject, pageActions } from '../page-object';

export const ErrorFragment = (scope: HTMLElement) =>
  createPageObject({
    scope: scope,
    selectors: {
      errorMessage: byTestId(/error-message/i),
      alert: byRole('alert'),
    },
    actions: (page) => ({
      async displayed() {
        try {
          await page.waitTillPresent('alert');
          await page.waitTillPresent('errorMessage');
          return true;
        } catch (error) {
          return false;
        }
      },

      async content() {
        await page.waitTillPresent('alert');
        return await page.textContent('errorMessage');
      },

      async clickButton(buttonText: string) {
        const button = byRole('button', { name: buttonText });
        await pageActions.click(button);
      },
    }),
  });
