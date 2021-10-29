# @atlassian/calendar

## 0.16.5

### Patch Changes

- Updated dependencies

## 0.16.4

### Patch Changes

- [`787f0ce8f01`](https://bitbucket.org/atlassian/atlassian-frontend/commits/787f0ce8f01) - Fix events losing focus after a popup has been opened with the keyboard. Also allows events to be clicked using either the enter key or space bar when selected, instead of only the enter key.

## 0.16.3

### Patch Changes

- [`04b6d07c2ac`](https://bitbucket.org/atlassian/atlassian-frontend/commits/04b6d07c2ac) - Export popup types at the root of the package.

## 0.16.2

### Patch Changes

- [`9383ed7d829`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9383ed7d829) - [ux] Small visual tweak to calendar date headings to improve UX in other languages

## 0.16.1

### Patch Changes

- Updated dependencies

## 0.16.0

### Minor Changes

- [`aaa15238bf2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/aaa15238bf2) - Removes the following options:

  - `renderEventPopupContents`
  - `eventPopupOffset`
  - `eventPopupPlacement`

  These have all replaced with a new `openPopup` function which is passed to `onEventClick`. `openPopup` can be called when an event is clicked to open a popup next to the event.

  The `openPopup` function is also now passed to `onEventAdd`, allowing a popup to be shown next to the temporary placeholder event being added.

  This release also improves the positioning of the 'more events' popup, making it more vertically centred.

## 0.15.5

### Patch Changes

- [`568c35a0be2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/568c35a0be2) - [ux] Adds dropshadow to events with open popups, changes dropshadow on event popups

## 0.15.4

### Patch Changes

- [`0e1e8875d30`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0e1e8875d30) - Mark events as a readonly array.

## 0.15.3

### Patch Changes

- [`bdd83aff765`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bdd83aff765) - Mark exposed types as read only.

## 0.15.2

### Patch Changes

- [`73d9387243b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/73d9387243b) - [ux] Fix a bug with table rendering when rendering the calendar without the all-day slot in Chrome 91

## 0.15.1

### Patch Changes

- [`6aebe2852fd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6aebe2852fd) - [ux] Placeholder events are to have white background as opposed to transparent

## 0.15.0

### Minor Changes

- [`975fcdebe23`](https://bitbucket.org/atlassian/atlassian-frontend/commits/975fcdebe23) - Fixes the following issues:

  - Events could sometimes become duplicated when being dragged or resized
  - The popup contents for an event would not be updated when the event was updated

## 0.14.0

### Minor Changes

- [`f19898c9ce3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f19898c9ce3) - [ux] Added ability to provide a custom border color for calendar events.

## 0.13.0

### Minor Changes

- [`2e408fb3aef`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2e408fb3aef) - [ux] Enable keyboard interaction with calendar events and the "more events" link

## 0.12.1

### Patch Changes

- [`913aaa9fb08`](https://bitbucket.org/atlassian/atlassian-frontend/commits/913aaa9fb08) - Ensure all rows in the calendar month view are the same height.

## 0.12.0

### Minor Changes

- [`eb563e5ec96`](https://bitbucket.org/atlassian/atlassian-frontend/commits/eb563e5ec96) - Bump FullCalendar dependency to 5.6.0

## 0.11.0

### Minor Changes

- [`ec67880dd2e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ec67880dd2e) - Add a `placeholder` option to Event

## 0.10.3

### Patch Changes

- [`8b420d2eff1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8b420d2eff1) - Fix the existing FullCalendar resize detection by replacing it with atlaskit width detector.

## 0.10.2

### Patch Changes

- [`7318134352a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7318134352a) - Fix an issue with the date header in the month view showing the wrong dates in certain timezones

## 0.10.1

### Patch Changes

- [`8325c207513`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8325c207513) - Fix bug where current day highlight would be on the wrong day if the timezone was loaded in asynchronously after the calendar was first rendered

## 0.10.0

### Minor Changes

- [`9d39b1f7281`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9d39b1f7281) - Add support for popups when clicking on events.

## 0.9.1

### Patch Changes

- [`6ce5268f7b4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6ce5268f7b4) - [ux] Adds a new property to hide all-day events slot from the calendar

## 0.9.0

### Minor Changes

- [`4e22dcb37bc`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4e22dcb37bc) - [ux] Fix styling for placeholders in the month view

## 0.8.1

### Patch Changes

- [`b48ad177c53`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b48ad177c53) - Fix events that are being dragged or resized incorrectly appearing as placeholder events

## 0.8.0

### Minor Changes

- [`a7c01b0ff23`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a7c01b0ff23) - [ux] Fix the styling of the placeholder on the jsm calendar

## 0.7.0

### Minor Changes

- [`88769a5f65`](https://bitbucket.org/atlassian/atlassian-frontend/commits/88769a5f65) - [ux] Add hideScrollBar prop to handle hiding the scrollbar of calendar body

## 0.6.0

### Minor Changes

- [`be761d8d70`](https://bitbucket.org/atlassian/atlassian-frontend/commits/be761d8d70) - Add placeholder text to be shown when a calendar event has no title

## 0.5.0

### Minor Changes

- [`53f19b7e16`](https://bitbucket.org/atlassian/atlassian-frontend/commits/53f19b7e16) - [ux] Add five day range to calendar

## 0.4.0

### Minor Changes

- [`e610d0c951`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e610d0c951) - Implement new modal design when showing additional events in the month view, and week/day views in the all-day events row.

## 0.3.1

### Patch Changes

- [`d916005edc`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d916005edc) - Added DefaultEventContent to package export

## 0.3.0

### Minor Changes

- [`24f735cd4a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/24f735cd4a) - Add `locale` prop to control translations, date formatting, and first day of the week.

## 0.2.1

### Patch Changes

- [`a8cb4e0c82`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a8cb4e0c82) - Display timezone on the calendar in a numeric format.

## 0.2.0

### Minor Changes

- [`51e168007a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/51e168007a) - Change the styling of the default event content wrapper

## 0.1.2

### Patch Changes

- [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc

## 0.1.1

### Patch Changes

- [`ffbd79b1f0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ffbd79b1f0) - Add initial styling to the calendar day, week and month grid views.

## 0.1.0

### Minor Changes

- [`866eea72cd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/866eea72cd) - Add initial implementation of the FullCalendar wrapper.

## 0.0.1

### Patch Changes

- [`c5b69717b5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c5b69717b5) - Add initial package skeleton.
