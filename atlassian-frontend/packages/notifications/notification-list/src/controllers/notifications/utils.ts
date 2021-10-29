import { RequestCategory, RequestReadState } from '../../common/types';

export const toFilterIndex = (
  category: RequestCategory,
  readState: RequestReadState,
) => `${category}${readState}`;
