import { act, renderHook } from '@testing-library/react-hooks';

import { mockExistingCriteriaList } from './mocks';

import { useCriteriaController } from './index';

describe('useCriteriaController', () => {
  describe('when initialized with no arguments', () => {
    it('should contain an empty array of criteria in state', () => {
      const { result } = renderHook(() => useCriteriaController());

      const [{ criteria }] = result.current;

      expect(criteria).toEqual(expect.arrayContaining([]));
    });
  });

  describe('when initialized with criteria', () => {
    it('should contain the initial array of criteria in state', () => {
      const expected = mockExistingCriteriaList;

      const { result } = renderHook(() => useCriteriaController(expected));

      const [{ criteria }] = result.current;

      expect(criteria).toEqual(expect.arrayContaining(expected));
    });

    it('state should not affected by subsequent, external manipulation of the initial criteria array', () => {
      const initial = mockExistingCriteriaList.slice();
      const expected = initial.slice();

      const { result } = renderHook(() => useCriteriaController(initial));

      initial.push(...initial);

      const [{ criteria }] = result.current;

      expect(criteria).toEqual(expect.arrayContaining(expected));
    });
  });

  describe('mutations', () => {
    describe('addCriteria', () => {
      it('should add a new criterion to state with a randomly assigned `id` and no selected values', () => {
        const { result } = renderHook(() => useCriteriaController());

        const [, { addCriteria }] = result.current;

        act(() => {
          addCriteria();
        });

        const [{ criteria }] = result.current;

        expect(criteria).toHaveLength(1);
        expect(criteria[0]).toHaveProperty('id');
        expect(criteria[0]).not.toHaveProperty('hasA');
        expect(criteria[0]).not.toHaveProperty('weight');
      });
    });

    describe('removeCriteria', () => {
      it('should remove a criterion by ID from state', () => {
        const initial = mockExistingCriteriaList;
        const removeId = initial[0].id;
        const expected = initial.slice(1);

        const { result } = renderHook(() => useCriteriaController(initial));

        const [, { removeCriteria }] = result.current;

        act(() => {
          removeCriteria(removeId);
        });

        const [{ criteria }] = result.current;

        expect(criteria).toEqual(expect.arrayContaining(expected));
      });
    });
  });
});
