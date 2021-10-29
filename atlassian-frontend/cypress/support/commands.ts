// eslint-disable-next-line import/no-extraneous-dependencies
const { baseUrl } = require('../../cypress.json');
// eslint-disable-next-line import/no-extraneous-dependencies
import 'cypress-file-upload';

/* eslint-disable-next-line */
/* eslint-disable-next-line @typescript-eslint/no-namespace */
declare namespace Cypress {
  interface Chainable {
    navigateTo(groupId: string, packageId: string, exampleId: string): void;
  }
}

Cypress.Commands.add(
  'navigateTo',
  (groupId: string, packageId: string, exampleId: string) => {
    const queryStrings = new URLSearchParams({
      groupId,
      packageId,
      exampleId,
    });

    return cy.visit(`${baseUrl}/examples.html?${queryStrings.toString()}`);
  },
);
