import React from 'react';

const render = (props: any, renderImpl?: Function) =>
  (renderImpl && renderImpl(props)) || <>{props.children}</>;

export const mockComponent = (
  component: any,
  renderImpl?: Function,
): jest.MockedFunction<any> => {
  if (jest.isMockFunction(component)) {
    component.mockImplementation((props: any) => render(props, renderImpl));
    return component;
  }
  const mockRender = (component as any).render.mockImplementation(
    (props: any) => render(props, renderImpl),
  );
  return mockRender;
};
