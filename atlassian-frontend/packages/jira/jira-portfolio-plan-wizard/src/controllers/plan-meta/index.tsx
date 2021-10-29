import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';

import { usePlanConfiguration as usePlanConfigurationDI } from '../../services';
import { useAPI } from '../api';

type DirtyFields = { [fieldName: string]: boolean };
export interface PlanMetaContext {
  projectLimit?: number;
  issueLimit?: number;
  isLoading: boolean;
  // Hack , our AK form is broken all the dirty states are broken, self-manage them here
  dirtyFields: { [fieldName: string]: boolean };
  setDirtyFields: Dispatch<SetStateAction<DirtyFields>>;
}

const context = createContext<PlanMetaContext>({} as any);

export const usePlanMeta = () => useContext(context);

type Props = {
  usePlanConfiguration?: typeof usePlanConfigurationDI;
};

export const PlanMetaProvider: React.FC<Props> = ({
  children,
  usePlanConfiguration = usePlanConfigurationDI,
}) => {
  const [dirtyFields, setDirtyFields] = useState<DirtyFields>({});
  const api = useAPI();
  const {
    loading: planConfigurationLoading,
    data: planConfiguration,
  } = usePlanConfiguration(api);
  const value = {
    projectLimit:
      planConfiguration?.projectLimit ?? planConfiguration?.defaultProjectLimit,
    issueLimit:
      planConfiguration?.absoluteIssueLimit ??
      planConfiguration?.defaultAbsoluteIssueLimit,
    isLoading: planConfigurationLoading,
    dirtyFields,
    setDirtyFields,
  };

  return <context.Provider value={value} children={children} />;
};

export default PlanMetaProvider;
