import { Handler } from '@atlassian/forge-ui-types';
import { useMemoOne as useMemo } from 'use-memo-one';

export function useMemoHandler(handler?: Handler) {
  const componentKey = handler && handler.componentKey;
  const prop = handler && handler.prop;
  return useMemo(() => {
    if (!componentKey || !prop) {
      return null;
    }
    return {
      componentKey,
      prop,
    };
  }, [componentKey, prop]);
}
