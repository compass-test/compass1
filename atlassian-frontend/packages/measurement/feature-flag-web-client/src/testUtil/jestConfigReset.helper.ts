// This so that we can use it to connect to Nock server using node.
// The root jest config is using this, import { XMLHttpRequest } from 'xmlhttprequest';
// which breaks our Nock scopes.
// @ts-ignore
global.XMLHttpRequest = global.realXMLHttpRequest;
