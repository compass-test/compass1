import { v4 as uuid } from 'uuid';

export const createAbandonedQueue = (queuePrefix, numEvents) => {
  const queue = [];
  const inProgress = {};
  for (let i = 0; i < numEvents; i++) {
    queue.push({
      id: uuid(),
      item: createEvent(),
      time: Date.now(),
    });
    inProgress[uuid()] = {
      item: createEvent(),
      time: Date.now(),
    };
  }
  const mockId = uuid();
  const storageKeyPrefix = `${queuePrefix}.${mockId}`;
  // Queue will be reclaimed when `ack` is older than 10 seconds
  localStorage.setItem(`${storageKeyPrefix}.ack`, Date.now().toString());
  localStorage.setItem(`${storageKeyPrefix}.inProgress`, JSON.stringify(inProgress));
  localStorage.setItem(`${storageKeyPrefix}.queue`, JSON.stringify(queue));
  localStorage.setItem(`${storageKeyPrefix}.reclaimStart`, null);
  localStorage.setItem(`${storageKeyPrefix}.reclaimEnd`, null);
};

export const createPurgableQueue = (queuePrefix) => {
  const mockId = uuid();
  const storageKeyPrefix = `${queuePrefix}.${mockId}`;
  // No `ack` is how we know if a queue should be purged
  localStorage.setItem(`${storageKeyPrefix}.inProgress`, '{}');
  localStorage.setItem(`${storageKeyPrefix}.queue`, '[]');
  localStorage.setItem(`${storageKeyPrefix}.reclaimStart`, null);
  localStorage.setItem(`${storageKeyPrefix}.reclaimEnd`, null);
};

const createEvent = () => {
  return    {
  "url": "https://api-private.stg.atlassian.com/gasv3/api/v1/t",
  "headers": {
      "Content-Type": "text/plain"
  },
  "msg": {
      "timestamp": "2021-09-10T07:32:27.271Z",
      "context": {
          "locale": "en-US",
          "screen": {
              "width": 2560,
              "height": 1440,
              "density": 1
          },
          "library": {
              "name": "analytics.js",
              "version": "3.5.4"
          },
          "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:91.0) Gecko/20100101 Firefox/91.0"
      },
      "integrations": {},
      "properties": {
          "env": "dev",
          "product": "example",
          "subproduct": "sub",
          "version": "1.0.0",
          "origin": "web",
          "platform": "web",
          "tenantIdType": "cloudId",
          "tenantId": "65511:bbbba5154-51f2-44c5-a72b-a14a06add13b",
          "orgId": "137c12f9-b892-494d-a682-20d6483f1d33",
          "userIdType": "atlassianAccount",
          "containerType": "project",
          "containerId": "45",
          "source": "backlog",
          "objectType": "issue",
          "objectId": "12",
          "actionSubject": "editor",
          "action": "initialised",
          "actionSubjectId": "commentEditor",
          "attributes": {
              "videoLength": 30
          },
          "tags": [
              "measurement"
          ],
          "highPriority": false,
          "eventType": "operational",
          "tabId": "a3762d45-d207-4135-8488-fc968977f25a",
          "sessionId": "1631256665021",
          "taskSessions": {
              "my-task-session": "30a9228c-92ee-46ee-b5e6-40dff0a6aa7f"
          }
      },
      "event": "editor initialised",
      "messageId": "ajs-9e34cf953e3f6644187df9e2cc9b5bcf",
      "anonymousId": "dccadddb-81f7-4904-bcb2-70bbf477804b",
      "type": "track",
      "writeKey": "",
      "userId": "DUMMY-123123123",
      "sentAt": "2021-09-10T07:33:51.250Z",
      "_metadata": {
          "bundled": [
              "BeforeSend",
              "Segment.io"
          ],
          "unbundled": [
              "Amplitude"
          ],
          "failedAttempts": 2
        }
      }
  };
}
