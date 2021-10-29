import React, { useEffect, useState } from 'react';
import {
  PLACEHOLDER_EXPERIENCE,
  useAggregatorClient,
} from '../../aggregator-client-context';
import { ProductContextProps, withProductContext } from '../product-router';
import RegisterProduct, { RegisterProductProps } from './register-product';

export type PermissionSupplier = () => Promise<string[]>;

export type CheckProductPermissionsProps = Omit<
  RegisterProductProps,
  'allowedSections'
> & {
  /**
   * A promise which resolves a list of sectionIds accessible by the user.
   * This will override the aggregator scopes API check.
   */
  permissionSupplier?: PermissionSupplier;
};

/**
 * A component which invokes the permissionSupplier, if supplied or uses the Search Platform's default permission checker.
 * The calls to the default API are batched.
 * In response it expects the permissible sections that should be shown to the user.
 */
export const CheckProductPermissions: React.FC<
  CheckProductPermissionsProps & ProductContextProps
> = ({
  children,
  permissionSupplier,
  id,
  title,
  sections,
  order,
  generateAdvancedSearchUrl,
  expandedStateInputPlaceholder,
}) => {
  const [allowedSections, setAllowedSections] = useState<string[]>([]);
  const searchClient = useAggregatorClient();

  useEffect(() => {
    if (allowedSections.length === 0) {
      const promise = permissionSupplier
        ? permissionSupplier()
        : searchClient
        ? searchClient.batchedGetExtensibleProductPermission(id, {
            productIds: [id],
            experience: PLACEHOLDER_EXPERIENCE,
          })
        : Promise.resolve([]);

      promise.then((response) => {
        setAllowedSections(response);
      });
    }
    /**
     * We want to replicate componentDidMount behaviour to avoid invoking the API multiple times and we don't care if any other deps changed.
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return allowedSections.length > 0 ? (
    <RegisterProduct
      allowedSections={allowedSections}
      sections={sections}
      id={id}
      title={title}
      order={order}
      generateAdvancedSearchUrl={generateAdvancedSearchUrl}
      expandedStateInputPlaceholder={expandedStateInputPlaceholder}
    >
      {children}
    </RegisterProduct>
  ) : (
    <></>
  );
};

export default withProductContext(CheckProductPermissions);
