import { AuxPipelineUserVisibleError, LegacyRenderEffect } from '../../public';

export const createErrorEffect = (
  error: AuxPipelineUserVisibleError,
): LegacyRenderEffect => ({
  type: 'render',
  aux: {
    type: 'View',
    children: [
      {
        type: 'ErrorPanel',
        props: { error },
        children: [],
      },
    ],
  },
  state: {},
});
