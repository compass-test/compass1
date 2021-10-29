import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import ErrorBoundary from './components/ErrorBoundary';
import { Navigation } from './components/Navigation';
import { ReleaseDetailsPage } from './pages/ReleaseDetailsPage';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Content = styled.div`
  flex: 1;
  overflow-y: scroll;
`;

const Root = () => (
  <Router>
    <AppContainer>
      <ErrorBoundary>
        <Navigation />
        <Content>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/releases/:release" component={ReleaseDetailsPage} />
            <Redirect to="/" />
          </Switch>
        </Content>
        <Footer />
      </ErrorBoundary>
    </AppContainer>
  </Router>
);

ReactDOM.render(<Root />, document.getElementById('app'));
