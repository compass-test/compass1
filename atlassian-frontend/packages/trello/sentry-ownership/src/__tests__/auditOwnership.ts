import {
  generateOwnershipReport,
  ValidateOwnershipResult,
  doesFilePathMatchPattern,
  isValidPattern,
} from '../auditOwnership';

describe('validateOwnership', () => {
  describe('doesFilePathMatchPattern', () => {
    it.each`
      filePath                                              | pattern                                               | match
      ${'./app/src/components/MyComponent/MyComponent.tsx'} | ${'./*'}                                              | ${true}
      ${'./app/src/components/MyComponent/MyComponent.tsx'} | ${'./app/*'}                                          | ${true}
      ${'./app/src/components/MyComponent/MyComponent.tsx'} | ${'./app/src/*'}                                      | ${true}
      ${'./app/src/components/MyComponent/MyComponent.tsx'} | ${'./app/src/components/*'}                           | ${true}
      ${'./app/src/components/MyComponent/MyComponent.tsx'} | ${'./app/src/components/MyComponent/*'}               | ${true}
      ${'./app/src/components/MyComponent/MyComponent.tsx'} | ${'./app/src/components/MyComponent/MyComponent.tsx'} | ${true}
      ${'./app/src/components/MyComponent/MyComponent.tsx'} | ${'*'}                                                | ${false}
      ${'./app/src/components/MyComponent/MyComponent.tsx'} | ${'/*'}                                               | ${false}
      ${'./app/src/components/MyComponent/MyComponent.tsx'} | ${'/app/src/'}                                        | ${false}
      ${'./app/src/components/MyComponent/MyComponent.tsx'} | ${'./app/scripts/SomeFile.ts'}                        | ${false}
      ${'./app/src/components/MyComponent/MyComponent.tsx'} | ${'./app/*/components/*'}                             | ${false}
    `(
      'should check matches for filePaths against patterns',
      ({ filePath, pattern, match }) => {
        expect(doesFilePathMatchPattern(filePath, pattern)).toBe(match);
      },
    );
  });

  describe('isValidPattern', () => {
    it.each`
      pattern                                      | isValid
      ${'./*'}                                     | ${true}
      ${'./*/*'}                                   | ${false}
      ${'/'}                                       | ${false}
      ${'./app/src/*/MyComponent/MyComponent.tsx'} | ${false}
      ${'./app/src*'}                              | ${false}
      ${'./app/src/*'}                             | ${true}
      ${'./app/*/src/MyComponent.tsx'}             | ${false}
    `('should check if a pattern is valid', ({ pattern, isValid }) => {
      expect(isValidPattern(pattern)).toBe(isValid);
    });
  });

  describe('validateOwnership', () => {
    it('should validate ownership of specific files', () => {
      const filePaths = [
        './app/src/components/MyComponent/MyComponent.tsx',
        './app/src/components/MyComponent/index.ts',
      ];

      const ownership = {
        team1: [
          './app/src/components/MyComponent/MyComponent.tsx',
          './app/src/components/MyComponent/index.ts',
        ],
        team2: ['./app/src/components/SomethingElse/index.ts'],
      };

      const result = generateOwnershipReport(ownership, filePaths);

      const expectedResult: ValidateOwnershipResult = {
        ownedFiles: {
          './app/src/components/MyComponent/MyComponent.tsx': 'team1',
          './app/src/components/MyComponent/index.ts': 'team1',
        },
        ownershipConflicts: {},
        ownerlessFiles: [],
        invalidPatterns: [],
        unusedPatterns: [
          {
            teamName: 'team2',
            pattern: './app/src/components/SomethingElse/index.ts',
          },
        ],
      };

      expect(result).toEqual(expectedResult);
    });

    it('should validate ownership of patterns', () => {
      const filePaths = [
        './app/src/components/MyComponent/MyComponent.tsx',
        './app/src/components/MyComponent/index.ts',
      ];

      const ownership = {
        team1: ['./app/src/components/MyComponent/*'],
        team2: ['./app/src/components/SomethingElse/index.ts'],
      };

      const result = generateOwnershipReport(ownership, filePaths);

      const expectedResult: ValidateOwnershipResult = {
        ownedFiles: {
          './app/src/components/MyComponent/MyComponent.tsx': 'team1',
          './app/src/components/MyComponent/index.ts': 'team1',
        },
        ownershipConflicts: {},
        ownerlessFiles: [],
        invalidPatterns: [],
        unusedPatterns: [
          {
            teamName: 'team2',
            pattern: './app/src/components/SomethingElse/index.ts',
          },
        ],
      };

      expect(result).toEqual(expectedResult);
    });

    it('should report conflicts between patterns', () => {
      const filePaths = [
        './app/src/components/MyComponent/MyComponent.tsx',
        './app/src/components/MyComponent/index.ts',
      ];

      const ownership = {
        team1: ['./app/src/components/MyComponent/*'],
        team2: ['./app/src/components/*'],
        team3: ['./app/src/*'],
      };

      const result = generateOwnershipReport(ownership, filePaths);

      const expectedResult: ValidateOwnershipResult = {
        ownedFiles: {},
        ownershipConflicts: {
          './app/src/components/MyComponent/MyComponent.tsx': [
            {
              teamName: 'team1',
              pattern: './app/src/components/MyComponent/*',
            },
            {
              teamName: 'team2',
              pattern: './app/src/components/*',
            },
            {
              teamName: 'team3',
              pattern: './app/src/*',
            },
          ],
          './app/src/components/MyComponent/index.ts': [
            {
              teamName: 'team1',
              pattern: './app/src/components/MyComponent/*',
            },
            {
              teamName: 'team2',
              pattern: './app/src/components/*',
            },
            {
              teamName: 'team3',
              pattern: './app/src/*',
            },
          ],
        },
        ownerlessFiles: [],
        invalidPatterns: [],
        unusedPatterns: [],
      };

      expect(result).toEqual(expectedResult);
    });

    it('should report conflicts between patterns and specific filepaths as patterns', () => {
      const filePaths = [
        './app/src/components/MyComponent/MyComponent.tsx',
        './app/src/components/MyComponent/index.ts',
      ];

      const ownership = {
        team1: ['./app/src/components/MyComponent/MyComponent.tsx'],
        team2: ['./app/src/components/*'],
        team3: ['./app/src/*'],
      };

      const result = generateOwnershipReport(ownership, filePaths);

      const expectedResult: ValidateOwnershipResult = {
        ownedFiles: {},
        ownershipConflicts: {
          './app/src/components/MyComponent/MyComponent.tsx': [
            {
              teamName: 'team1',
              pattern: './app/src/components/MyComponent/MyComponent.tsx',
            },
            {
              teamName: 'team2',
              pattern: './app/src/components/*',
            },
            {
              teamName: 'team3',
              pattern: './app/src/*',
            },
          ],
          './app/src/components/MyComponent/index.ts': [
            {
              teamName: 'team2',
              pattern: './app/src/components/*',
            },
            {
              teamName: 'team3',
              pattern: './app/src/*',
            },
          ],
        },
        ownerlessFiles: [],
        invalidPatterns: [],
        unusedPatterns: [],
      };

      expect(result).toEqual(expectedResult);
    });

    it('should report on ownerless files', () => {
      const filePaths = [
        './app/src/components/MyComponent/MyComponent.tsx',
        './app/src/components/MyComponent/index.ts',
      ];

      const ownership = {
        team1: ['./app/src/components/MyOtherComponent/*'],
      };

      const result = generateOwnershipReport(ownership, filePaths);

      const expectedResult: ValidateOwnershipResult = {
        ownedFiles: {},
        ownershipConflicts: {},
        ownerlessFiles: [
          './app/src/components/MyComponent/MyComponent.tsx',
          './app/src/components/MyComponent/index.ts',
        ],
        invalidPatterns: [],
        unusedPatterns: [
          {
            teamName: 'team1',
            pattern: './app/src/components/MyOtherComponent/*',
          },
        ],
      };

      expect(result).toEqual(expectedResult);
    });

    it('should validate ownership of specific files', () => {
      const filePaths = [
        './app/src/components/MyComponent/MyComponent.tsx',
        './app/src/components/MyComponent/index.ts',
      ];

      const ownership = {
        team1: [
          './app/src/components/MyComponent/MyComponent.tsx',
          './app/src/components/MyComponent/index.ts',
        ],
        team2: ['./app/src/components/SomethingElse/index.ts'],
      };

      const result = generateOwnershipReport(ownership, filePaths);

      const expectedResult: ValidateOwnershipResult = {
        ownedFiles: {
          './app/src/components/MyComponent/MyComponent.tsx': 'team1',
          './app/src/components/MyComponent/index.ts': 'team1',
        },
        ownershipConflicts: {},
        ownerlessFiles: [],
        invalidPatterns: [],
        unusedPatterns: [
          {
            teamName: 'team2',
            pattern: './app/src/components/SomethingElse/index.ts',
          },
        ],
      };

      expect(result).toEqual(expectedResult);
    });

    it('should validate ownership of patterns', () => {
      const filePaths = [
        './app/src/components/MyComponent/MyComponent.tsx',
        './app/src/components/MyComponent/index.ts',
      ];

      const ownership = {
        team1: ['./app/src/components/MyComponent/*'],
        team2: ['./app/src/components/SomethingElse/index.ts'],
      };

      const result = generateOwnershipReport(ownership, filePaths);

      const expectedResult: ValidateOwnershipResult = {
        ownedFiles: {
          './app/src/components/MyComponent/MyComponent.tsx': 'team1',
          './app/src/components/MyComponent/index.ts': 'team1',
        },
        ownershipConflicts: {},
        ownerlessFiles: [],
        invalidPatterns: [],
        unusedPatterns: [
          {
            teamName: 'team2',
            pattern: './app/src/components/SomethingElse/index.ts',
          },
        ],
      };

      expect(result).toEqual(expectedResult);
    });

    it('should report conflicts between patterns', () => {
      const filePaths = [
        './app/src/components/MyComponent/MyComponent.tsx',
        './app/src/components/MyComponent/index.ts',
      ];

      const ownership = {
        team1: ['./app/src/components/MyComponent/*'],
        team2: ['./app/src/components/*'],
        team3: ['./app/src/*'],
      };

      const result = generateOwnershipReport(ownership, filePaths);

      const expectedResult: ValidateOwnershipResult = {
        ownedFiles: {},
        ownershipConflicts: {
          './app/src/components/MyComponent/MyComponent.tsx': [
            {
              teamName: 'team1',
              pattern: './app/src/components/MyComponent/*',
            },
            {
              teamName: 'team2',
              pattern: './app/src/components/*',
            },
            {
              teamName: 'team3',
              pattern: './app/src/*',
            },
          ],
          './app/src/components/MyComponent/index.ts': [
            {
              teamName: 'team1',
              pattern: './app/src/components/MyComponent/*',
            },
            {
              teamName: 'team2',
              pattern: './app/src/components/*',
            },
            {
              teamName: 'team3',
              pattern: './app/src/*',
            },
          ],
        },
        ownerlessFiles: [],
        invalidPatterns: [],
        unusedPatterns: [],
      };

      expect(result).toEqual(expectedResult);
    });

    it('should report conflicts between patterns and specific filepaths as patterns', () => {
      const filePaths = [
        './app/src/components/MyComponent/MyComponent.tsx',
        './app/src/components/MyComponent/index.ts',
      ];

      const ownership = {
        team1: ['./app/src/components/MyComponent/MyComponent.tsx'],
        team2: ['./app/src/components/*'],
        team3: ['./app/src/*'],
      };

      const result = generateOwnershipReport(ownership, filePaths);

      const expectedResult: ValidateOwnershipResult = {
        ownedFiles: {},
        ownershipConflicts: {
          './app/src/components/MyComponent/MyComponent.tsx': [
            {
              teamName: 'team1',
              pattern: './app/src/components/MyComponent/MyComponent.tsx',
            },
            {
              teamName: 'team2',
              pattern: './app/src/components/*',
            },
            {
              teamName: 'team3',
              pattern: './app/src/*',
            },
          ],
          './app/src/components/MyComponent/index.ts': [
            {
              teamName: 'team2',
              pattern: './app/src/components/*',
            },
            {
              teamName: 'team3',
              pattern: './app/src/*',
            },
          ],
        },
        ownerlessFiles: [],
        invalidPatterns: [],
        unusedPatterns: [],
      };

      expect(result).toEqual(expectedResult);
    });

    it('should report on ownerless files', () => {
      const filePaths = [
        './app/src/components/MyComponent/MyComponent.tsx',
        './app/src/components/MyComponent/index.ts',
      ];

      const ownership = {
        team1: ['./app/src/components/MyOtherComponent/*'],
      };

      const result = generateOwnershipReport(ownership, filePaths);

      const expectedResult: ValidateOwnershipResult = {
        ownedFiles: {},
        ownershipConflicts: {},
        ownerlessFiles: [
          './app/src/components/MyComponent/MyComponent.tsx',
          './app/src/components/MyComponent/index.ts',
        ],
        invalidPatterns: [],
        unusedPatterns: [
          {
            teamName: 'team1',
            pattern: './app/src/components/MyOtherComponent/*',
          },
        ],
      };

      expect(result).toEqual(expectedResult);
    });

    it('should report on invalid patterns', () => {
      const filePaths = [
        './app/src/components/MyComponent/MyComponent.tsx',
        './app/src/components/MyComponent/index.ts',
      ];

      const ownership = {
        team1: ['./invalid/*/pattern/1'],
        team2: ['/invalid/pattern/2'],
      };

      const result = generateOwnershipReport(ownership, filePaths);

      const expectedResult: ValidateOwnershipResult = {
        ownedFiles: {},
        ownershipConflicts: {},
        ownerlessFiles: [
          './app/src/components/MyComponent/MyComponent.tsx',
          './app/src/components/MyComponent/index.ts',
        ],
        invalidPatterns: [
          { teamName: 'team1', pattern: './invalid/*/pattern/1' },
          { teamName: 'team2', pattern: '/invalid/pattern/2' },
        ],
        unusedPatterns: [],
      };

      expect(result).toEqual(expectedResult);
    });
  });
});
