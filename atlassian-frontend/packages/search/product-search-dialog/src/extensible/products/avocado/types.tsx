import { ScopedAggregatorResponse } from '../../../common/clients';

export enum AvocadoScope {
  AvocadoQuestion = 'avocado.question',
  AvocadoAnswer = 'avocado.answer',
}

export interface AvocadoQuestionResponse {
  id: string;
  url: string;
  title: string;
  iconUrl: string;
}

export interface AggregatorAvocadoResponse
  extends ScopedAggregatorResponse<AvocadoScope> {
  results: AvocadoQuestionResponse[];
}
