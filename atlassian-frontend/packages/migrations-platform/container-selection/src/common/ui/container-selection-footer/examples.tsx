import React from 'react';

import { action } from '@storybook/addon-actions';
import { IntlProvider } from 'react-intl';
import Styled from 'styled-components';

import Pagination from '@atlaskit/pagination';

import ContainerSelectionFooter from './main';

export default { title: 'container-selection/ContainerSelectionFooter' };

const Container = Styled.div`
  width: 900px;
  margin: auto;
`;

const PaginationContainer = Styled.div`
  margin: auto 0;
`;

export const ContainerSelectionFooterExample = () => (
  <Container>
    <IntlProvider locale="en">
      <ContainerSelectionFooter
        rowsPerPageOptions={[10, 20, 30]}
        defaultRowsPerPage={10}
        onRowsPerPageChange={action('rows per page change')}
        pagination={
          <PaginationContainer>
            <Pagination pages={Array.from({ length: 10 }, (_, i) => i + 1)} />
          </PaginationContainer>
        }
      />
    </IntlProvider>
  </Container>
);
