// eslint-disable-next-line import/no-extraneous-dependencies
import MockDate from 'mockdate';

// This so that we can use it to connect to Nock server using node.
// The root jest config is using this, import { XMLHttpRequest } from 'xmlhttprequest';
// which breaks our Nock scopes.
// @ts-ignore
global.XMLHttpRequest = global.realXMLHttpRequest;

// Right now, the root jest config sets it as a constant.
// However, We are mocking dates and advancing time using jest which seems to interfere with MockDate.
// Resetting, before we run our tests gets around the issue.
MockDate.reset();
