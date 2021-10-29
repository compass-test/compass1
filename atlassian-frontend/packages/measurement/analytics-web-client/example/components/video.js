/* eslint-disable no-use-before-define */
/* eslint-disable @repo/internal/react/no-class-components */
/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { withAnalytics } from '@atlaskit/analytics';

import { eventType } from '../../src';

class Video extends Component {
  onClick = (e) => {
    const { onClick, firePrivateAnalyticsEvent } = this.props;
    firePrivateAnalyticsEvent('video played', {
      action: 'played',
      actionSubject: 'video',
      actionSubjectId: '123',
      attributes: {
        videoType: 'youtube',
      },
      tags: ['media'],
      eventType: eventType.UI,
    });
    if (onClick) onClick(e);
  };

  render() {
    // eslint-disable-next-line react/button-has-type
    return <button onClick={this.onClick}>Play</button>;
  }
}

Video.defaultProps = {
  onClick: null,
};

Video.propTypes = {
  onClick: PropTypes.func,
  firePrivateAnalyticsEvent: PropTypes.func.isRequired,
};

export default withAnalytics(Video);
