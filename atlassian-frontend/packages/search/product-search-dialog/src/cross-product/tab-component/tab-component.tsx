import React, { FunctionComponent } from 'react';
import { JiraSearchDialogContentProps } from '../../jira';
import { ConfluenceSearchDialogContentProps } from '../../confluence';
import { AsyncConfluence, AsyncJira } from '../async-loading';
import { Products, usePrimaryProduct } from '../../common/product-context';

interface TabUIProps {
  isFirstTab?: boolean;
  label?: string;
}

export interface ConfluenceTabData extends TabUIProps {
  id: Products.confluence;
  extra: ConfluenceSearchDialogContentProps;
}

export interface JiraTabData extends TabUIProps {
  id: Products.jira;
  extra: JiraSearchDialogContentProps;
}

export interface GenericTabData extends TabUIProps {
  id: Products.other;
  extra: any;
}

export type CrossProductTabData =
  | JiraTabData
  | ConfluenceTabData
  | GenericTabData;

interface Props {
  data: CrossProductTabData;
}

const defaultOnNavigate = (
  url: string,
  event: React.MouseEvent | KeyboardEvent,
) => {
  window.location.assign(url);
};

const TabComponent: FunctionComponent<Props> = ({ data }) => {
  const {
    isExpanded,
    linkComponent,
    query,
    onRetry,
    setAdditionalAnalyticsContext,
    queryVersion,
    debounceTime,
    formatDate,
    setDialogHeight,
    dialogHeight,
  } = data.extra;

  const commonProps = {
    isExpanded,
    query,
    onRetry,
    setAdditionalAnalyticsContext,
    queryVersion,
    debounceTime,
    formatDate,
    setDialogHeight,
    dialogHeight,
  };

  const primaryProduct = usePrimaryProduct();

  switch (data.id) {
    case Products.confluence: {
      // These are props are only passed to the component if they're a primary component
      const isPrimary = primaryProduct === data.id;
      const primaryProps = isPrimary ? { linkComponent } : {};

      return <AsyncConfluence {...commonProps} {...primaryProps} />;
    }
    case Products.jira: {
      const { onNavigate } = data.extra;

      // These are props are only passed to the component if they're a primary component
      const primaryProps =
        primaryProduct === data.id
          ? { onNavigate, linkComponent }
          : { onNavigate: defaultOnNavigate };

      return <AsyncJira {...commonProps} {...primaryProps} />;
    }
    default:
      // in theory should never come here. Ignore.
      return <></>;
  }
};

export default TabComponent;
