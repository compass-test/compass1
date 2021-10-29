import React, { Fragment, useEffect, useState } from 'react';
import '@atlaskit/css-reset';
import Page, { Grid, GridColumn } from '@atlaskit/page';
import Head from 'next/head';
import DynamicTable from '@atlaskit/dynamic-table';
import Header from '../components/header';
import { cardStyles } from '../components/card.styles';
import { api } from '../lib/utils';

const Corporate = () => {
  const [ready, setReady] = useState(false);
  const [content, setContent] = useState(null);

  const head = {
    cells: [
      { colSpan: 5, content: 'First Name' },
      { colSpan: 5, content: 'Last Name' },
      { colSpan: 9, content: 'Email' },
      {
        colSpan: 8,
        content: 'Corporation Name',
        isSortable: true,
        key: 'corporation_name',
      },
      { colSpan: 5, content: 'Github username' },
      {
        colSpan: 6,
        content: 'Date signed',
      },
    ],
  };

  useEffect(() => {
    (async () => {
      const response = await api('/api/corporate');
      setContent(response.status === 404 ? null : await response.json());
      setReady(true);
    })();
  }, []);

  if (!ready) return null;

  return (
    <Fragment>
      <Head>
        <title>Corporate CLAs</title>
      </Head>
      <Page>
        <Grid spacing="comfortable">
          <GridColumn>
            <Header>Corporate CLAs</Header>
            <p>
              <a href="/individual">View Individual CLAs</a>
            </p>
            <small>
              Some fields may be excluded for a simplified view. To view all
              data, switch to{' '}
              <a href="/api/corporate?jsonView=true">raw JSON view</a>.
            </small>
            <DynamicTable
              head={head}
              rows={content}
              rowsPerPage={40}
              defaultPage={1}
              loadingSpinnerSize="large"
              isLoading={false}
              isFixedSize
              defaultSortKey="corporation_name"
              defaultSortOrder="ASC"
            />
          </GridColumn>
        </Grid>
      </Page>
      <style jsx>{cardStyles}</style>
    </Fragment>
  );
};

export default Corporate;
