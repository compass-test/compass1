/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-use-before-define */
/* eslint-disable react/button-has-type */
/* eslint-disable @repo/internal/react/no-class-components */
/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */

import React, { Component } from 'react';

import { AnalyticsDecorator, AnalyticsListener } from '@atlaskit/analytics';

import AnalyticsWebClient, {
  apdexType,
  CompressionRule,
  envType,
  originTracingType,
  originType,
  ResilienceMechanism,
  tenantType,
  userType,
} from '../dist/esm';

import Apdex from './components/apdex';
import Video from './components/video';
import {
  clearIndexedDb,
  consoleLogTag,
  createCustomAWCClient,
  fireTrackEventFromClient,
  reportIndexedItemsByProduct
} from './indexedDbHelper';
import {
  createAbandonedQueue,
  createPurgableQueue,
} from './localstorageHelper';

const defaultSubproduct = 'sub';
const defaultUserId = 'DUMMY-123123123';
const defaultTenantId = '65511:bbbba5154-51f2-44c5-a72b-a14a06add13b';

const ChangePageLink = ({ client }) => (
  <a
    href="/"
    onClick={() => {
      client.sendTrackEvent({
        source: 'testPage',
        action: 'clicked',
        actionSubject: 'link',
        containers: {
          trackEventContainer: {
            id: '1234',
            type: 'testTrack',
          },
        },
      });
    }}
  >
    Full page change link with event
  </a>
);

const OriginTracingLink = () => (
  <a href="/?atlOrigin=testoriginid">Link with origin tracing url param</a>
);

const TaskSessionLink = ({ client }) => {
  client.task.createTaskSession('my-task-session');
  const url = client.task.formatTaskSessionQueryString({
    uri: '/',
    includedTaskSessions: ['my-task-session'],
  });
  return <a href={url}>Link with task session attached</a>;
};

export default class App extends Component {
  constructor() {
    super();

    this._analyticsClient = new AnalyticsWebClient(
      {
        env: envType.DEV,
        product: 'example',
        subproduct: this.state.subproduct,
        version: '1.0.0',
        origin: originType.WEB,
        locale: 'en-US',
      },
      {
        xidConsent: false,
        useLegacyUrl: true,
        resilienceMechanism: ResilienceMechanism.INDEXEDDB,
        flushBeforeUnload: true,
        delayQueueCompressors: [
          new CompressionRule(
            (event) => event.eventType === 'operational'
              && event.actionSubject === 'feature'
              && event.action === 'exposed'
              && event.source === 'testPage'
              && event.tags
              && event.tags.includes('measurement'),
            (featureExposedEvents) => [
              {
                eventType: 'operational',
                actionSubject: 'features',
                source: 'testPage',
                action: 'exposed',
                attributes: {
                  features: featureExposedEvents.reduce((acc, event) => {
                    const { flagKey, value } = event.attributes;
                    const matchingEntry = acc.find(
                      (existingEntry) => existingEntry.flagKey === flagKey
                        && existingEntry.value === value,
                    );
                    if (matchingEntry) {
                      matchingEntry.count++;
                    } else {
                      acc.push({ flagKey, value, count: 1 });
                    }
                    return acc;
                  }, []),
                },
              },
            ],
          ),
        ],
      },
    );

    this._analyticsClient.setTenantInfo(
      tenantType.CLOUD_ID,
      this.state.tenantId,
    );
    this._analyticsClient.setUserInfo(
      userType.ATLASSIAN_ACCOUNT,
      this.state.userId,
    );
    this._analyticsClient.setOrgInfo('137c12f9-b892-494d-a682-20d6483f1d33');

    const mockOriginFn = (encodedOrigin) => {
      const dict = { id: encodedOrigin, product: 'jira' };
      return {
        originTracingAttributes: { id: dict.id, product: dict.product },
        taskSessionId: dict.id,
      };
    };

    this._analyticsClient.setOriginTracingHandlers({
      [originTracingType.ATL_ORIGIN]: (encodedOrigin) => mockOriginFn(encodedOrigin),
    });
    this._analyticsClient.task.stripQueryParameters();

    this._analyticsClient.startUIViewedEvent((event) => {
      // eslint-disable-next-line no-console
      console.log('ui viewed event sent', event);
    });

    window.analyticsClient = this._analyticsClient;
  }

