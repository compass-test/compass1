import { buildComponentAri } from '../../src';

describe('buildComponentAri tests', () => {
  it('should return the correct component ari when the workspace id, component resource id and cloud id is given correctly', () => {
    const props = {
      componentResourceId: '5deff61a-c5f9-4266-8d1e-d741b3acb9f1',
      cloudId: '7550aec5-71ad-43de-8402-8f7d2d37398c',
      workspaceId: '6ac99ab7-b991-4faf-8a80-1250515fbe02',
    };
    const componentId = buildComponentAri(props);
    expect(componentId).toEqual(
      'ari:cloud:compass:7550aec5-71ad-43de-8402-8f7d2d37398c:component/6ac99ab7-b991-4faf-8a80-1250515fbe02/5deff61a-c5f9-4266-8d1e-d741b3acb9f1',
    );
  });

  it('should throw an error if the workspaceId is not a uuid', () => {
    const props = {
      componentResourceId: '5deff61a-c5f9-4266-8d1e-d741b3acb9f1',
      cloudId: '7550aec5-71ad-43de-8402-8f7d2d37398c',
      workspaceId: 'workspace',
    };

    expect(() => buildComponentAri(props)).toThrowError();
  });

  it('should throw an error if the componentResourceId is not a uuid', () => {
    const props = {
      componentResourceId: 'resource',
      cloudId: '7550aec5-71ad-43de-8402-8f7d2d37398c',
      workspaceId: '6ac99ab7-b991-4faf-8a80-1250515fbe02',
    };
    expect(() => buildComponentAri(props)).toThrowError();
  });
});
