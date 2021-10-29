import { OverridesType } from '@atlaskit/drawer';

const MOBILE_BREAKPOINT = 500;

export const getDrawerStyleOverrides = (): OverridesType => {
  return {
    Sidebar: {
      cssFn: () => ({
        top: '10px',
        left: 12,
        position: 'absolute',
        [`@media (max-width: ${MOBILE_BREAKPOINT}px)`]: {
          top: 4,
          width: 52,
        },
      }),
    },
    Content: {
      cssFn: (defaultStyles) => ({
        ...defaultStyles,
        marginTop: 0,
        [`@media (max-width: ${MOBILE_BREAKPOINT}px)`]: {
          marginTop: 48,
        },
      }),
    },
  };
};
