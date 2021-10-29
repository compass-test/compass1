/* eslint-disable import/no-unresolved */
import AnalyticsWebClient, { CompressionRule, envType, originType, ResilienceMechanism, } from '../dist/esm'

const consoleLogTag = "IndexedDB Event Limit test::";

// Helper function to report items broken by in AWC object store by product.
function displayDataByIndex(db) {
  const transaction = db.transaction(['analytics-resilience'], 'readonly');
  const objectStore = transaction.objectStore('analytics-resilience');

  const objectStoreCountRequest = objectStore.count();
  const myIndex = objectStore.index('product-timeAdded');

  const product1 = 'custom-product';
  const product2 = 'example';

  const product1keyRangeValues = IDBKeyRange.bound([product1, 0], [product1, Date.now()])
  const product2keyRangeValues = IDBKeyRange.bound([product2, 0], [product2, Date.now()])

  const product1FirstItemRequest = myIndex.get(product1keyRangeValues);
  const product2FirstItemRequest = myIndex.get(product2keyRangeValues);
  const product1CountItemRequest = myIndex.count(product1keyRangeValues);
  const product2CountItemRequest = myIndex.count(product2keyRangeValues);

  // eslint-disable-next-line no-console
  console.log(`${consoleLogTag} Starting to count, please wait.`);

  objectStoreCountRequest.onsuccess = function(event) {
    // eslint-disable-next-line no-console
    console.log(`${consoleLogTag} Total events in object store: ${event.target.result}`)
  }

  product1FirstItemRequest.onsuccess = function(event) {
    if (event.target.result && event.target.result.id && event.target.result.timeAdded) {
      // eslint-disable-next-line no-console
      console.log(`${consoleLogTag} ${product1} first item: ${JSON.stringify({id: event.target.result.id, timeAdded: event.target.result.timeAdded}, null, 4)}`);
    } else {
      // eslint-disable-next-line no-console
      console.warn(`${consoleLogTag} ${product1} no item found`)
    }
  };

  product2FirstItemRequest.onsuccess = function(event) {
    if (event.target.result && event.target.result.id && event.target.result.timeAdded) {
      // eslint-disable-next-line no-console
      console.log(`${consoleLogTag} ${product2} first item: ${JSON.stringify({id: event.target.result.id, timeAdded: event.target.result.timeAdded}, null, 4)}`);
    } else {
      // eslint-disable-next-line no-console
      console.warn(`${consoleLogTag} ${product1} no item found`)
    }
  };

  product1CountItemRequest.onsuccess = function(event) {
    // eslint-disable-next-line no-console
    console.log(`${consoleLogTag} ${product1} count of items: ${JSON.stringify(event.target.result, null, 4)}`);
  };

  product2CountItemRequest.onsuccess = function(event) {
    // eslint-disable-next-line no-console
    console.log(`${consoleLogTag} ${product2} count of items: ${JSON.stringify(event.target.result, null, 4)}`);
  };
};

// Creates a new AWC client with the product set as `custom-product`.
function createCustomAWCClient() {
  return new AnalyticsWebClient(
    {
      env: envType.DEV,
      product: 'custom-product',
      subproduct: 'sub',
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
}

// Test track event fired for AWC.
const fireTrackEventFromClient = (client, prioritySelector) => {
  const highPriority = prioritySelector ? prioritySelector.value === 'high': undefined;
  client.sendTrackEvent({
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


const clearIndexedDb = () => {
  let db;

  const DBOpenRequest = window.indexedDB.open('analytics-web-client', 1);
  DBOpenRequest.onsuccess = function() {
    db = DBOpenRequest.result;
    const transaction = db.transaction(['analytics-resilience'], 'readwrite');
    const objectStore = transaction.objectStore('analytics-resilience');
    objectStore.clear();
    // eslint-disable-next-line no-console
    console.log(`${consoleLogTag} Cleared all items in IndexedDb object store`)
  };
}

const reportIndexedItemsByProduct = () => {
  let db;
  const DBOpenRequest = window.indexedDB.open('analytics-web-client', 1);
  DBOpenRequest.onsuccess = function() {
    db = DBOpenRequest.result;
    displayDataByIndex(db);
  };
}


export {
  displayDataByIndex,
  fireTrackEventFromClient,
  createCustomAWCClient,
  clearIndexedDb,
  reportIndexedItemsByProduct,
  consoleLogTag
}
