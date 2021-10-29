import { useEffect, useRef } from 'react';
import { useCrossFlow, Options } from '@atlassiansox/cross-flow-api-internals';
import { ConsumerProps } from './types';

export const CrossFlowConsumer = (props: Options & ConsumerProps) => {
  // Using useRef here to ensure that only the initial props are used
  // and it ensures that the useEffect handler below is only run once.
  // Any subsequent changes to props have no effect.
  const propsRef = useRef(props);
  const crossFlowRef = useRef(useCrossFlow());

  useEffect(() => {
    const crossFlow = crossFlowRef.current;

    (async () => {
      const { onComplete, onError, ...options } = propsRef.current;
      if (crossFlow.isEnabled) {
        try {
          const status = await crossFlow.api.open(options);
          onComplete?.(status);
        } catch (err) {
          onError?.(err);
        }
      }
    })();
  }, []);

  return null;
};
