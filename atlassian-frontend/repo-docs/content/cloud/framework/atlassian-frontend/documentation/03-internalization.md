---
date: '2021-09-27'
---

# Internalization aka i18n in Atlassian Frontend

## What you need to know

In Atlassian Frontend, we do support i18n thanks to the Product Localization team.

The Product Localization team are responsible for localizing over 20 different products/product areas utilising an internal service called _Traduki_ and a third party SaaS localization tool called _Smartling_.

## How does it work

A Bamboo plan triggers Traduki’s push/pull sequence once a day. Traduki clones your repo, extracts strings, performs a bit of black magic on them to get them Smartling ready, and sends them up for translators to do their thing. After that, it will ask Smartling for any new translations for your project, pull them down and do some more hacky magic on that to get it in the right format for your repo, and then adds that back to your repo’s source (via pull request, or directly).

Engineers can check at any time, the status of their localized strings via the [Frontend dashboard](https://trad-dash.ap-southeast-1.staging.atl-paas.net/project/atlassian_frontend).

## What you need to do

At the root of Atlassian Frontend, there is a [json file](https://bitbucket.org/atlassian/atlassian-frontend/src/master/i18n-resources.json) `i18n-resources.json`, add your team there and Traduki will pick it up 🤝!

## What will happen

The bot will create pull-requests based on the [Atlassian Frontend Release Process](/cloud/framework/atlassian-frontend/getting-started/00-getting-started/#release-process) with the translations against the packages enlisted on the `i18n-resources.json` and thanks to the `package-ownership` service, it will assign reviewers.

_Note_: For now, the pull-request will not have a changeset and you will need to prepend `no-changeset/` to the branch if you want to opt-out for the changeset check. However, if you need your translations released with your packages, you will need to manually create a `patch` changeset.

## Resources

- [Product Internationalization, Traduki and Smartling Operations](https://hello.atlassian.net/wiki/spaces/i18n/pages/390674924/Product+Internationalization+Traduki+and+Smartling+Operations)
- [Smartling project (🚦requires invite)](https://dashboard.smartling.com/app/projects/be7350097/project-dashboard/index.html)
- [Frontend dashboard](https://trad-dash.ap-southeast-1.staging.atl-paas.net/project/atlassian_frontend)
- [Bamboo build (master)](https://ecosystem-bamboo.internal.atlassian.com/browse/PL-AFE)
- [Bamboo build (develop)](https://ecosystem-bamboo.internal.atlassian.com/browse/PL-AFE)

## i18n Guidelines

- [Developer Best Practice Guide To Creating Localizable Code and Strings](https://hello.atlassian.net/wiki/spaces/i18n/pages/657182803/Developer+Best+Practice+Guide+To+Creating+Localizable+Code+and+Strings)
- [Internationalization Checklist: Create products for global customers](https://hello.atlassian.net/wiki/spaces/i18n/pages/656924766/Internationalization+Checklist+Create+products+for+global+customers)
- [Internationalization (i18n) 101 - An introduction to internationalization](https://hello.atlassian.net/wiki/spaces/i18n/pages/491930357/Internationalization+i18n+101+-+An+introduction+to+internationalization)
- [Don't concatenate strings! Guidelines to handling formatting, variable substitution and links in your strings without string concatenation for great i18n outcomes](https://hello.atlassian.net/wiki/spaces/i18n/pages/752290468/Don+t+concatenate+strings+Guidelines+to+handling+formatting+variable+substitution+and+links+in+your+strings+without+string+concatenation+for+great+i18n+outcomes)
- [The ultimate guide to pluralization and using ICU Message format](https://hello.atlassian.net/wiki/spaces/i18n/pages/657488331/The+ultimate+guide+to+pluralization+and+using+ICU+Message+format)
- [Guidelines for adding Developer Notes to localization strings](https://hello.atlassian.net/wiki/spaces/i18n/pages/692837767/Guidelines+for+adding+Developer+Notes+to+localization+strings)
- [What is Pseudolocalization and can I use it?](https://hello.atlassian.net/wiki/spaces/i18n/pages/671533753/What%2Bis%2BPseudolocalization%2Band%2Bcan%2BI%2Buse%2Bit)

## Questions

- [❓ FAQs](https://hello.atlassian.net/wiki/spaces/i18n/pages/590481595)
- Specific queries related Atlassian Frontend components, reach out to [#i18n-atlassian-frontend](https://atlassian.slack.com/archives/CPF3H4UEB).
- Any generic questions/discussion about internationalization issues, reach out to the team at [#help-i18n](https://atlassian.slack.com/archives/CFJ9P2RNJ).
