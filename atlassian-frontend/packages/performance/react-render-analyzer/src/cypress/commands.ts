import '../../types/cypress';

Cypress.Commands.add('noUnnecessaryRenders', () => {
  cy.window().then(win => {
    const analyses = win.__RRA_CYPRESS__;

    if (!analyses) {
      assert.fail('React Render Analyzer was not found or setup.');
      return;
    }

    for (const analysis of analyses) {
      for (const audit of analysis.audits) {
        if (audit.unnecessary) {
          const { displayName } = audit.render;
          assert.fail(`<${displayName} /> rendered unnecessarily.`);
        }
      }
    }
  });
});

Cypress.Commands.add('resetRenderAnalyzer', (...args) => {
  cy.window().then(win => {
    win.__RRA_CYPRESS__ = [];
  });
});

Cypress.Commands.overwrite(
  'visit',
  (originalFn, url, { onBeforeLoad, ...options } = {}) => {
    return originalFn(url, {
      ...options,
      onBeforeLoad(...args: [Window]) {
        const [win] = args as [Window];
        win.__RRA_CYPRESS__ = [];

        if (typeof onBeforeLoad === 'function') {
          onBeforeLoad(...args);
        }
      },
    });
  },
);
