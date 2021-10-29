import { validateTeams } from '../validateTeams';

describe('validateTeams', () => {
  it('should contain a list of contributors for the team', () => {
    const teamA = {
      'trello-fe-platform': {
        'directly-responsible-individual': 'dwalker',
        slack: 'fe-platform-trello',
        project: 'https://trello.atlassian.net/browse/FEPLAT',
      },
    };
    // @ts-ignore
    expect(validateTeams(teamA, { throwError: false }).errors).toContainEqual(
      expect.objectContaining({
        property: 'instance.trello-fe-platform.contributors',
        message: 'is required',
      }),
    );
  });

  it('should contain at least one contributor for the team', () => {
    const teamA = {
      'trello-fe-platform': {
        contributors: [],
        'directly-responsible-individual': 'dwalker',
        slack: 'fe-platform-trello',
        project: 'https://trello.atlassian.net/browse/FEPLAT',
      },
    };
    expect(validateTeams(teamA, { throwError: false }).errors).toContainEqual(
      expect.objectContaining({
        property: 'instance.trello-fe-platform.contributors',
        message: 'does not meet minimum length of 1',
      }),
    );
  });

  it('should not allow non-string contributors', () => {
    const teamA = {
      'trello-fe-platform': {
        contributors: [123],
        'directly-responsible-individual': 'dwalker',
        slack: 'fe-platform-trello',
        project: 'https://trello.atlassian.net/browse/FEPLAT',
      },
    };
    // @ts-ignore
    expect(validateTeams(teamA, { throwError: false }).errors).toContainEqual(
      expect.objectContaining({
        property: 'instance.trello-fe-platform.contributors[0]',
        message: 'is not of a type(s) string',
      }),
    );
  });

  it('should not allow teams with upper case letters', () => {
    const teamA = {
      FEPlatform: {
        contributors: [],
        'directly-responsible-individual': 'dwalker',
        slack: 'fe-platform-trello',
        project: 'https://trello.atlassian.net/browse/FEPLAT',
      },
    };
    expect(validateTeams(teamA, { throwError: false }).errors).toContainEqual(
      expect.objectContaining({
        property: 'instance',
        message:
          'additionalProperty "FEPlatform" exists in instance when not allowed',
      }),
    );
  });

  it('should not allow teams with special characters', () => {
    const teamA = {
      'trello-fe-platform?': {
        contributors: [],
        'directly-responsible-individual': 'dwalker',
        slack: 'fe-platform-trello',
        project: 'https://trello.atlassian.net/browse/FEPLAT',
      },
    };
    expect(validateTeams(teamA, { throwError: false }).errors).toContainEqual(
      expect.objectContaining({
        property: 'instance',
        message:
          'additionalProperty "trello-fe-platform?" exists in instance when not allowed',
      }),
    );
  });

  it('should require the "slack" property for each team', () => {
    const teamA = {
      'trello-fe-platform': {
        contributors: [
          'acrawford',
          'cfletcher',
          'dcruz',
          'dwalker',
          'jchung',
          'kwatkins',
          'mlozano',
        ],
        'directly-responsible-individual': 'jmooring',
      },
    };
    // @ts-ignore
    expect(validateTeams(teamA, { throwError: false }).errors).toContainEqual(
      expect.objectContaining({
        property: 'instance.trello-fe-platform.slack',
        message: 'is required',
      }),
    );
  });

  it('should require the "project" property for each team', () => {
    const teamA = {
      'trello-fe-platform': {
        contributors: [
          'acrawford',
          'cfletcher',
          'dcruz',
          'dwalker',
          'jchung',
          'kwatkins',
          'mlozano',
        ],
        'directly-responsible-individual': 'jmooring',
        slack: 'fe-platform-trello',
      },
    };
    // @ts-ignore
    expect(validateTeams(teamA, { throwError: false }).errors).toContainEqual(
      expect.objectContaining({
        property: 'instance.trello-fe-platform.project',
        message: 'is required',
      }),
    );
  });

  it('should not report any errors for a valid team', () => {
    const teamA = {
      'trello-fe-platform': {
        contributors: [
          'acrawford',
          'cfletcher',
          'dcruz',
          'dwalker',
          'jchung',
          'kwatkins',
          'mlozano',
        ],
        'directly-responsible-individual': 'jmooring',
        slack: 'fe-platform-trello',
        project: 'https://trello.atlassian.net/browse/FEPLAT',
      },
    };
    expect(validateTeams(teamA, { throwError: false }).errors.length).toEqual(
      0,
    );
  });
});
