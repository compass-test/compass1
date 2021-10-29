import React, { useEffect, useState } from 'react';
import { ProductContextProps, withProductContext } from '../product-router';
import { Product } from '../product-router-state';
import { Section } from './result-types';

export type RegisterProductProps = Omit<
  Product,
  'isDisplayed' | 'sectionIds'
> & {
  sections: Section[];
  allowedSections: string[];
};

/**
 * It validates that the sections which have been asked to registered are actually present in the allowed list.
 * After validation it calls the Product Router method to register the product.
 */
export const RegisterProduct: React.FC<
  ProductContextProps & RegisterProductProps
> = ({
  addProduct,
  updateProduct,
  id,
  title,
  children,
  allowedSections,
  sections,
  order,
  generateAdvancedSearchUrl,
  expandedStateInputPlaceholder,
}) => {
  const [originalId] = useState(id);
  const [registeredProduct, setRegisteredProduct] = useState(false);

  useEffect(() => {
    if (allowedSections.length > 0) {
      const allowedSectionString = allowedSections.join(' ');
      const allowedRegisteredSections = sections
        .map((sec) => sec.id)
        .filter((sectionId) => {
          const sectionIds = sectionId
            .replace(id, '')
            .replace('.', '')
            .split(',');
          let allowed = true;

          sectionIds.forEach((section) => {
            if (allowedSectionString.indexOf(section) === -1) {
              allowed = false;
            }
          });
          return allowed;
        });
      if (allowedRegisteredSections.length > 0) {
        addProduct({
          id,
          title,
          sectionIds: allowedRegisteredSections,
          order,
          generateAdvancedSearchUrl,
          expandedStateInputPlaceholder,
        });

        setRegisteredProduct(true);
      }
    }
    /**
     * Updating of state is a side effect. We want it to happen in component did mount stage. Hence replicating this behaviour.
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!registeredProduct) {
      return;
    }

    if (id !== originalId) {
      // eslint-disable-next-line no-console
      console.error(
        "product-search-dialog: Cannot update a different product's properties. Did you change accidentally change a product's id?",
      );
      return;
    }

    updateProduct({ id, generateAdvancedSearchUrl });
  }, [
    registeredProduct,
    id,
    originalId,
    updateProduct,
    generateAdvancedSearchUrl,
  ]);

  return <>{children}</>;
};

export default withProductContext(RegisterProduct);