  // eslint-disable-next-line react/state-in-constructor
  state = {
    subproduct: defaultSubproduct,
    tenantId: defaultTenantId,
    userId: defaultUserId,
    itemsToAddToGuardProduct: 6000,
    itemsToAddToExampleProduct: 6000,
  };

  componentWillMount() {
    this.fireScreenEvent();
    this.trackApdexInitialLoadEvent();
  }

  onEvent = (analyticsId, analyticsData) => {
    this._analyticsClient.onEvent(analyticsId, analyticsData);
  };

  onStartApdexEvent = (...args) => {
    this._analyticsClient.startApdexEvent(...args);
  };

  onStopApdexEvent = (...args) => {
    this._analyticsClient.stopApdexEvent(...args);
  };

  onStartEmbeddedExperience = () => {
    this._analyticsClient.setEmbeddedProduct('someEmbeddedProduct');
  };

  onStopEmbeddedExperience = () => {
    this._analyticsClient.clearEmbeddedProduct();
  };

  onResetUiViewed = () => {
    window.localStorage.removeItem('awc.ui.viewed.last.sent');
  };

  onSwitchSubproduct = () => {
    const newSubproduct = this.state.subproduct === defaultSubproduct
      ? 'anotherSub'
      : defaultSubproduct;
    this._analyticsClient.setSubproduct(newSubproduct);
    this.setState({ subproduct: newSubproduct });
  };

  onSwitchUserId = () => {
    const newUserId = this.state.userId === defaultUserId
      ? `another${defaultUserId}`
      : defaultUserId;
    this._analyticsClient.setUserInfo(userType.ATLASSIAN_ACCOUNT, newUserId);
    this.setState({ userId: newUserId });
  };

  onSwitchTenantId = () => {
    const newTenantId = this.state.tenantId === defaultTenantId
      ? `another${defaultTenantId}`
      : defaultTenantId;
    this._analyticsClient.setTenantInfo(tenantType.CLOUD_ID, newTenantId);
    this.setState({ tenantId: newTenantId });
  };

  onSetUIViewedAttributes = () => {
    this._analyticsClient.setUIViewedAttributes({
      solutionDetails: 'solutionA',
      extraDetails: {
        extraStuff: '123',
      },
    });
  };

  onClearUIViewedAttributes = () => {
    this._analyticsClient.clearUIViewedAttributes();
  };

  trackApdexInitialLoadEvent = () => {
    const shouldTrack = window.location.search.indexOf('apdex=true') > -1;
    if (shouldTrack) {
      this._analyticsClient.stopApdexEvent({
        task: 'autoTrackInitialLoad',
        type: apdexType.INITIAL_LOAD,
      });
    }
  };

  fireUiEvent = () => {
    const highPriority = this.prioritySelector
      ? this.prioritySelector.value === 'high'
      : undefined;
    this._analyticsClient.sendUIEvent({
      containerType: 'project',
      containerId: '45',
      containers: {
        project: {
          id: '45',
          type: 'software',
          somethingExtra: 'will_be_ignored',
        },
      },
      objectType: 'issue',
      objectId: '12',
      source: 'rapidboard',
      actionSubject: 'button',
      action: 'clicked',
      actionSubjectId: 'issueQuickCreateButton',
      highPriority,
      attributes: {
        videoLength: 30,
      },
      tags: ['measurement'],
    });
  };

  fireScreenEvent = () => {
    const highPriority = this.prioritySelector
      ? this.prioritySelector.value === 'high'
      : undefined;
    this._analyticsClient.sendScreenEvent(
      {
        name: 'test',
        highPriority,
        attributes: {
          attribute1: 1,
        },
        containers: {
          screenEventContainer: {
            id: '1234',
            type: 'testScreen',
            somethingExtra: 'will_be_ignored',
          },
        },
        tags: ['myTag'],
      },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      () => {},
    );
  };

