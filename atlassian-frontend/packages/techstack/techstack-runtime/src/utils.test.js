const { getChecksForTeckStack } = require('./utils');

const createCheck = (type, ruleName) => ({
  type,
  plugin: 'plugin',
  rule: ruleName,
  configuration: 'error',
});

const createSolution = key => {
  return {
    id: `solution-${key}`,
    checks: () => [
      createCheck('eslint', `check-eslint-${key}`),
      createCheck('stricter', `check-stricter-${key}`),
    ],
    antiChecks: () => [
      createCheck('eslint', `anti-check-eslint-${key}`),
      createCheck('stricter', `anti-check-stricter-${key}`),
    ],
  };
};

const createSolutionWithoutChecks = key => {
  return {
    id: `solution-${key}`,
  };
};

const techstackDefinition = [
  {
    id: 'use-case-a',
    solutions: [
      createSolution('a-a'),
      createSolution('a-b'),
      createSolution('a-c'),
      createSolutionWithoutChecks('a-d'),
    ],
  },
  {
    id: 'use-case-b',
    solutions: [
      createSolution('b-a'),
      createSolution('b-b'),
      createSolution('b-c'),
      createSolutionWithoutChecks('b-d'),
    ],
  },
];

const techstack = { 'use-case-a': ['solution-a-a'] };
const techstack2 = { 'use-case-b': ['solution-b-a', 'solution-b-b'] };

describe('Utils for techstack tests', () => {
  test('getChecksForTechStack should return correct checks', () => {
    // dependency on an external package, need to mock it properly instead
    // but okay for now
    expect(
      getChecksForTeckStack({
        techstackDefinition,
        techstack,
        config: {},
      }),
    ).toMatchSnapshot();

    expect(
      getChecksForTeckStack({
        techstackDefinition,
        techstack: techstack2,
        config: {},
      }),
    ).toMatchSnapshot();
  });
});

module.exports = {
  techstackDefinition,
  techstack,
  techstack2,
};
