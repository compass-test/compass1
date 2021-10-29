import React, { Fragment } from 'react';
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
  return (
    <Fragment>
      <Head>
        <title>Atlassian CLA</title>
      </Head>
      <Page>
        <Grid spacing="comfortable">
          <GridColumn>
            <Header>Contributing to Atlassian Projects</Header>
            <p>
              Welcome to the{' '}
              <a href="https://opensource.atlassian.com/">
                Atlassian Open Source community
              </a>
              ! We require that all contributions to our projects are
              accompanied by a signed Contributor License Agreement (CLA) before
              we can accept them. Please select the appropriate option below.
            </p>
            <section className="cards">
              <Link href="/individual">
                <a className="card-link" aria-label="Individual">
                  <article className="card">
                    <h3>
                      <PersonIcon label="" /> Individual
                    </h3>
                    <p>
                      Select this if you are signing the CLA on behalf of
                      yourself.
                    </p>
                  </article>
                </a>
              </Link>
              <Link href="/corporate">
                <a className="card-link" aria-label="Corporate">
                  <article className="card">
                    <h3>
                      <PeopleGroupIcon label="" /> Corporate
                    </h3>
                    <p>
                      Select this if you are signing the CLA on behalf of your
                      employer.
                    </p>
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