  fireOperationalEvent = () => {
    const highPriority = this.prioritySelector
      ? this.prioritySelector.value === 'high'
      : undefined;
    this._analyticsClient.sendOperationalEvent({
      containerType: 'project',
      containerId: '45',
      objectType: 'issue',
      objectId: '12',
      source: 'backlog',
      actionSubject: 'editor',
      action: 'initialised',
      actionSubjectId: 'commentEditor',
      highPriority,
      attributes: {
        videoLength: 30,
      },
      tags: ['measurement'],
    });
  };

  fireTrackEvent = () => {
    const highPriority = this.prioritySelector
      ? this.prioritySelector.value === 'high'
      : undefined;
    this._analyticsClient.sendTrackEvent({
      source: 'testPage',
      action: 'clicked',
      actionSubject: 'link',
      highPriority,
      containers: {
        trackEventContainer: {
          id: '1234',
          type: 'testTrack',
        },
      },
      tags: ['measurement'],
    });
  };

  fireIdentifyEvent = () => {
    this._analyticsClient.sendIdentifyEvent(
      userType.ATLASSIAN_ACCOUNT,
      '65544:12313',
    );
  };

  randomValue = (arr) => arr[Math.floor(Math.random() * arr.length)];

  fireCompressibleFeatureExposedEvent = () => {
    const highPriority = this.prioritySelector
      ? this.prioritySelector.value === 'high'
      : undefined;
    this._analyticsClient.sendOperationalEvent({
      action: 'exposed',
      actionSubject: 'feature',
      source: 'testPage',
      tags: ['measurement'],
      highPriority,
      attributes: {
        flagKey: this.randomValue(['flag.a', 'flag.b', 'flag.c']),
        value: this.randomValue(['control', 'variation1', 'variation2']),
      },
    });
  };

  startDelayingLowPriorityEvents = () => {
    this._analyticsClient.startLowPriorityEventDelay();
  };

  startDelayingLowPriorityEventsWithTimeout = () => {
    this._analyticsClient.startLowPriorityEventDelay(5000);
  };

  stopDelayingLowPriorityEvents = () => {
    this._analyticsClient.stopLowPriorityEventDelay();
  };

  sendEventAndNavtigateAway = () => {
    this._analyticsClient.sendOperationalEvent({
      action: 'sendBeforeUnload',
      actionSubject: 'event',
      source: 'testPage',
    });
    window.location.href = 'https://www.atlassian.com';
  };

  repeatXTimes = async (perfTask, count = 80, cleanup, pause)  => {
    const results = [];
    for (let i = 0; i < count; i++) {
      if (cleanup) {
        cleanup();
      }
      const start = window.performance.now();
      perfTask();
      results.push(window.performance.now() - start);
      await this.waitawhile(pause);
    }
    return results;
  }

  waitawhile = (pause) => {
    if (pause) {
      return new Promise(resolve => {
        setTimeout(resolve, pause);
      });
    }
    return Promise.resolve();
  }

  fire1040Events = () => {
    return new Promise((resolve) => {
      let results = [];
      const sendEvents = async () => {
        const res80 = await this.repeatXTimes(this.fireTrackEvent, 80);
        results = results.concat(res80);
        if (results.length < 1000) {
          setTimeout(sendEvents, 600);
        } else {
          resolve(results);
        }
      }
      sendEvents();
    });
  }

  reportIndexedDbEventLimit = () => {
    reportIndexedItemsByProduct();
  }

