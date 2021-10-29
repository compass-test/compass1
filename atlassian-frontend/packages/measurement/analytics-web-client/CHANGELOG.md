# Change log

## 3.6.4

### Patch Changes

- [`5e5ef9fd780`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5e5ef9fd780) - Internal: Small fixes to event mismatch detection.
  Added @segment/isodate-traverse to keep date format consistency in GASv3 events.
  Internal: Fixed NaN !== NaN in mismatch detection, and fixed object vs null detection

## 3.6.3

### Patch Changes

- [`e68791d7936`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e68791d7936) - Refactored XID from analyticsWebclient to a separate class and pieces of integration moved to AttachedXID class. Couple of additional tests were added.

## 3.6.2

### Patch Changes

- [`b85e7ce12cd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b85e7ce12cd) - Internal upgrade of memoize-one to 6.0.0

## 3.6.1

### Patch Changes

- [`605ca1a6fa5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/605ca1a6fa5) - Internal: Ignoring context.campaign when comparing events in both processors.

## 3.6.0

### Minor Changes

- [`1b954d00438`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1b954d00438) - Added `pageLoadId` as a top-level property to ui, track, operational and screen events

## 3.5.29

### Patch Changes

- [`1881cb8ed10`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1881cb8ed10) - Internal: Added function to detect TLD for anonymous user cookie.

## 3.5.28

### Patch Changes

