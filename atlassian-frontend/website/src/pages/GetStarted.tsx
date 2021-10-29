import React from 'react';
import ReactMarkdown from 'react-markdown';
// @ts-ignore
import GetStartedMarkDown from './GetStartedMd.md';
import Page from '../components/Page';

export default class GetStarted extends React.PureComponent<{}> {
  render() {
    return (
      <Page>
        <ReactMarkdown source={GetStartedMarkDown} />
      </Page>
    );
  }
}
