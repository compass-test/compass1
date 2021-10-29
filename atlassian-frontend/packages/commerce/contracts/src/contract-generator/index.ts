import type { ServiceContractScenarios } from '@atlassian/commerce-environment/mocks';
import { join, relative } from 'path';

import { generateContractMock } from '../contract-testing';

const asArray = <T>(x: T | T[]): T[] => (Array.isArray(x) ? x : [x]);

/**
 * Generates a contract-mock for a give package-mocks(mocks.ts) definition
 * @param contractMocks
 * @param workingDir
 *
 * @example
 * ```ts
 * generateContract(require('./mocks.ts'), __dirname)
 * ```
 */
export const generateContract = async (
  {
    contractMocks,
  }: {
    contractMocks: ServiceContractScenarios | undefined;
  },
  workingDir: string,
) => {
  if (!contractMocks) {
    return true;
  }

  const contractLocation = join(workingDir, 'contract-mocks');

  const mocks: any[] = [];

  await Promise.all(
    asArray(contractMocks).map(async mock => {
      if (!mock.enabled) {
        return;
      }

      await generateContractMock(contractLocation, mock);
      mocks.push({
        consumerName: mock.consumer,
        providerName: mock.provider,
        specName: mock.specName,
        location: `./${relative(
          workingDir,
          // we just "know" what PACT will generate :(
          join(contractLocation, `${mock.consumer}-${mock.provider}.json`),
        )}`,
      });
    }),
  );

  return mocks;
};
