import React, { FC, useCallback } from 'react';

import { createBreadcrumbAPI } from '../src';

export const BREADCRUMBED_BUTTON_TEST_ID = 'breadcrumbed-button';
export const BREADCRUMBLESS_BUTTON_TEST_ID = 'breadcrumbless-button';

export const OUTTER_BREADCRUMB_NAME = 'outter-breadcrumb';
export const OUTTER_BREADCRUMB_ATTRIBUTES = { outterBreadcrumb: 'value1' };

export const INNER_BREADCRUMB_NAME = 'inner-breadcrumb';
export const INNER_BREADCRUMB_ATTRIBUTES = { innerBreadcrumb: 'value2' };

const { Breadcrumb, useGetBreadcrumbs } = createBreadcrumbAPI<{
  attributes: Record<string, any>;
}>();

const Button: FC = (props) => {
  const getBreadcrumbs = useGetBreadcrumbs();
  const onClick = useCallback(() => {
    console.log(getBreadcrumbs?.());
  }, [getBreadcrumbs]);
  return <button {...props} onClick={onClick} />;
};

const Example = () => (
  <>
    <Breadcrumb
      name={OUTTER_BREADCRUMB_NAME}
      attributes={OUTTER_BREADCRUMB_ATTRIBUTES}
    >
      <Breadcrumb
        name={INNER_BREADCRUMB_NAME}
        attributes={INNER_BREADCRUMB_ATTRIBUTES}
      >
        <Button data-testid={BREADCRUMBED_BUTTON_TEST_ID}>
          Log breadcrumbed button
        </Button>
      </Breadcrumb>
    </Breadcrumb>
    <Button data-testId={BREADCRUMBLESS_BUTTON_TEST_ID}>
      Log when there's no breadcrumbs
    </Button>
  </>
);

export default Example;
