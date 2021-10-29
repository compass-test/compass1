# @atlassian/integrations-survey

## 1.2.3

### Patch Changes

- Updated dependencies

## 1.2.2

### Patch Changes

- [`c86623d67a7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c86623d67a7) - [ux] misalignment of survey layout in firefox for marketing segment

## 1.2.1

### Patch Changes

- Updated dependencies

## 1.2.0

### Minor Changes

- [`b98213232de`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b98213232de) - Change endpoint to retrieve the team type, from manage/profile to /me (re-add from revert)

## 1.1.2

### Patch Changes

- [`ac1a8f56746`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ac1a8f56746) - Revert changes to the user seg endpoint

## 1.1.1

### Patch Changes

- [`d280f3df440`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d280f3df440) - KURO-921: Add checkboxDefaultValue prop in IntegrationSurvey component

## 1.1.0

### Minor Changes

- [`3bef4ae0f63`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3bef4ae0f63) - Change endpoint to retrieve the team type, from manage/profile to /me

## 1.0.0

### Major Changes

- [`ce915c3208c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ce915c3208c) - [ux] Introduce the concept of "installable" vs "connect" apps to handle cases like Slack. Connect app cant be requested for installs. Track each app install via a track event. Monitor the time it takes to receive all the install request responses from market place.

## 0.13.1

### Patch Changes

- [`c0f6eb1dd8b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c0f6eb1dd8b) - Make fire event type more specific

## 0.13.0

### Minor Changes

- [`2b27f684a9a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2b27f684a9a) - Add operational event to be fired when errors are caught for requesting integrations

## 0.12.1

### Patch Changes

- [`bf99867313b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bf99867313b) - Update the analytics for the integrationsPicker

## 0.12.0

### Minor Changes

- [`c19e091bb9d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c19e091bb9d) - Add onMount prop

## 0.11.0

### Minor Changes

- [`e84a6931aa0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e84a6931aa0) - Adjust props for sending of events

## 0.10.0

### Minor Changes

- [`12e7a4e43e7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/12e7a4e43e7) - Create analytics events for handlers passed in

## 0.9.2

### Patch Changes

- [`ca095d02dc4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ca095d02dc4) - Change type to interface for extended type. Change onlick to onchange for checkbox

## 0.9.1

### Patch Changes

- [`5e0e693af5e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5e0e693af5e) - Fix dependency array for the next button

## 0.9.0

### Minor Changes

- [`6d3f269b3be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6d3f269b3be) - [ux] Add Integration Survey component

## 0.8.0

### Minor Changes

- [`82ee606ba3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/82ee606ba3) - Add Integration Picker component

## 0.7.1

### Patch Changes

- [`c50cafdf9a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c50cafdf9a) - Add baseUrl to manageAppRequestUrl for send installation request

## 0.7.0

### Minor Changes

- [`7cc34aac79`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7cc34aac79) - Added baseUrl for sentInstallationRequest

## 0.6.0

### Minor Changes

- [`bfebc58637`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bfebc58637) - Add a callback to fire when there is an error on user seg

## 0.5.3

### Patch Changes

- [`9e47af37a3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9e47af37a3) - [ux] Update integrations lists once more 8/1/2021

## 0.5.2

### Patch Changes

- [`de32a6e0c7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/de32a6e0c7) - Update list of returned integrations based on most recent doc file.

## 0.5.1

### Patch Changes

- [`29a42775f5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/29a42775f5) - Change comment for integration install request.

## 0.5.0

### Minor Changes

- [`5660fdb4b9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5660fdb4b9) - Split the integration list fetching functions. Check local is empty, and perform a fetch call.

## 0.4.3

### Patch Changes

- [`57fb7da243`](https://bitbucket.org/atlassian/atlassian-frontend/commits/57fb7da243) - Export a default list of integration keys.

## 0.4.2

### Patch Changes

- [`02b10b0ee2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/02b10b0ee2) - Improve type exports

## 0.4.1

### Patch Changes

- [`b831272d5b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b831272d5b) - Export correct response type for getIntegrationsData, make aaid optional for sendIntegrationInstallRequest.

## 0.4.0

### Minor Changes

- [`2da0d63d16`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2da0d63d16) - Consolidate calls to install status and install request status apis and cleanups.

## 0.3.1

### Patch Changes

- [`59de5469a9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/59de5469a9) - [ux] Remove selected state from IntegrationDetails and bump the Tooltip dep

## 0.3.0

### Minor Changes

- [`b95a9e05ef`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b95a9e05ef) - Adds marketplace apis (GET INTEGRATION STATUS, POST APP REQUEST INSTALL)

## 0.2.0

### Minor Changes

- [`ad7b18f11b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ad7b18f11b) - Adds ability to save to localstorage a recommended list of integrations. The list is generated based on user-segmentation data.

## 0.1.0

### Minor Changes

- [`67e91fc758`](https://bitbucket.org/atlassian/atlassian-frontend/commits/67e91fc758) - [ux] This is a component intended to be used during the onboarding process for selecting integrations to be installed. This is the initial version, which implements some sub components of this overall component.
