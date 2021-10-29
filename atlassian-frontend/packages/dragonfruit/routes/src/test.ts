import { routes } from './main';
import { ComponentDetailPageUrlParam } from './types';

describe('Routes', () => {
  test('generates component details routes', () => {
    const result = routes.COMPONENT_DETAILS(':componentId', ':componentPage?');

    expect(result).toBe('/compass/component/:componentId/:componentPage?');
  });

  test('generates component details paths with a resource ID', () => {
    const componentId = '7f9ae394-5c1b-11ea-9a95-0ec70051ff9e';

    const result = routes.COMPONENT_DETAILS(componentId);

    expect(result).toBe(`/compass/component/${componentId}`);
  });

  test('generates component details paths with an ARI', () => {
    const resourceId = '7f9ae394-5c1b-11ea-9a95-0ec70051ff9e';
    const componentAri = `ari:cloud:compass:e1efaa0f-9172-4962-a37d-b00152456cf4:component/abcdaa0f-9172-4962-a37d-b00152456cf4/${resourceId}`;

    const result = routes.COMPONENT_DETAILS(componentAri);

    expect(result).toBe(`/compass/component/${resourceId}`);
  });

  test('generates component details paths with a sub page', () => {
    const componentId = '7f9ae394-5c1b-11ea-9a95-0ec70051ff9e';

    const result = routes.COMPONENT_DETAILS(
      componentId,
      ComponentDetailPageUrlParam.DEPENDENCIES,
    );

    expect(result).toBe(`/compass/component/${componentId}/dependencies`);
  });

  test('generates component details app page routes', () => {
    const result = routes.COMPONENT_DETAILS_APP(':componentId', ':extensionId');

    expect(result).toBe('/compass/component/:componentId/app/:extensionId');
  });

  test('generates component details app page paths with a component ID and extension ARI', () => {
    const componentId = '7f9ae394-5c1b-11ea-9a95-0ec70051ff9e';
    const extensionAri =
      'ari:cloud:ecosystem::extension/9ff2919f-a8b7-4974-9596-d82588827b16/90181aaa-bbb8-4ce0-b426-622313841eb9/static/compass-forge-hello-world';

    const result = routes.COMPONENT_DETAILS_APP(componentId, extensionAri);

    expect(result).toBe(
      '/compass/component/7f9ae394-5c1b-11ea-9a95-0ec70051ff9e/app/b%3AYXJpOmNsb3VkOmVjb3N5c3RlbTo6ZXh0ZW5zaW9uLzlmZjI5MTlmLWE4YjctNDk3NC05NTk2LWQ4MjU4ODgyN2IxNi85MDE4MWFhYS1iYmI4LTRjZTAtYjQyNi02MjIzMTM4NDFlYjkvc3RhdGljL2NvbXBhc3MtZm9yZ2UtaGVsbG8td29ybGQ%3D',
    );
  });

  test('generates component details app page paths with a component ARI and extension ARI', () => {
    const componentAri =
      'ari:cloud:compass:e1efaa0f-9172-4962-a37d-b00152456cf4:component/abcdaa0f-9172-4962-a37d-b00152456cf4/7f9ae394-5c1b-11ea-9a95-0ec70051ff9e';
    const extensionAri =
      'ari:cloud:ecosystem::extension/9ff2919f-a8b7-4974-9596-d82588827b16/90181aaa-bbb8-4ce0-b426-622313841eb9/static/compass-forge-hello-world';

    const result = routes.COMPONENT_DETAILS_APP(componentAri, extensionAri);

    // Component ARI should be simplified down to the resource ID
    // Extension ARI should just be encoded
    expect(result).toBe(
      '/compass/component/7f9ae394-5c1b-11ea-9a95-0ec70051ff9e/app/b%3AYXJpOmNsb3VkOmVjb3N5c3RlbTo6ZXh0ZW5zaW9uLzlmZjI5MTlmLWE4YjctNDk3NC05NTk2LWQ4MjU4ODgyN2IxNi85MDE4MWFhYS1iYmI4LTRjZTAtYjQyNi02MjIzMTM4NDFlYjkvc3RhdGljL2NvbXBhc3MtZm9yZ2UtaGVsbG8td29ybGQ%3D',
    );
  });
});
