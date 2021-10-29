import { InjectedIntl } from 'react-intl';
import { ProductStates } from '../../../../product-state-machine/product-state-machine-types';
import { SearchItems } from '../../result-types';
import { LinkComponent } from '@atlassian/search-dialog';
import React from 'react';

export interface ResultRendererProps {
  preQueryItems: SearchItems;
  postQueryItems: SearchItems;
  productState: ProductStates;
  linkComponent?: LinkComponent;
}

export interface CustomizedRendererChildFn {
  /**
   * Used to allow the consumer to provide a custom layout and function for their tabbed dialog product in the form of a header, body and footer.
   */
  children?:
    | React.ReactElement // For legacy Jira and Connie components
    | ((
        props: ResultRendererChildFnArgs & ScreenSpecificProps,
      ) => CustomizedRendererChildReturnType);
}

interface CustomizedRendererChildReturnType {
  Header?: () => React.ReactElement;
  Body?: () => React.ReactElement;
  Footer?: () => React.ReactElement;
}
export interface ResultRendererChildFnArgs {
  query: string;
  productState: ProductStates;
  linkComponent?: LinkComponent;
}
export interface ScreenSpecificProps {
  /**
   * Used on error screens to focus input and trigger another network request.
   */
  onRetry: () => void;

  /**
   * Used on no results screen to redirect to advanced search , if any.
   */
  urlGeneratorForNoResultsScreen: (query: string) => string;

  /**
   * Generates section titles on the pre query screen. Return a string to
   * overwrite the default, otherwise return empty string to use the default
   * pre query section title of "Recently updated <section-title>".
   */
  preQuerySectionTitleGenerator?: (title: string, intl: InjectedIntl) => string;
}
