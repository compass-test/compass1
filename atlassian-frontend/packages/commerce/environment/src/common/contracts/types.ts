import { Scenario } from '../scenarios';

export type ContractScenarios = Record<string, Scenario>;
export type ServiceContractScenarios = {
  consumer: string;
  provider: string;
  specName: string | undefined;
  contracts: ContractScenarios;
  enabled: boolean;
};