  populateIndexedDbEventLimit = async () => {
    // Using two AWC clients to simulate writing of events to IndexedDB from two products
    // Client 1: product name is `example`
    // Client 2: product name is `custom-product`

    // Can write a lot of events from each product, but we expect only 5,000 events.
    // For example, try adding 6,000 of each.
    const temporaryClient = createCustomAWCClient();

    // eslint-disable-next-line no-console
    console.log(`${consoleLogTag} Starting to populate IndexedDB (example: ${this.state.itemsToAddToExampleProduct}, guard: ${this.state.itemsToAddToGuardProduct}); Please wait, this may take a few seconds for large event sizes`);

    const fireNEvents = (eventToFire) => {
      return new Promise(function innerFunc(resolve) {
        setImmediate(() => resolve(eventToFire()));
      });
    }

    const promise1 = [];
    for(let i = 0; i < parseInt(this.state.itemsToAddToExampleProduct, 10); i++) {
      promise1.push(fireNEvents(this.fireTrackEvent));
    }

    const promise2 = [];
    for(let i = 0; i < parseInt(this.state.itemsToAddToGuardProduct, 10); i++) {
      promise2.push(fireNEvents(() => fireTrackEventFromClient(temporaryClient)));
    }

    await Promise.all([Promise.all(promise1), Promise.all(promise2)]);

    // eslint-disable-next-line no-console
    console.log(`${consoleLogTag} Done populating. You may click on Report button to get count of items by product in IndexedDb.`)
  }


  compareNum = (a, b) => {
    if (a < b) {
      return -1;
      // Why on earth is it being silly
      // eslint-disable-next-line
    } else if (a > b) {
      return 1;
    }
    return 0;
  }

  percentile = (percentile, sortedArr) =>
    sortedArr[Math.floor(sortedArr.length * (percentile / 100))];

  computeResults = async (results) => {

    const copyResults = [
      ...results
    ];
    // eslint-disable-next-line no-console
    console.log('Raw results:', copyResults);

    results.sort(this.compareNum);

    const sum = results.reduce((arr, curr) => arr + curr);
    const avg = sum / results.length;

    const min = results[0];
    const max = results[results.length-1];
    const median = this.percentile(50, results);
    const percentile90th = this.percentile(90, results);
    const percentile99th = this.percentile(99, results);

    const formattedResults = {
      min,
      avg,
      '50th-percentile': median,
      '90th-percentile': percentile90th,
      '99th-percentile': percentile99th,
      max,
      samples: results.length,
    };

    // eslint-disable-next-line
    console.log(`Results are in: ${JSON.stringify(formattedResults)}. All numbers are in milliseconds.`);
  }

  handleTextChange = (event, src) => {
    this.setState({[src]: event.target.value});
  }

  fireBulkAndGatherResults = async () => {
    const results = await this.fire1040Events();
    this.computeResults(results);
  }

  createAbandondedQueue = async () => {
    createAbandonedQueue('awc-dev', 50);
  }

  createPurgableQueue = async () => {
    createPurgableQueue('awc-dev');
  }

