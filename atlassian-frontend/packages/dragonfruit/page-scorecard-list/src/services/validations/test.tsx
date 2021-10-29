import React, { ReactElement } from 'react';

import { renderHook } from '@testing-library/react-hooks';

import { ValueType } from '@atlaskit/select';

import { OptionWithIcon } from '../../common/ui/icon-select/types';

import {
  SCORECARD_DESCRIPTION_MAX_CHARS,
  SCORECARD_NAME_MAX_CHARS,
  useValidations,
} from './index';

describe('useValidations', () => {
  const createOptionWithIcon = (): ValueType<OptionWithIcon> => {
    const icon = (): ReactElement => <div>Faux Icon</div>;
    return { key: 'key', label: 'label', value: 'value', icon: icon() };
  };

  describe('nameValidator', () => {
    it('returns SCORECARD_NAME_BLANK when the value is undefined', () => {
      const { result } = renderHook(() => useValidations());
      const { nameValidator } = result.current;

      expect(nameValidator(undefined)).toEqual('SCORECARD_NAME_BLANK');
    });

    it('returns SCORECARD_NAME_BLANK when the value contains only whitespace', () => {
      const { result } = renderHook(() => useValidations());
      const { nameValidator } = result.current;

      expect(nameValidator('    ')).toEqual('SCORECARD_NAME_BLANK');
    });

    it('returns SCORECARD_NAME_TOO_LONG when the value length exceeds SCORECARD_NAME_MAX_CHARS', () => {
      const { result } = renderHook(() => useValidations());
      const { nameValidator } = result.current;

      expect(nameValidator('X'.repeat(SCORECARD_NAME_MAX_CHARS + 1))).toEqual(
        'SCORECARD_NAME_TOO_LONG',
      );
    });

    it('returns undefined when the value is valid', () => {
      const { result } = renderHook(() => useValidations());
      const { nameValidator } = result.current;

      expect(nameValidator('Valid Name')).toEqual(undefined);
    });
  });

  describe('descriptionValidator', () => {
    it('returns SCORECARD_DESCRIPTION_BLANK when the value is undefined', () => {
      const { result } = renderHook(() => useValidations());
      const { descriptionValidator } = result.current;

      expect(descriptionValidator(undefined)).toEqual(
        'SCORECARD_DESCRIPTION_BLANK',
      );
    });

    it('returns SCORECARD_DESCRIPTION_BLANK when the value contains only whitespace', () => {
      const { result } = renderHook(() => useValidations());
      const { descriptionValidator } = result.current;

      expect(descriptionValidator('    ')).toEqual(
        'SCORECARD_DESCRIPTION_BLANK',
      );
    });

    it('returns SCORECARD_DESCRIPTION_TOO_LONG when the value length exceeds SCORECARD_DESCRIPTION_MAX_CHARS', () => {
      const { result } = renderHook(() => useValidations());
      const { descriptionValidator } = result.current;

      expect(
        descriptionValidator('X'.repeat(SCORECARD_DESCRIPTION_MAX_CHARS + 1)),
      ).toEqual('SCORECARD_DESCRIPTION_TOO_LONG');
    });

    it('returns undefined when the value is valid', () => {
      const { result } = renderHook(() => useValidations());
      const { descriptionValidator } = result.current;

      expect(descriptionValidator('Valid Description')).toEqual(undefined);
    });
  });

  describe('componentTypeValidator', () => {
    it('returns SCORECARD_COMPONENT_TYPE_REQUIRED when the value is undefined', () => {
      const { result } = renderHook(() => useValidations());
      const { componentTypeValidator } = result.current;

      expect(componentTypeValidator(undefined)).toEqual(
        'SCORECARD_COMPONENT_TYPE_REQUIRED',
      );
    });

    it('returns undefined when the value is valid', () => {
      const { result } = renderHook(() => useValidations());
      const { componentTypeValidator } = result.current;

      expect(componentTypeValidator(createOptionWithIcon())).toEqual(undefined);
    });
  });

  describe('importanceValidator', () => {
    it('returns SCORECARD_IMPORTANCE_REQUIRED when the value is undefined', () => {
      const { result } = renderHook(() => useValidations());
      const { importanceValidator } = result.current;

      expect(importanceValidator(undefined)).toEqual(
        'SCORECARD_IMPORTANCE_REQUIRED',
      );
    });

    it('returns undefined when the value is valid', () => {
      const { result } = renderHook(() => useValidations());
      const { importanceValidator } = result.current;

      expect(importanceValidator(createOptionWithIcon())).toEqual(undefined);
    });
  });

  describe('handleFormValidation', () => {
    it('returns FormErrors with SCORECARD_CRITERIA_ARE_REQUIRED for base when no criteria are present', () => {
      const { result } = renderHook(() => useValidations());
      const { handleFormValidation } = result.current;

      expect(handleFormValidation({})).toEqual({
        base: 'SCORECARD_CRITERIA_ARE_REQUIRED',
      });

      expect(handleFormValidation({ criterias: undefined })).toEqual({
        base: 'SCORECARD_CRITERIA_ARE_REQUIRED',
      });

      expect(handleFormValidation({ criterias: [] })).toEqual({
        base: 'SCORECARD_CRITERIA_ARE_REQUIRED',
      });
    });

    it('returns FormErrors with SCORECARD_CRITERIA_DROPDOWN_SELECT_REQUIRED and list of validated criterias for base when any criteria dropdown values are not selected but the criteria weights still sum to 100', () => {
      const { result } = renderHook(() => useValidations());
      const { handleFormValidation } = result.current;

      const input = {
        criterias: [
          {
            weight: 33,
            field: 'OWNER',
          },
          {
            weight: 34,
          },
          {
            weight: 33,
            field: 'PROJECT',
          },
        ],
      };

      expect(handleFormValidation(input)).toEqual({
        base: 'SCORECARD_CRITERIA_DROPDOWN_SELECT_REQUIRED',
        criterias: [
          undefined,
          'SCORECARD_CRITERIA_DROPDOWN_SELECT_REQUIRED',
          undefined,
        ],
      });
    });

    it('returns FormErrors with SCORECARD_CRITERIA_WEIGHT_TOTAL_INVALID for base when criteria weights do not sum to 100', () => {
      const { result } = renderHook(() => useValidations());
      const { handleFormValidation } = result.current;

      const input = {
        criterias: [
          {
            weight: 50,
            field: 'PROJECT',
          },
        ],
      };

      expect(handleFormValidation(input)).toEqual({
        base: 'SCORECARD_CRITERIA_WEIGHT_TOTAL_INVALID',
      });
    });

    it('returns FormErrors with SCORECARD_CRITERIA_WEIGHT_TOTAL_INVALID for base when criteria weights are not numbers', () => {
      const { result } = renderHook(() => useValidations());
      const { handleFormValidation } = result.current;

      const input = {
        criterias: [
          { weight: '25', field: 'PROJECT' },
          { weight: '', field: 'DASHBOARD' },
          { weight: undefined, field: 'DESCRIPTION' },
        ],
      };

      expect(handleFormValidation(input)).toEqual({
        base: 'SCORECARD_CRITERIA_WEIGHT_TOTAL_INVALID',
      });
    });

    it('returns undefined when criteria weights sum to 100', () => {
      const { result } = renderHook(() => useValidations());
      const { handleFormValidation } = result.current;

      const input = {
        criterias: [
          { weight: '50', field: 'PROJECT' },
          { weight: 50, field: 'DASHBOARD' },
        ],
      };

      expect(handleFormValidation(input)).toEqual(undefined);
    });
  });
});
