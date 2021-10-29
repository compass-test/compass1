import { useCallback, useState } from 'react';

import uuid from 'uuid/v4';

import { Criteria } from './types';

export const useCriteriaController: (
  initialCriteria?: Criteria[],
) => [
  { criteria: Criteria[] },
  {
    addCriteria: () => void;
    removeCriteria: (id: string) => void;
    updateCriteria: (id: string, weight: string, field: string) => void;
  },
] = (initialCriteria) => {
  const [criteria, setCriteria] = useState<Criteria[]>(initialCriteria || []);

  const addCriteria = useCallback(() => {
    const criterion: Criteria = {
      id: uuid(),
    };

    setCriteria((current) => current.concat(criterion));
  }, [setCriteria]);

  const removeCriteria = useCallback(
    (id: string) => {
      setCriteria((current) =>
        current.filter((criterion) => criterion.id !== id),
      );
    },
    [setCriteria],
  );

  const updateCriteria = useCallback(
    (id: string, weight: string, field: string) => {
      setCriteria((current) => {
        const index = current.findIndex((criterion) => criterion.id === id);
        if (index) {
          current[index].weight = weight;
          current[index].field = field;
        }
        return [...current];
      });
    },
    [setCriteria],
  );

  return [
    {
      criteria,
    },
    {
      addCriteria,
      removeCriteria,
      updateCriteria,
    },
  ];
};
