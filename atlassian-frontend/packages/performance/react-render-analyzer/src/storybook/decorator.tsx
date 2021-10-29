import React, { useCallback } from 'react';
import { makeDecorator } from '@storybook/addons';
import root from '../global/window-global';
import { useRenderAnalyzer } from '../hooks/use-render-analyzer';
import { Analysis } from '../types';

export const decorator = makeDecorator({
  name: 'ReactRenderAnalyzer',
  parameterName: 'reactRenderAnalyzer',
  wrapper: (storyFn, context) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const handler = useCallback((analysis: Analysis) => {
      if ((root as Window).__RRA_CYPRESS__) {
        // @ts-ignore ignores checks when casting
        (root as Window).__RRA_CYPRESS__.push(analysis);
      }
    }, []);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const Wrapper = useRenderAnalyzer({ immediate: true }, handler);

    return <Wrapper>{storyFn(context)}</Wrapper>;
  },
});
