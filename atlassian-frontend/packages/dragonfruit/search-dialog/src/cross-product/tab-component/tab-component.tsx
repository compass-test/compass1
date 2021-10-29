import React, { FunctionComponent } from 'react';
import { ConfluenceSearchDialogContentProps } from '../../confluence';
import { AsyncConfluence } from '../async-loading';
import { Products, usePrimaryProduct } from '../../common/product-context';

export interface ConfluenceTabData {
  id: Products.confluence;
  extra: ConfluenceSearchDialogContentProps;
  label?: string;
  isFirstTab?: boolean;
}

export interface CompassTabData {
  id: Products.compass;
  extra: ConfluenceSearchDialogContentProps;
  label?: string;
  isFirstTab?: boolean;
}

export interface GenericTabData {
  id: Products.other;
  extra: any;
  label?: string;
  isFirstTab?: boolean;
}

export type CrossProductTabData =
  | ConfluenceTabData
  | CompassTabData
  | GenericTabData;

interface Props {
  data: CrossProductTabData;
}

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
    case Products.compass: {
      // These are props are only passed to the component if they're a primary component
      const isPrimary = primaryProduct === data.id;
      const primaryProps = isPrimary ? { linkComponent } : {};

      return <AsyncConfluence {...commonProps} {...primaryProps} />;
    }
    default:
      // in theory should never come here. Ignore.
      return <></>;
  }
};

export default TabComponent;
