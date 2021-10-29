export enum ProFormaChoiceApiType {
  ProForma = 'ProForma',
}

export interface ChoiceApi {
  api: string;
}

export const ProFormaChoiceApi: ChoiceApi = {
  api: ProFormaChoiceApiType.ProForma,
};
