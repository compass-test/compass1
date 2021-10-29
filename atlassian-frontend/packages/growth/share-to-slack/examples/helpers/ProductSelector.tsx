import React, { useCallback } from 'react';

import styled from 'styled-components';

import { Radio } from '@atlaskit/radio';

import type { AtlassianProduct } from '../../src/common/types';

const Container = styled.div`
  margin: 16px 0;
`;

const radios: { [key in AtlassianProduct]: string } = {
  jira: 'Jira',
  confluence: 'Confluence',
};

type Props = {
  name: string;
  selectedProduct: AtlassianProduct;
  onChangeSelectedProduct: (product: AtlassianProduct) => void;
};

export default function ProductSelector({
  name,
  selectedProduct,
  onChangeSelectedProduct,
}: Props) {
  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChangeSelectedProduct(event.target.value as AtlassianProduct);
    },
    [onChangeSelectedProduct],
  );

  return (
    <Container>
      {Object.entries(radios).map(([product, label]) => (
        <Radio
          key={product}
          value={product}
          label={label}
          name={name}
          isChecked={selectedProduct === product}
          onChange={onChange}
        />
      ))}
    </Container>
  );
}
