# README

## What is this repository for?

This repository is the source for the @atlassiansox/confluence-pagetree package

## Installation

```
npm install @atlassiansox/confluence-page-tree
```

## Usage

```
<ConfluencePageTree
        contentId={contentId}
        cloudId={cloudId}
        spaceKey={spaceKey}
        onAnalyticsEvent={(eventData, eventName) => console.log}
        onError={(error) => console.log}
      />
```

## Local Development

See https://developer.atlassian.com/cloud/framework/atlassian-frontend/

#### Dependencies

This component depends on @atlaskit/table-tree

#### Deployment instructions

Build and release happens on merge to master.

### Who do I talk to?

- Andrew Wakeling
- team-multipliers
