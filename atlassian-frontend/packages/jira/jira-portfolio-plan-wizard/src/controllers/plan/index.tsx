import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import isEqual from 'lodash/fp/isEqual';

import { Plan } from '../../common/types';
import {
  usePlanCreateService,
  usePlanUpdateService,
} from '../../services/plans';
import { useAPI } from '../api';

export interface PlanContext {
  fromScratch: boolean;
  plan: Plan;
  setPlan: Dispatch<SetStateAction<Plan>>;
  sync: () => Promise<void>;
  syncing: boolean;
}

const context = createContext<PlanContext>({
  fromScratch: true,
  syncing: false,
  plan: {
    id: null,
    name: '',
    permission: 'open',
    issueSources: [],
    excludeDays: 30,
    excludedVersions: [],
  },
  setPlan: () => {},
  sync: async () => {},
});

export function usePlan(): PlanContext {
  return useContext<PlanContext>(context);
}

type Props = {
  initialPlan?: Plan;
};

const defaultPlan: Plan = {
  id: null,
  name: '',
  permission: 'open',
  issueSources: [],
  excludeDays: 30,
  excludedVersions: [],
};

export const PlanProvider: React.FC<Props> = ({
  initialPlan = defaultPlan,
  children,
}) => {
  const api = useAPI();
  const {
    data: createdPlan,
    exec: createPlan,
    loading: creating,
  } = usePlanCreateService(api);
  const {
    data: updatedPlan,
    exec: updatePlan,
    loading: updating,
  } = usePlanUpdateService(api);
  const [draftPlan, setDraftPlan] = useState<Plan>(initialPlan);
  const persistedPlanRef = useRef(initialPlan);
  const { current: fromScratch } = useRef(initialPlan.id == null);
  const savedPlan = useRef(draftPlan);
  const currentPlan = useRef(draftPlan);
  currentPlan.current = draftPlan;

  useEffect(() => {
    if (createdPlan) {
      persistedPlanRef.current = createdPlan;
    }
  }, [createdPlan]);

  useEffect(() => {
    if (updatedPlan) {
      persistedPlanRef.current = updatedPlan;
    }
  }, [updatedPlan]);

  const sync = () =>
    new Promise((res) => {
      if (plan.id === null) {
        createPlan(currentPlan.current).then(() => res());
      } else if (!isEqual(savedPlan.current, currentPlan.current)) {
        updatePlan(currentPlan.current).then(() => res());
      } else {
        res();
      }
    }) as Promise<void>;

  const syncing = updating || creating;
  const plan = updatedPlan ?? createdPlan ?? draftPlan;
  const setPlan = setDraftPlan;

  return (
    <context.Provider
      value={{
        fromScratch,
        plan,
        setPlan,
        sync,
        syncing,
      }}
      children={children}
    />
  );
};

export default PlanProvider;
