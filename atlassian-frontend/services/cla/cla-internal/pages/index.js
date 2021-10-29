import React, { Fragment, useEffect, useState } from 'react';
import '@atlaskit/css-reset';
import PersonIcon from '@atlaskit/icon/glyph/person';
import PeopleGroupIcon from '@atlaskit/icon/glyph/people-group';
import Page, { Grid, GridColumn } from '@atlaskit/page';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/header';
import { cardStyles } from '../components/card.styles';

/* eslint-disable jsx-a11y/anchor-is-valid */
// next.js `<Link>` isn't a11y friendly because `a` doesn't need/have an `href` defined
// https://github.com/zeit/next.js/issues/5533
const App = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) {
    return null;
  }

  return (
    <Fragment>
      <Head>
        <title>Atlassian signed CLAs</title>
      </Head>
      <Page>
        <Grid spacing="comfortable">
          <GridColumn>
            <Header>Atlassian signed CLAs</Header>
            <p>
              Welcome! This page displays Contributor License Agreements (CLAs)
              that have been signed by our external contributors. Please select
              the appropriate option below.
            </p>
            <section className="cards">
              <Link href="/individual">
                <a className="card-link" aria-label="Individual">
                  <article className="card">
                    <h3>
                      <PersonIcon label="" /> Individual
                    </h3>
                    <p>Select to view individual CLAs.</p>
                  </article>
                </a>
              </Link>
              <Link href="/corporate">
                <a className="card-link" aria-label="Corporate">
                  <article className="card">
                    <h3>
                      <PeopleGroupIcon label="" /> Corporate
                    </h3>
                    <p>Select to view corporate CLAs.</p>
                  </article>
                </a>
              </Link>
            </section>
          </GridColumn>
        </Grid>
      </Page>
      <style jsx>{cardStyles}</style>
    </Fragment>
  );
};

export default App;