  render() {
    return (
      <div>
        <AnalyticsListener onEvent={this.onEvent} matchPrivate>
          <AnalyticsDecorator data={{ source: 'main' }} matchPrivate>
            <Video />
          </AnalyticsDecorator>
        </AnalyticsListener>
        <Apdex
          onStartApdexEvent={this.onStartApdexEvent}
          onStopApdexEvent={this.onStopApdexEvent}
          getStartApdex={this._analyticsClient.getApdexStart}
        />
        <div>
          <h3>Links</h3>
          <a target="_blank" href="/?apdex=true">
            Cmd+Click to open in new inactive tab
          </a>
          <p>
            <ChangePageLink client={this._analyticsClient} />
          </p>
          <p>
            <TaskSessionLink client={this._analyticsClient} />
          </p>
          <p>
            <OriginTracingLink />
          </p>
        </div>
        <div>
          <h3>Embedded Experience</h3>
          <button onClick={this.onStartEmbeddedExperience}>Start</button>
          <button onClick={this.onStopEmbeddedExperience}>Stop</button>
        </div>
        <div>
          <h3>UI viewed</h3>
          <p>
            <button onClick={this.onResetUiViewed}>Reset</button>
          </p>
          <p>
            <button onClick={this.onSwitchSubproduct}>
              Switch subproduct, current subproduct:
              {' '}
              {this.state.subproduct}
            </button>
          </p>
          <p>
            <button onClick={this.onSwitchTenantId}>
              Switch tenant id, current tenantId:
              {' '}
              {this.state.tenantId}
            </button>
          </p>
          <p>
            <button onClick={this.onSwitchUserId}>
              Switch user id, current userId:
              {' '}
              {this.state.userId}
            </button>
          </p>
          <p>
            <button onClick={this.onSetUIViewedAttributes}>
              Add attributes
            </button>
            <button onClick={this.onClearUIViewedAttributes}>
              Clear attributes
            </button>
          </p>
        </div>
        <div>
          <h3>On-demand event</h3>
          <p>
            <label htmlFor="priority">Priority: </label>
            <select
              name="priority"
              defaultValue="low"
              ref={(elem) => {
                this.prioritySelector = elem;
              }}
            >
              <option value="high">High</option>
              <option value="low">Low</option>
            </select>
          </p>
          <button onClick={this.fireUiEvent}>UI Event</button>
          <button onClick={this.fireScreenEvent}>Screen Event</button>
          <button onClick={this.fireOperationalEvent}>
            Operational Event
          </button>
          <button onClick={this.fireTrackEvent}>Track Event</button>
          <button onClick={this.fireIdentifyEvent}>Identify Event</button>
        </div>
        <div>
          <h3>Delayed processing of low-priority events</h3>
          <p>
            <button onClick={this.startDelayingLowPriorityEvents}>
              Start with no timeout
            </button>
            <button onClick={this.startDelayingLowPriorityEventsWithTimeout}>
              Start with 5s timeout
            </button>
            <button onClick={this.stopDelayingLowPriorityEvents}>Stop</button>
          </p>
          <p>
            <button onClick={this.fireCompressibleFeatureExposedEvent}>
              Fire compressible event
            </button>
          </p>
        </div>
        <div>
          <h3>Testing event loss on navigation</h3>
          <p>
            <button onClick={this.sendEventAndNavtigateAway}>
              Fire event and navigate away
            </button>
          </p>
        </div>
        <div>
          <h3>Performance stuff</h3>
          <p>
            <button onClick={this.fireBulkAndGatherResults}>
              Fire 1040 events and get results in console
            </button>
          </p>
        </div>
        <div>
          <h3>IndexedDB Event Limit test</h3>
          Instructions:
            <ul>
              <li><b>CAUTION! Please block network traffic to: api-private.stg.atlassian.com/gasv3/api/v1/batch before doing this.</b></li>
              <li>`Populate IndexedDB` button adds 12,000 events to the IndexedDb object store.</li>
              <li>`Report` button should show 5,000 products each for products: `example` and `guard` as this currently the defined limit in AWC</li>
              <li>`Clear IndexedDB` button will empty the contents of IndexedDb object store.</li>
            </ul>
          <p>
            <br/>
            <label htmlFor="itemsToAddToExampleProduct">Items to add for `example` product:</label>
            <input type="text" id="itemsToAddToExampleProduct" value={this.state.itemsToAddToExampleProduct} onChange={(evt) => this.handleTextChange(evt, 'itemsToAddToExampleProduct')}/>
            <br/>
            <label htmlFor="itemsToAddToGuardProduct">Items to add for `guard` product:</label>
            <input type="text" id="itemsToAddToGuardProduct" value={this.state.itemsToAddToGuardProduct}  onChange={(evt) => this.handleTextChange(evt, 'itemsToAddToGuardProduct')}/>
            <br/>
            <button onClick={this.populateIndexedDbEventLimit}>Populate IndexedDB</button>
            &nbsp;
            <button onClick={reportIndexedItemsByProduct}>Report</button>
            &nbsp;
            <button onClick={clearIndexedDb}>Clear IndexedDB</button>
          </p>
        </div>
        <div>
          <h3>LocalStorage testing</h3>
          <button onClick={this.createAbandondedQueue}>Create abandonded queue</button>
          &nbsp;
          <button onClick={this.createPurgableQueue}>Create purgable queue</button>
        </div>
      </div>
    );
  }
}
