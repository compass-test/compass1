export const SSR_PERFORMANCE_MARK = 'ssr:page';

export const setPerformanceMark = () => {
  performance.mark(SSR_PERFORMANCE_MARK);
};
