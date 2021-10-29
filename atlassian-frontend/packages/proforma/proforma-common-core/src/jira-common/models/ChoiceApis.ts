import { ChoiceApi } from '../../form-system/stores/ChoiceApi';

export enum InsightChoiceApiType {
  Default = 'InsightDefault',
  Deprecated = 'InsightDeprecated',
  Readonly = 'InsightReadonly',
  Reference = 'InsightReference',
}

export interface InsightChoiceApi extends ChoiceApi {
  api: InsightChoiceApiType;
  fieldConfigId: number;
}

export function isInsightChoiceApi(
  choiceApi: ChoiceApi,
): choiceApi is InsightChoiceApi {
  return choiceApi.api.startsWith('Insight');
}