- [`484ce36edaa`](https://bitbucket.org/atlassian/atlassian-frontend/commits/484ce36edaa) - Internal: Read and write anonymous user id from cookie as well as localstorage

## 3.5.27

### Patch Changes

- [`409c1e8d1e0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/409c1e8d1e0) - Wired up new eventProcessor to run and compare events when in non-prod environments

## 3.5.26

### Patch Changes

- [`c0005811958`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c0005811958) - Internal: Added new batch queue to allow for testing of new transformer in staging.

## 3.5.25

### Patch Changes

- [`ffc5c3bc223`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ffc5c3bc223) - Internal: Adding transformUUID to allow comparsion of events after transformation in non-prod envs

## 3.5.24

### Patch Changes

- [`5214d294cd2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5214d294cd2) - Moved frozen objects to enums. Added new event processor to eventually replace segment core

## 3.5.23

### Patch Changes

- [`1ec11ff7c86`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1ec11ff7c86) - Internal: Added user object

## 3.5.22

### Patch Changes

- [`4ac0c9d069c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4ac0c9d069c) - Internal: Updated SafeStorage to allow access to global localstorage namespace with options

## 3.5.21

### Patch Changes

- [`20802084bce`](https://bitbucket.org/atlassian/atlassian-frontend/commits/20802084bce) - Adding JSON.parse(JSON.stringify(event)) to new resilience mechanism path.

## 3.5.20

### Patch Changes

- [`f82a0bc7703`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f82a0bc7703) - Add metrics for event retryAtempts.

## 3.5.19

### Patch Changes

- [`2bd84f75ad1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2bd84f75ad1) - Internal: Increased Indexeddb connection timeout to 15 seconds to prevent falling back to memory premptively.

## 3.5.18

### Patch Changes

- [`92befd1644d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/92befd1644d) - Debounce setting sessionExpiry in localstorage for more speed improvements.

## 3.5.17

### Patch Changes

- [`940fb211af6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/940fb211af6) - Made creating events faster. Removed obsolete code.  
  Fixed bug in sending events which can cause event duplication when offline.

## 3.5.16

### Patch Changes

- [`1d297b75e96`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1d297b75e96) - Prevent failover from running multiple times if Indexeddb fails.

## 3.5.15

### Patch Changes

- [`abbbc497a04`](https://bitbucket.org/atlassian/atlassian-frontend/commits/abbbc497a04) - Fixed some types with productInfo for version and locale

## 3.5.14

### Patch Changes

- [`5e498485ac7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5e498485ac7) - Internal: Moving files around. No functional changes

## 3.5.13

### Patch Changes

- [`ff8e8a77526`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ff8e8a77526) - Internal: Fail indexeddb connection if it takes longer than 2 seconds.

## 3.5.12

### Patch Changes

- [`5ac740fc256`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5ac740fc256) - Internal: Added hooks for new resilience mechanism to metrics collector.

## 3.5.11

### Patch Changes

- [`6706f6cc3d2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6706f6cc3d2) - Internal: Added mechanism for events to be sent immediatly for low volume products only

## 3.5.10

### Patch Changes

- [`8cf8a2d9dc2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8cf8a2d9dc2) - Only available with the beta resilience mechanism:

  - Detect network changes and prevent network requests when offline.

## 3.5.9

### Patch Changes

- [`6b87e6414b6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6b87e6414b6) - Internal: Fixed items only being attempted maxAttempts count times in new resilienceMechanism.

## 3.5.8

### Patch Changes

- [`0045ef8d17e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0045ef8d17e) - Internal: Extended APIs of new resilienceMechanism to allow for reporting on deleted events.

## 3.5.7

### Patch Changes

- [`62452b122c1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/62452b122c1) - Internal: Changed Indexeddb index from product to namespace

## 3.5.6

### Patch Changes

- [`ee7c9061baf`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ee7c9061baf) - Internal: Adding simple test setup for milestone 2 of AsynWrites project. Small bug fix in reclaim function.

## 3.5.5

### Patch Changes

- [`da6ab9533ed`](https://bitbucket.org/atlassian/atlassian-frontend/commits/da6ab9533ed) - Added ability for events from localstorage to be reclaimed while using indexeddb

## 3.5.4

### Patch Changes

- [`5f6cfa27a60`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f6cfa27a60) - IndexedDB limit enforced by product

## 3.5.3

### Patch Changes

- [`849f71d49fd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/849f71d49fd) - Internal: Replaced devDependency jest-mock-date in favour of mockdate

## 3.5.2

### Patch Changes

- [`72c3b67c290`](https://bitbucket.org/atlassian/atlassian-frontend/commits/72c3b67c290) - Indexeddb respects maxAttempts configuration for events in resilienceMechanism.

## 3.5.1

### Patch Changes

- [`af7a17dd919`](https://bitbucket.org/atlassian/atlassian-frontend/commits/af7a17dd919) - Moved to use single event limit default for both resilience mechanisms.

## 3.5.0

### Minor Changes

- [`47fc0f52629`](https://bitbucket.org/atlassian/atlassian-frontend/commits/47fc0f52629) - Added Halp as a valid userIdType

## 3.4.2

### Patch Changes

- [`9495c244165`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9495c244165) - Added product as a requirement for RelianceDb; Passing the properoty from constructor of AWC all the way down

## 3.4.1

### Patch Changes

- [`2d0ad12073a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2d0ad12073a) - Output in CJS folder in dist is not valid CJS. Pointing to dist/analytics-web-client.js for commonjs.

## 3.4.0

### Minor Changes

- [`07b9d5602f4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/07b9d5602f4) - AWC now has a limit on the of 5000 events in place when running in IndexedDB mode, should we hit said limit, we should evict the oldest events in the object store to make space for the new ones.

## 3.3.2

### Patch Changes

- [`67e6f7fdb72`](https://bitbucket.org/atlassian/atlassian-frontend/commits/67e6f7fdb72) - Internal: Added resilienceOptions for allowing options to be passed into memory and indexeddb resilience mechanisms

## 3.3.1

### Patch Changes

- [`f8588ec84c2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f8588ec84c2) - Added memory backup storage for new resilience mechanism

## 3.3.0

### Minor Changes

- [`21d05d4a88f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/21d05d4a88f) - BETA: Added option to use indexeddb instead of localstorage

## 3.2.0

### Minor Changes

- [`99f21ca49a0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/99f21ca49a0) - Scheduler can now wrap callbacks with a callbackTimeoutPeriod parameter

## 3.1.5

### Patch Changes

- [`524b20aff9a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/524b20aff9a) - Update package.jsons to remove unused dependencies. Also excludes tests from some build tsconfigs
- [`3c0349f272a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3c0349f272a) - Update package.jsons to remove unused dependencies. Also excludes tests from some build tsconfigs
- [`591d34f966f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/591d34f966f) - Update package.jsons to remove unused dependencies. Also excludes tests from some build tsconfigs

## 3.1.4

### Patch Changes

- [`290cbc5bcd7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/290cbc5bcd7) - Renamed internals with indexdb to indexeddb

## 3.1.3

### Patch Changes

- [`eb922bc901b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/eb922bc901b) - Added PullBatchableQueue to work with new indexeddbconnector

## 3.1.2

### Patch Changes

- [`66acf08b5a6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/66acf08b5a6) - Added class to store items in indexeddb

## 3.1.1

### Patch Changes

- [`e269cddce32`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e269cddce32) - Added types for analytics-web-client constructor

## 3.1.0

### Minor Changes

- [`dcd4b6bbbd0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/dcd4b6bbbd0) - Added option to flush events in the cache before unloading from the page. See readme for when and how to use it.

## 3.0.0

### Major Changes

- [`3a694208cd9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3a694208cd9) - Changed default destination of analytics events to use Stargate Proxy.
  This will use `/gateway/api/gasv3/api/v1` on the current domain to send events to prevent browsers blocking cookies.
  For more info, see: https://hello.atlassian.net/wiki/spaces/I/pages/1217206437/api-private+is+broken+is+your+product+impacted
  Or talk to the MEP team in #help-measurement
  If you wish to use the previous behaviour, pass `useLegacyUrl: true` through the settings object.

  This will not affect your usage if:

  - You were only loaded on one of the following domains `['.atlassian.net','.jira.com','.jira-dev.com','admin.atlassian.com','admin.stg.atlassian.com']`
  - You specify your own `apiHost` in settings, or
  - You specifically set `useStargate` to false.

## 2.2.4

### Patch Changes

- [`adc6bb54898`](https://bitbucket.org/atlassian/atlassian-frontend/commits/adc6bb54898) - Added more metrics to metadata to track number of events processed by the client

## 2.2.3

### Patch Changes

- [`5e4df920aa1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5e4df920aa1) - Added a resolution to set is-email to v1.0.1 to fix a security vulnerability in the with-deps build artefact

## 2.2.2

### Patch Changes

- [`f85369ebef8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f85369ebef8) - Bump version of @segment/analytics.js-integration to patch domify vulnerability

## 2.2.1

### Patch Changes

- [`d77a1cb64d0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d77a1cb64d0) - Fixed version sent with each event to stay up to date with package version

## 2.2.0

### Minor Changes

- [`69ad78110dd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/69ad78110dd) - Added event payload types for sendUIEvent, sendScreenEvent, sendOperationalEvent and sendTrackEvent

## 2.1.7

### Patch Changes

- [`15ae792a556`](https://bitbucket.org/atlassian/atlassian-frontend/commits/15ae792a556) - Migrated to Atlassian Frontend. Some dependency versions were matched to that available in atlassian frontend.

## 2.1.7

Synchronise versions between `analytics-web-client` and `atlassian-frontend`. [See this commit for breakdown of changes](https://bitbucket.org/atlassian/analytics-web-client/commits/3bfd2b9eedca26ad3a182828f575a63e30629052)

Highlights: typescript (^4.1.5 -> 3.9.6) and webpack (^5.21.2 -> ^4.41.3) downgrade.

Updated Readme.md to match `atlassian-frontend` tooling.
Removed project specific files: .babelrc, .eslintrc, .nvmrc, .yarnrc, security-assistant.yml, srcclr.yml

## 2.1.6

Change `tsconfig.json` compilerOptions > module from ES6 to CommonJS.

## 2.1.5

No changes.
Synched `CHANGELOG.md` between 1.x_releases and 2.x_releases streams.

## 2.1.4

Bump version of @segment/localstorage-retry to attempt fixes for CPU and RAM issues.

## 2.1.3

Improve performance by reading the `atlassian_analytics_debug` cookie value once when the client is initialised, rather than every time an event is fired.

## 2.1.2

Fixed bug associated with deleting from empty taskSessions

## 2.1.1

No changes.
Added repository owner to the security assistant configuration.

## 2.1.0

Migrated code to TypeScript. Bumped Babel, Jest, and few dependencies.
Bundle size have reduced by ~20-25%.

## 2.0.0-beta

No changes.
Build tool chain reworked, major version bumps of node (8->12) and webpack (3->5)

## 1.14.5

Bump version of @segment/localstorage-retry to attempt fixes for CPU and RAM issues.

## 1.14.4

Improve performance by reading the `atlassian_analytics_debug` cookie value once when the client is initialised, rather than every time an event is fired.

This change was back-ported from v2.1.3, so it is _not_ included in versions 2.1.0, 2.1.1 or 2.1.2.

## 1.14.3

Retry event processing when there is no network connection

## 1.14.2

Prevent sending of duplicated events.

## 1.14.1

Additional tests added to source code.

## 1.14.0

Add support for custom event compression rules.

This is an extension of the experimental delay queue functionality which is still limited to `measurement` events in this release.

## 1.13.1

Updated client to send metadata with requests to provide GASv3 with an insight into the healthiness of the client.

## 1.13.0

Add support for delaying the processing of low-priority events in performance-critical sections.

This is an experimental feature that is limited to `measurement` events with this release.

Bump trim version in order to address a security vulnerability.

## 1.12.5

Made cookies secure if protocol is secure.

## 1.12.0

Add support to set attributes which will be added to `ui viewed` events

## 1.11.5

Bump @segment/localstorage-retry to the latest verison.
This aims to fix issues with localStorage filling up and not being deleted.

## 1.11.1

Bump @atlassian/atl-cross-domain-tracking to the latest version.

## 1.11.0

Add support for cross domain tracking, use `settings.xidConsent` flag on AnalyticsWebClient init to control it.

## 1.10.4

Attach `name` attribute to the event payload passed through to the callback when calling `sendScreenEvent`

## 1.10.3

Update README.md to fix invalid container IDs in example code snippets

## 1.10.2

Update analytics-service URL for staging

## 1.10.1

Update README.md to include information on analytics-web-client package with dependencies

## 1.10.0

All events are batched.

## 1.9.7

Added purge for broken localStorage keys.

## 1.9.6

Added LICENSE file.

## 1.9.5

Pin segment analytics to avoid @segment/cookies 404 error.

## 1.9.4

Improved example app to test compiled code.

## 1.9.3

Added webpack bundle analyzing for distribution bundles.

## 1.9.2

Fix import path causing compilation errors.

## 1.9.1 (Broken)

Added tag to synthetic events in order to distinguish between real and synthetic events, generated by pollinator.

## 1.9.0 (Broken)

Added support for custom history replace function.

## 1.8.11

Added support for Admin Stargate Gateway

## 1.8.10

Fixed issue in batching scheduler which would break the processing of events.

## 1.8.9

Bumped dependency `debug` to remove security vulnerability.

## 1.8.6

Bundled a new ES module distribution enabling improved tree shaking for webpack consumers.

## 1.8.1

Removed use of `.includes()` causing issues in IE11.

## 1.8.0

Added new `containers` API to Screen, Track, Operational and UI events
See [README.md](./README.md) for details

## 1.7.7

Fixed bug associated with testAnalytics clear (which was introduced in 1.6.12)

## 1.7.4

Fixed storage issues when localStorage and sessionStorage are blocked by browsers.
If you are still seeing storage related errors please contact the #product-analytics-dev room.

## 1.7.3

Fixed client library version being reported in each analytic event

## 1.7.2

Increased number of retries from 1 -> 4
Decreased minimum wait time for 2 seconds, to 1

## 1.7.1

Added batching support to analytics. Batching is opt-in with the `useBatchQueue` option in settings.

## 1.6.13

Change in Segment dependency versions to remove critical and high vulnerabilities from source clear

## 1.6.12

Changed localstorage keys in non-prod environments
For more details see [this announcement](https://hello.atlassian.net/wiki/x/8XRtI)

## 1.6.11

Added in memory storage as backup if localstorage is full
