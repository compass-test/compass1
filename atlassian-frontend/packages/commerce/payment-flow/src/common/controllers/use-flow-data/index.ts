import { useCallback, useState } from 'react';

export const useFlowData = (
  initialData: any,
): {
  flowData: any;
  updateFlowData: (partial: any) => void;
} => {
  const [flowData, setFlowData] = useState(initialData);

  const updateFlowData = useCallback((partialData: any) => {
    setFlowData((prevFlowData: any) => ({
      ...prevFlowData,
      ...partialData,
    }));
  }, []);

  return {
    flowData,
    updateFlowData,
  };
};
