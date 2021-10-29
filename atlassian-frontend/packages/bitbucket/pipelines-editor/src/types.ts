import type { SupportedLanguages } from '@atlaskit/code/types';
import type { Variable } from '@atlassian/pipelines-variables';

export enum SyntaxType {
  Text,
  CodeBlock,
}

export interface PipeReadmeSyntax {
  type?: SyntaxType;
  html?: string;
  innerText?: string;
  language?: SupportedLanguages;
}

export type Step = {
  name: string;
  description: string;
  logo: any;
  yml: string;
};

export type Pipe = {
  category: string;
  name: string;
  description: string;
  logo: string;
  yml: string;
  repositoryPath?: string;
  version?: string;
  maintainer?: { name: string; website: string };
  vendor?: { name: string };
  timestamp?: number;
  tags: string[];
};

export type Template = {
  name: string;
  description: string;
  language: string;
  logo: string;
  yml: string;
};

export type VariablesProps = {
  createVariable: (variable: Variable, environmentUuid?: string) => void;
  deleteVariable: (variable: Variable, environmentUuid?: string) => void;
  updateVariable: (
    previousVariable: Variable,
    variable: Variable,
    environmentUuid?: string,
  ) => void;
  isFetchingVariables: boolean;
  isReadOnly: boolean;
  variables: Variable[];
  environments?: { [uuid: string]: string };
  environmentVariables?: { [uuid: string]: Variable[] };
};
