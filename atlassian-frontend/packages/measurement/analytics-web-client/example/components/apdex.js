/* eslint-disable no-use-before-define */
/* eslint-disable react/button-has-type */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/require-default-props */
/* eslint-disable react/static-property-placement */
/* eslint-disable @repo/internal/react/no-class-components */
/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { apdexType } from '../../src';

export default class Apdex extends Component {
  static propTypes = {
    onStartApdexEvent: PropTypes.func,
    onStopApdexEvent: PropTypes.func,
    getStartApdex: PropTypes.func,
  };

  onClickStart = (...args) => {
    this.props.onStartApdexEvent(...args);
  };

  onClickStop = (...args) => {
    this.props.onStopApdexEvent(...args);
  };

  onClickOpenInactiveTab = (e) => {
    e.preventDefault();
  };

  render() {
    return (
      <div>
        <div>
          <h3>Apdex Initial Load Event</h3>
          <button
            onClick={() => {
              this.onClickStop({
                task: 'initialLoad',
                type: apdexType.INITIAL_LOAD,
              });
            }}
          >
            Stop Apdex InitialLoad Event
          </button>
          <button
            onClick={() => {
              this.onClickStop({
                task: 'initialLoad',
                type: apdexType.INITIAL_LOAD,
                additionalAttributes: {
                  testAttribute: 'testValue',
                },
              });
            }}
          >
            Stop with additional attributes
          </button>
          <br />
          <br />
          <button
            onClick={() => {
              this.onClickStop({
                task: 'initialLoad',
                type: apdexType.INITIAL_LOAD,
                startTime: window.performance.timeOrigin,
              });
            }}
          >
            Stop with startTime
          </button>
          <button
            onClick={() => {
              this.onClickStop({
                task: 'initialLoad',
                type: apdexType.INITIAL_LOAD,
                stopTime:
                  window.performance.timeOrigin + window.performance.now(),
              });
            }}
          >
            Stop with stopTime
          </button>
          <button
            onClick={() => {
              this.onClickStop({
                task: 'initialLoad',
                type: apdexType.INITIAL_LOAD,
                startTime: window.performance.timeOrigin,
                stopTime:
                  window.performance.timeOrigin + window.performance.now(),
              });
            }}
          >
            Stop with startTime & stopTime
          </button>
        </div>

        <div>
          <h3>Apdex Transition Event</h3>
          <button
            onClick={() => {
              this.onClickStart({
                task: 'testTransition',
              });
            }}
          >
            Start
          </button>
          <button
            onClick={() => {
              this.onClickStop({
                task: 'testTransition',
                type: apdexType.TRANSITION,
                startTime: window.performance.timeOrigin,
              });
            }}
          >
            Stop with startTime
          </button>
          <button
            onClick={() => {
              this.onClickStop({
                task: 'testTransition',
                type: apdexType.TRANSITION,
                stopTime:
                  window.performance.timeOrigin + window.performance.now(),
              });
            }}
          >
            Stop with stopTime
          </button>
          <button
            onClick={() => {
              const currTimestamp = window.performance.timeOrigin + window.performance.now();
              this.onClickStop({
                task: 'testTransition',
                type: apdexType.TRANSITION,
                startTime: currTimestamp - 500,
                stopTime: currTimestamp,
              });
            }}
          >
            Stop with startTime & stopTime
          </button>
          <br />
          <br />
          <button
            onClick={() => {
              this.onClickStart({
                task: 'apdexButtonClick',
                taskId: '1',
              });
            }}
          >
            Start Event 1
          </button>
          <button
            onClick={() => {
              const apdex = this.props.getStartApdex({
                task: 'apdexButtonClick',
                taskId: '1',
              });
              // eslint-disable-next-line no-console
              console.log(`getStartApdex: ${JSON.stringify(apdex)}`);
            }}
          >
            Get Event 1
          </button>
          <button
            onClick={() => {
              this.onClickStop({
                task: 'apdexButtonClick',
                taskId: '1',
                type: apdexType.TRANSITION,
              });
            }}
          >
            Stop Event 1
          </button>
        </div>

        <br />

        <div>
          <button
            onClick={() => {
              this.onClickStart({
                task: 'apdexButtonClick',
                taskId: '2',
              });
            }}
          >
            Start Event 2
          </button>
          <button
            onClick={() => {
              this.onClickStop({
                task: 'apdexButtonClick',
                taskId: '2',
                type: apdexType.TRANSITION,
              });
            }}
          >
            Stop Event 2
          </button>
        </div>
      </div>
    );
  }
}
