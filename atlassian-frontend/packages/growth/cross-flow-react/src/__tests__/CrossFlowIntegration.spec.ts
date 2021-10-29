import { getCrossFlowSrc } from '../lib/CrossFlowIntegration';

describe('getCrossFlowSrc', () => {
  it('should return DEFAULT_SRC', () => {
    expect(getCrossFlowSrc({ edgePrefix: '' })).toEqual('/gpa-cross-flow/');
  });
  it('should prepend source with edge prefix', () => {
    const edgePrefix = 'https://api-gateway.domain';
    expect(getCrossFlowSrc({ edgePrefix })).toEqual(
      'https://api-gateway.domain/gpa-cross-flow/',
    );
  });
  it('should return custom src only', () => {
    const edgePrefix = 'api-gateway.domain';
    const src = '/test-custom-source/test-custom-gpa-cross-flow/';
    expect(getCrossFlowSrc({ edgePrefix, src })).toEqual(src);
  });
});
