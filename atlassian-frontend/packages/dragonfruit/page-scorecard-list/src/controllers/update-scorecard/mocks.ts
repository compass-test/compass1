import { CriteriaInput, OwnerFormData, UpdateFormData } from './index';

export const mockCriteriaInput: CriteriaInput[] = [
  { weight: 40, field: 'DESCRIPTION', id: '1234' },
  { weight: 60, field: 'CHAT_CHANNEL', id: '3421' },
];

export const mockOwnerFormData: OwnerFormData = {
  id: '12345',
  name: 'fake name',
};

export const mockUpdateFormData: UpdateFormData = {
  owner: mockOwnerFormData,
  criterias: mockCriteriaInput,
  name: 'new component',
  importanceSelection: { value: 'REQUIRED' },
  componentTypeSelection: { value: 'SERVICE' },
  description: 'my new component',
};
