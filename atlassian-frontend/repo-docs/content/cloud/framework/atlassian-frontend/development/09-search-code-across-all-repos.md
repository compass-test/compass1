---
title: Search code across all repos
description: A guide to using Sourcegraph
date: '2021-09-27'
---

# Search code across all repos

Did you know that you can use our internal code search tool [Sourcegraph (go/sourcegraph)](https://sourcegraph-frontend.internal.shared-prod.us-west-2.kitt-inf.net/search) to search all product codebases at once?

Sourcegraph helps you to:

- Explore/read code
- Debug issues
- Locate a specific piece of code
- Determine the impact of changes

… across all of Atlassian’s indexed repos.

**This is particularly useful in the case of a HOT where you need to understand which products are affected.** For example, front-end related HOTs may occur when changes are made at the browser level. This means that an issue raised in one product might actually be impacting many more; the severity may need to change, or further HOTs may need to be raised.

It is worthwhile to familiarise yourself with the [Sourcegraph docs](https://docs.sourcegraph.com/) and [play with the tool](https://sourcegraph-frontend.internal.shared-prod.us-west-2.kitt-inf.net/search).

## Code search

### Queries

You should read the [Sourcegraph query syntax](https://docs.sourcegraph.com/code_search/reference/queries) docs. A couple of examples where Sourcegraph could come in handy:

- Searching for all imports of a component: `from '@atlaskit/avatar'`
- Searching for recent dependency changes: `file:package.json type:diff after:"1 week ago" @atlaskit/avatar`

Other search examples can be found [here](https://docs.sourcegraph.com/code_search/tutorials/examples).

### Saved searches

It’s also possible to [save and describe search queries](https://docs.sourcegraph.com/code_search/how-to/saved_searches) so you can easily monitor the results on an ongoing basis. Sourcegraph can automatically run your saved searches and notify you when new results are available via email.

This could be helpful in the case where you have identified and helped fix a problematic usage of platform code in product code bases, and you want to be sure that these issues don’t rear their head again.

### In case of a HOT

1. Search for the affected code in Sourcegraph
2. If the affected code is present at all in a product repo (not just in a test), go/page someone from that team to let them know and get their expert help in understanding the product impact

## Sourcegraph support

Atlassian has purchased permanent licenses to Sourcegraph, so you can depend on this service long-term. Please visit [#support-sourcegraph](https://atlassian.slack.com/archives/C0183JV3Q0Y) on Slack if you have any questions or need support — this is a shared Slack channel and there are Sourcegraph team members in there who can help you.
